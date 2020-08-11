function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setFaviconUrl("https://heartstchr.github.io/img/borl.png")
    .setTitle("VBPL APP")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function getRequestApp() {
  return new AppLib.RequestsApp(
    "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
  );
}

function loadRequests() {
  return getRequestApp().getNewRequests();
}

function getHistory(criteria, columnName, sheetName) {
  return getRequestApp().getHistory(criteria, columnName, sheetName);
}

function getNotificationObject() {
  return getRequestApp().getNotificationObject();
}

function getNotificationTableItems(sheetName) {
  return getRequestApp().getNotificationTableItems(sheetName);
}

function getNotifsJurisdictionWise(location) {
  return getRequestApp().getNotifsJurisdictionWise(location);
}
function getActivitiesJurisdictionWise(location) {
  return getRequestApp().getActivitiesJurisdictionWise(location);
}
function loadHeaders() {
  return getRequestApp().getHeaderRow();
}

function requestDetails(id) {
  return getRequestApp().requestDetails(id);
}

function approveRequest(id, updateObj) {
  return getRequestApp().approveRequest(id, updateObj);
}

function witeToRow(id, updateObj, sheetName) {
  return getRequestApp().writeToRow(id, updateObj, sheetName);
}

function rejectRequest(id) {
  return getRequestApp().rejectRequest(id);
}

function newRequest(req) {
  return getRequestApp().newRequest(req);
}

function newActivity(req) {
  return getRequestApp().newActivity(req);
}
function getDDNames() {
  return getRequestApp().getDDNames();
}

function getDDList(DDList) {
  return getRequestApp().getDDList(DDList);
}

function addToDDWithName(ddName, option) {
  return getRequestApp().addToDDWithName(ddName, option);
}

function addNewRow(rowObj, sheetName) {
  return getRequestApp().addNewRow(rowObj, sheetName);
}
function closedNotifications() {
  return getRequestApp().closedNotifications();
}

function changeNumberFormat(sheetName, columnString, formatType) {
  var ss = SpreadsheetApp.openByUrl(
    "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
  );

  var sheet = ss.getSheetByName(sheetName);
  //  columnString ->  "B2:B"  formatType -> "@"
  var column = sheet.getRange(columnString);
  column.setNumberFormat(formatType);
}
function getDropDown() {
  return getRequestApp().getDropDown();
}

function getAggregates() {
  return getRequestApp().getAggregates();
}

function getFailureFrequency(location) {
  var ss = SpreadsheetApp.openByUrl(
    "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
  );

  var sheet = ss.getSheetByName("PivotTables");
  ss.getRangeByName("NR_QueryLocation").setValue(location);

  var pt1 = sheet.getRange("h15").getDataRegion();

  var ht1 = pt1.getNumRows();
  var wt1 = pt1.getNumColumns();

  pt1 = pt1.offset(1, 0, ht1 - 1, wt1);

  return getObjectFromDataTable(pt1.getValues());
}

function getPivotTableObject() {
  var ss = SpreadsheetApp.openByUrl(
    "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
  );

  var sheet = ss.getSheetByName("PivotTables");

  var pt1 = sheet.getRange("b15").getDataRegion();
  var pt2 = sheet.getRange("a3").getDataRegion();

  var ht1 = pt1.getNumRows();
  var wt1 = pt1.getNumColumns();
  var wt2 = pt2.getNumColumns();
  var ht2 = pt2.getNumRows();

  pt1 = pt1.offset(1, 0, ht1 - 1, wt1 - 1);
  pt2 = pt2.offset(2, 0, ht2 - 3, wt2 - 2);

  var aggregates = {};
  aggregates.officerWiseOpen = getObjectFromDataTable(pt1.getValues());
  aggregates.locationWiseOpen = getObjectFromDataTable(pt2.getValues());

  return aggregates;
}

function getObjectFromDataTable(arrayOfEntireData) {
  var column_Names = _.head(arrayOfEntireData);

  for (var i = 0; i < column_Names.length; i++) {
    if (column_Names[i] === "") column_Names[i] = "Total";
  }

  var databodyArray = _.tail(arrayOfEntireData);
  var tableItems = [];
  for (let index = 0; index < databodyArray.length; index++) {
    let obj = {};
    databodyArray[index].forEach(function (element, i) {
      {
        obj[column_Names[i]] = element.toString();
      }
    });
    tableItems.push(obj);
  }

  return tableItems;
}

function getImageWithNameInFolder() {
  Logger.log(getAssets("Assets")["favicon.png"]);
}

