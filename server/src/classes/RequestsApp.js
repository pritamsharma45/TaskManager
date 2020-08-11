"use strict";
import SpreadsheetDB from "./SpreadsheetDB.js";
import ColumnNames from "./ColumnNames.js";

class RequestsApp {
  constructor(spreadsheet_url) {
    //this.spreadsheet_url =
    //'https://docs.google.com/spreadsheets/d/1k-zN8IfrkC34jEXam9KoNXzpYzCp0ro_h9hPFZZ7Fe4/edit';

    this.db = new SpreadsheetDB({
      source_url: spreadsheet_url,
    });
  }

  getNewRequests() {
    //this.db.query.where('Status','new').results().json()
    return this.db.query.where("Status", "Open").getResultsJson();
  }
  requestDetails(id) {
    //this.db.findRow('id',id).json()
    return this.db.getRowDataById(id);
  }
  getHeaderRow() {
    //this.db.findRow('id',id).json()
    return this.db.getHeaderRow();
  }
  getDropDown() {
    //this.db.findRow('id',id).json()
    return this.db.getDropDown();
  }
  addToDDWithName(ddName, option) {
    //this.db.findRow('id',id).json()
    return this.db.addToDDWithName(ddName, option);
  }

  getDDList(DDList) {
    //this.db.findRow('id',id).json()
    return this.db.getDDOptionsForDDNames(DDList);
  }

  approveRequest(id, updateObj) {
    var res = "";
    for (const property in updateObj) {
      res = this.db.update(id, property, updateObj[property]);
    }
    return this._getJSONResult(res);
  }

  writeToRow(id, updateObj, sheetName) {
    this.db.sheet = this.db.spreadsheet.getSheetByName(sheetName);
    this.db.options.column_names = new ColumnNames(this.db.getHeaderRow());
    var res = "";
    for (const property in updateObj) {
      res = this.db.update(id, property, updateObj[property]);
    }
    return this._getJSONResult(res);
  }

  rejectRequest(id) {
    let res = this.db.update(id, "Status", "Open");
    return this._getJSONResult(res);
  }
  newRequest(req) {
    var id = req.Department.substring(0, 3).toUpperCase();
    id = id + "/" + IDGenearator();
    req.Id = id;
    req.Status = "Open";
    let res = this.db.insert(req);
    return this._getJSONResult(res);
  }
  newActivity(req) {
    let id = IDGenearator();
    req.Activity_ID = id;
    this.addNewRow(req, "ActivityCodifications");
  }

  addNewRow(rowObj, sheetName) {
    this.db.sheet = this.db.spreadsheet.getSheetByName(sheetName);
    this.db.options.column_names = new ColumnNames(this.db.getHeaderRow());
    let res = this.db.insert(rowObj);
    return this._getJSONResult(rowObj);
  }

  closedNotifications() {
    return this.db.query.where("Status", "Closed").getResultsJson();
  }

  sendEmail(req, mailIds, obj) {
    var files = obj.map(function(e) {
      return Utilities.newBlob(
        Utilities.base64Decode(e.data),
        e.mimeType,
        e.fileName
      );
    });
    var message = "";
    var subj = "Equipment Failure Notifications [" + req["Department"] + "]";

    Object.keys(req).forEach((element) => {
      message += "<p><b>" + element + " : " + "</b>" + req[element] + "</p>";
    });

    try {
      GmailApp.sendEmail(mailIds[1], subj, message, {
        attachments: files,
        htmlBody: message,
        cc: mailIds.join(),
      });

      return true;
    } catch (error) {
      return false;
    }

    //send the actual email
    // MailApp.sendEmail({
    //   to: mailIds.mailIds[1],
    //   cc: mailIds.join(),
    //   subject: "Equipment Failure Notifications",
    //   htmlBody: message,
    //   attachments: files,
    // });
  }

  sendEmail2(req, mailIds) {
    var message = "";

    Object.keys(req).forEach((element) => {
      message += "<p><b>" + element + " : " + "</b>" + req[element] + "</p>";
    });

    GmailApp.sendEmail(mailIds[1], "PM Activity Notification", message, {
      htmlBody: message,
      cc: mailIds.join(),
    });
  }

  getDDNames() {
    let ddSheet = this.db.spreadsheet.getSheetByName("DropDowns");
    let lastColNum = ddSheet.getDataRange().getLastColumn();
    let ddNames = ddSheet
      .getRange(1, 1, 1, lastColNum)
      .getValues()
      .toString()
      .split(",");

    return ddNames;
  }

