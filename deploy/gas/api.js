var _ = LodashGS.load();
var moment = Moment.moment;

function doGet() {
  var page = "index";
  if (_underTrial() === "EXPIRED" && _checkIfLicensed() == false) {
    page = "expired";
  }
  return HtmlService.createTemplateFromFile(page)
    .evaluate()
    .setFaviconUrl("https://heartstchr.github.io/img/borl.png")
    .setTitle("Task Manager")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function onOpen(e) {
  var uiMenu = SpreadsheetApp.getUi().createMenu("Task Manager");

  uiMenu
    .addSubMenu(
      SpreadsheetApp.getUi()
        .createMenu("Advanced Settings")
        .addItem("Clear old data", "clearAll")
        .addItem("Upload your customer's data", "showSideForUploadingCustomers")
      // .addItem("Test with dummy data", "myThirdFunction")
    )
    .addToUi();

  if (_trialStarted() == false) {
    uiMenu
      .addItem("Click to start your trial or first use.", "resetForFirstUse")
      .addSeparator()
      .addToUi();
  }
  if (_checkIfLicensed() == false) {
    uiMenu
      .addItem("Enter License Key", "showLicensePrompt")
      .addSeparator()
      .addToUi();
  }
  if (_underTrial() === "UNDER_TRIAL") {
    uiMenu
      .addItem("This is under trial", "showLicensePrompt")
      .addSeparator()
      .addToUi();
  }
  if (_underTrial() === "EXPIRED") {
    uiMenu
      .addItem("Trial expired", "showLicensePrompt")
      .addSeparator()
      .addToUi();
  }
}
function showLicensePrompt() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.prompt("Enter license key", ui.ButtonSet.OK_CANCEL);
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    if (matchLicenseKey(text) == true) {
      ui.alert("Thank you for purchasing the product.!");
    } else {
      ui.alert("You have entered the wrong key.!");
    }
  }
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Method to get item in a table by it's id.
 * @param {Integer} id: id in a table.
 * @param {String} tableName: Name of Named Range or Table Name.
 */

function getRelatedTasks(clientId) {
  return GetItemsWhere("tbl_task", [{ client_id: clientId }]);
}

function getClientInfo(clientId) {
  // return GetItemsWhere("tbl_client_info", [{ client_id: clientId }])[0];
  return GetItemById(clientId, "tbl_client_info");
}
function getClientInfo(clientId) {
  var tbl = getTableByName("tbl_client_info", "id");
  var queryItems = tbl.select([{ client_id: clientId }]);
  if (queryItems.all() == null) {
    return null;
  } else {
    var result = {};
    result.header = tbl.header;
    result.items = queryItems.all();
    return result;
  }
}
// function getClientNote(clientId) {
//   // return GetItemsWhere("tbl_client_info", [{ client_id: clientId }])[0];
//   return GetItemById(clientId, "tbl_client_notes");
// }

function createEntity(formDataObject, tableName) {
  if (formDataObject.hasOwnProperty("id")) {
    updateRecord(tableName, formDataObject);
    return true;
  } else {
    var table = getTableByName(tableName);

    table.add(formDataObject);
    table.commit();
    return true;
  }
}

function getStringifiedTables(tableNames) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var o = {};
  tableNames.forEach((name) => {
    var rng = ss.getRangeByName(name);
    var vals = trimRangeRows(rng).getValues();
    o[name] = vals;
  });

  return JSON.stringify(o);
}

function GetTable(tblName) {
  return _getTableByNameWithidColumn(tblName, "normal");
}
function GetItemsWhere(id, sheetName) {
  Tamotsu.initialize();
  var Agent = Tamotsu.Table.define({ sheetName: sheetName });
  return Agent.where({ client_id: id });
}

function GetTables(tblNames) {
  // const tblNames = ['tbl_task_type','tbl_company_type'];
  const tables = {};
  tblNames.forEach((tblName) => {
    tables[tblName] = _getTableByNameWithidColumn(tblName, "normal");
  });
  // Logger.log(tables);
  return tables;
}
function updateRecord(tableName, updateObject) {
  var table = getTableByName(tableName, "id");
  table.updateById(updateObject);
  table.commit();
  return true;
}

function deleteItem(tableName, id) {
  var table = getTableByName(tableName, "id");
  var item = table.getItemById(id);
  table.deleteOne(item);
  table.commit();
  return true;
}

function getItemByIDDeep(tableName, id) {
  var table = getTableByName(tableName, "id");
  var item = table.getItemById(id);
  var flds = item.table.header;
  var relatedItems = {};

  flds.forEach((fld) => {
    if (fld.endsWith("_id")) {
      var foreingKey = item.fields[fld]["value"];
      var relatedTblName = "tbl_" + fld.replace("_id", "");
      var relatedtable = getTableByName(relatedTblName, "id");
      var relatedItem = relatedtable.getItemById(foreingKey);

      const { fields } = relatedItem;
      //  Logger.log(relatedItem);
      var leanItem = {};
      leanItem.item = {};
      leanItem.header = {};
      for (const [key, value] of Object.entries(fields)) {
        // console.log(key, value);

        leanItem.item[key] = value["value"];
      }
      const { header } = relatedItem.table;
      leanItem.header = header;
      relatedItems[fld] = leanItem;
    }
  });
  return relatedItems;
}

function PopulateRelatedFields() {
  var tbl = getTableByName("tbl_task");

  Logger.log(tbl.items);
  var keys = Object.keys(tbl.items);

  var arr = keys.map((key) => {
    tbl.items[key];
    Logger.log(tbl.items[key]);
  });
}

function MarkComplete(item, reCreate) {
  var taskTable = getTableByName("tbl_task", "id");
  if (item._showDetails) {
    delete item["_showDetails"];
  }
  if (item.id) {
    item.status = "Completed";
    taskTable.updateById(item);
    if (reCreate) {
      item.status = "Pending";
      if (item.periodicity_id) {
        var adder = _getTableByNameWithidColumn("tbl_periodicity", "indexed")[
          item.periodicity_id
        ]["value"];
        adder = JSON.parse(adder);
        const remindBeforeDays = item.deadline_date - item.reminder_date;
        const nextDeadlineDate = moment(item.deadline_date).add(adder);
        item.deadline_date = Number(nextDeadlineDate);
        item.reminder_date = item.deadline_date - remindBeforeDays;
      }
      taskTable.add(item);
      taskTable.commit();
    }
    return item;
  }
}