function sendElksSMS(msg, contacts) {
  var username = "u3b1b3f9c95936a9811614b27f539abe6";
  var password = "81FA6D8CF5B4D84D81141AD6934155A1";

  var sender = "+919624701102";
  var auth = Utilities.base64Encode(username + ":" + password);

  contacts = contacts.join();
  try {
    UrlFetchApp.fetch("https://api.46elks.com/a1/SMS", {
      method: "post",
      headers: { Authorization: "Basic " + auth },
      payload: {
        from: sender,
        to: contacts,
        message: msg,
      },
    });

    return true;
  } catch (err) {
    return false;
  }
}

function getActiveUserId() {
  return Session.getActiveUser().getEmail();
}

function MailTriggerDaily() {
  var ss = SpreadsheetApp.openByUrl(
    "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
  );

  var sheet = ss.getSheetByName("ActivityCodifications");
  var lr = ss.getLastRow();
  var values = sheet.getDataRange().getValues();
  values.forEach(function (row, index) {
    //    1st mail
    if (row[11] < 11 && row[11] > 1 && row[13] == 0) {
      var msg = draftMsg(row);
      var contactKeys = [row[3], row[8], row[7]];
      var mailIds = getMailIds(contactKeys);
      sendMailForPMDue(mailIds, msg);
      sheet.getRange(index + 1, 14).setValue(1);
    }

    //    2nd mail
    if (row[11] < 2 && row[11] > -8 && row[13] == 1) {
      var msg = draftMsg(row);
      var contactKeys = [row[3], row[8], row[7], "DGM"];
      var mailIds = getMailIds(contactKeys);
      sendMailForPMDue(mailIds, msg);
      sheet.getRange(index + 1, 14).setValue(2);
    }

    //    3rd mail
    if (row[11] < -30 && row[13] == 2) {
      var msg = draftMsg(row);
      var contactKeys = [row[3], row[8], row[7], "DGM"];
      var mailIds = getMailIds(contactKeys);
      sendMailForPMDue(mailIds, msg);
      sheet.getRange(index + 1, 14).setValue(3);
    }
  });
}

function sendMailForPMDue(mailIds, msg) {
  // MailApp.sendEmail(
  //   "sharma.pritam311@gmail.com",
  //   "PM Activity Due Notification",
  //   msg,
  //   {
  //     htmlBody: msg,
  //     //          cc: mailIds.join(),
  //   }
  // );
  MailApp.sendEmail(mailIds[1], "PM Activity Due Notification", msg, {
    htmlBody: msg,
    cc: mailIds.join(),
  });
}

function getMailIds(contactKeys) {
  var allContacts = [];
  var mailIDs = [];
  allContacts = getNotificationTableItems("Contacts");
  let found = "";
  contactKeys.forEach(function (key) {
    found = allContacts.find(function (el) {
      if (el.Name == key) {
        return el;
      }
    });
    mailIDs.push(found.MailID);
  });
  return mailIDs;
}

function draftMsg(arrVal) {
  var message = "";
  message +=
    "<p><b>Location : </b>" +
    arrVal[4] +
    "</p>" +
    "<p><b>Activity Details : </b>" +
    arrVal[2] +
    "</p>" +
    "<p><b>Target Equipment : </b>" +
    arrVal[1] +
    "</p>" +
    "<p><b>Last Done On : </b>" +
    arrVal[9] +
    "</p>" +
    "<p><b>Due On : </b>" +
    arrVal[10] +
    "</p>" +
    "<p><b>Responsible Officer : </b>" +
    arrVal[8] +
    "</p><br><br>";
  return message;
}

function RecordTableLength() {
  var ss = SpreadsheetApp.openByUrl(
    "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
  );
  var sheet = ss.getSheetByName("Records");

  return sheet.getLastRow();
}

function sendEmail(req, mailIds, obj) {
  return getRequestApp().sendEmail(req, mailIds, obj);
}
function sendEmail2(req, mailIds, obj) {
  return getRequestApp().sendEmail2(req, mailIds);
}