  getAggregates() {
    var ss = SpreadsheetApp.openByUrl(
      "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
    );
    const sht = ss.getSheetByName("Cards");

    const colNums = sht
      .getRange("B1:N21")
      .getValues()[0]
      .filter(String).length;

    const range_val = sht.getRange(1, 2, 2, colNums).getValues();

    const monthCount = sht
      .getRange("A9:A25")
      .getValues()
      .filter(String).length;
    const monthRange = sht.getRange(9, 1, monthCount);

    const Keys = range_val[0];
    const val_Array = range_val[1];

    //Logger.log(range_val);

    var openOnlyArrray = val_Array.map(function(val, index) {
      return { key: Keys[index], value: val };
    });

    const StatusHeaderColumnCount = sht
      .getRange("C8:R8")
      .getValues()
      .filter(String).length;
    const statusHeader = sht.getRange(7, 3, 1, StatusHeaderColumnCount);

    Aggregate = {};
    monthLyAggregate = {};
    for (let r = 0; r < monthCount; r++) {
      var aggregateArray = [];
      var obj = {};
      for (let c = 2; c < 100; c++) {
        if (sht.getRange(8, c + 1).getValue() != "") {
          aggregateArray.push({
            status: sht.getRange(7, c + 1).getValue(),
            key: sht.getRange(8, c + 1).getValue(),
            value: sht.getRange(r + 9, c + 1).getValue(),
          });
        }
      }
      monthLyAggregate[monthRange.getValues()[r][0]] = aggregateArray;
    }
    Aggregate["OpenOnly"] = openOnlyArrray;
    Aggregate["MonthWise"] = monthLyAggregate;

    // Logger.log(Object.keys(Aggregate["MonthWise"]));
    return Aggregate;
  }

  getNotificationObject() {
    var ss = SpreadsheetApp.openByUrl(
      "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
    );
    var sheet = ss.getSheets()[0];

    var arrayOfEntireData = sheet.getDataRange().getValues();

    var column_Names = _.head(arrayOfEntireData);

    var databodyArray = _.tail(arrayOfEntireData);

    var filterCriterions = {
      Department: ["Electrical", "Mechanical & CP", "Instrumentation"],
      Receiver: [],
      Sender: ["AKV", "PKS"],
      Status: ["Open", "Close"],
      Priority: ["Very High", "High", "Medium", "Low"],
      Equipment_Name: [],
    };

    var filteredList = {};

    let ddCollection = {};

    for (el in filterCriterions) {
      filteredList[el + "_Wise"] = {};
      var criteriaArr = filterCriterions[el];
      var mappedColumnNumber = _.indexOf(column_Names, el);
      criteriaArr.forEach(collectionGenerator);

      function collectionGenerator(filterKey, index) {
        var filteredArray = _.filter(databodyArray, function(o) {
          return o[mappedColumnNumber] == filterKey;
        });
        filteredList[el + "_Wise"][filterKey] = filteredArray;
        ddCollection[filterKey] = filteredArray;
      }
    }

    return filteredList;
  }

  getNotificationTableItems(sheetName) {
    var ss = SpreadsheetApp.openByUrl(
      "https://docs.googlhttps://docs.google.com/spreadsheets/d/1o3dDrE3layPQkpmrN2tYdiJ5OvRCjFKHn4czPiZPicY/edit#gid=0e.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit"
    );
    var sheet = ss.getSheetByName(sheetName);
    var arrayOfEntireData = sheet.getDataRange().getValues();
    var column_Names = _.head(arrayOfEntireData);
    var databodyArray = _.tail(arrayOfEntireData);
    var tableItems = [];
    for (let index = 0; index < databodyArray.length; index++) {
      let obj = {};
      databodyArray[index].forEach(function(element, i) {
        {
          obj[column_Names[i]] = element.toString();
        }
      });
      tableItems.push(obj);
    }
    tableItems.reverse();
    return tableItems;
  }

  getHistory(criteria, columnName, sheetName) {
    var table = getNotificationTableItems(sheetName);

    var filteredArray = _.filter(table, function(o) {
      return o[columnName] == criteria;
    });

    return filteredArray;
  }

  getNotifsJurisdictionWise(location) {
    var table = getNotificationTableItems("Records");
    var filteredArray = _.filter(table, function(o) {
      return o["Office_Location"] == location;
    });
    return filteredArray;
  }

  getActivitiesJurisdictionWise(location) {
    var table = getNotificationTableItems("ActivityCodifications");
    var filteredArray = _.filter(table, function(o) {
      return o["Jurisdiction"] == location;
    });
    return filteredArray;
  }

  _getJSONResult(res) {
    if (res) {
      return { result: "success" };
    } else {
      return { result: "failed" };
    }
  }
}

export function IDGenearator() {
  var dt = new Date();
  const y = dt.getFullYear() - 2015;
  const m = dt.getMonth() + 1;
  const h = dt.getHours();
  const mn = dt.getMinutes();
  const sn = dt.getSeconds();
  var id =
    String.fromCharCode(97 + y) +
    String.fromCharCode(97 + m) +
    String.fromCharCode(97 + h) +
    String(mn).padStart(2, "0") +
    String(sn).padStart(2, "0");
  id = id.toUpperCase();
  return id;
}

export default RequestsApp;