function sendNotifClosureMail(req, mailIds) {
  var message = "Below mentioned notification has been marked closed";
  var keys = [
    "Date",
    "Department",
    "Location",
    "Equipment_Name",
    "Notification_Details",
    "Action",
    "Closed_By",
  ];

  for (let index = 0; index < keys.length; index++) {
    message +=
      "<p><b>" + keys[index] + " : " + "</b>" + req[keys[index]] + "</p>";
  }

  GmailApp.sendEmail(
    mailIds[1],
    // "sharma.pritam311@gmail.com",
    "[ Mark Closed ] Equipment Failure Notification [ Mark Closed ]",
    message,
    {
      htmlBody: message,
      cc: mailIds.join(),
    }
  );
}
function processEmail(obj) {
  var files = obj.map(function (e) {
    return Utilities.newBlob(
      Utilities.base64Decode(e.data),
      e.mimeType,
      e.fileName
    );
  });
  var subject = "Subject";
  var message = "Test";
  var recipient = "sharma.pritam311@gmail.com";
  GmailApp.sendEmail(recipient, subject, message, {
    attachments: files,
    htmlBody: message,
    name: "Equipment Failure Test",
  });
}
function getDownloadLinks() {
  var ss = SpreadsheetApp.openByUrl(
    "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
  );
  var sheet = ss.getSheetByName("PivotTables");
  var recordSheet = ss.getSheetByName("Records");
  var activitieSheet = ss.getSheetByName("ActivityCodifications");
  var rng_OfficerWise = sheet.getRange("b15").getDataRegion();
  var rng_LocationWise = sheet.getRange("a3").getDataRegion();
  var rng_Records = recordSheet.getDataRange();
  var rng_Activities = activitieSheet.getDataRange();

  var ht1 = rng_OfficerWise.getNumRows();
  var wt1 = rng_OfficerWise.getNumColumns();
  var wt2 = rng_LocationWise.getNumColumns();
  var ht2 = rng_LocationWise.getNumRows();

  rng_OfficerWise = rng_OfficerWise.offset(1, 0, ht1 - 1, wt1 - 1);
  rng_LocationWise = rng_LocationWise.offset(2, 0, ht2 - 3, wt2 - 2);

  var downloadObj = [];
  var obj = {};
  obj.name = "Notification Records";
  obj.dataRange = rng_Records;

  downloadObj.push(saveAsCSV(obj));

  obj.name = "Officer wise Aggreagations";
  obj.dataRange = rng_OfficerWise;
  downloadObj.push(saveAsCSV(obj));

  obj.name = "Location Wise Aggregations";
  obj.dataRange = rng_LocationWise;
  downloadObj.push(saveAsCSV(obj));

  obj.name = "PM Activities";
  obj.dataRange = rng_Activities;
  downloadObj.push(saveAsCSV(obj));

  return downloadObj;
}

function saveAsCSV(tableObj) {
  var folder = DriveApp.getFolderById("1niks474hir-ZXTf-tK8HxS2nvxPEMy05");
  // append ".csv" extension to the sheet name
  fileName = tableObj.name + "-" + +new Date().getTime() + ".csv";
  // convert all available sheet data to csv format
  var csvFile = convertRangeToCsvFile_(fileName, tableObj.dataRange);
  // create a file in the Docs List with the given name and the csv data
  var file = folder.createFile(fileName, csvFile);
  //File downlaod
  var downloadURL = file.getDownloadUrl().slice(0, -8);
  var obj = {};
  obj.downloadURL = downloadURL;
  obj.name = tableObj.name;
  return obj;
}

function convertRangeToCsvFile_(csvFileName, dataRange) {
  // get available data range in the spreadsheet
  //  var activeRange = sheet.getDataRange();
  try {
    var data = dataRange.getValues();
    var csvFile = undefined;

    // loop through the data in the range and build a string with the csv data
    if (data.length > 1) {
      var csv = "";
      for (var row = 0; row < data.length; row++) {
        for (var col = 0; col < data[row].length; col++) {
          if (data[row][col].toString().indexOf(",") != -1) {
            data[row][col] = '"' + data[row][col] + '"';
          }
        }

        // join each row's columns
        // add a carriage return to end of each row, except for the last one
        if (row < data.length - 1) {
          csv += data[row].join(",") + "\r\n";
        } else {
          csv += data[row];
        }
      }
      csvFile = csv;
    }
    return csvFile;
  } catch (err) {
    Logger.log(err);
    Browser.msgBox(err);
  }
}
function getAssets(driveDir) {
  var folders = DriveApp.getFoldersByName(driveDir);
  var folder = folders.hasNext() ? folders.next() : false;
  var assets = {};
  if (folder) {
    var files = folder.getFiles();
    while (files.hasNext()) {
      var file = files.next();
      var fileName = file.getName();

      assets[fileName] =
        "https://drive.google.com/uc?export=view&id=" + file.getId();

      Logger.log(assets[fileName]);
    }
  }
  return assets;
}
