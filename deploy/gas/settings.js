function resetForFirstUse() {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("LicenseKey", "") == null;

  _setTrialDate();
  StoreLicey();
  SaveDataToScriptProperties();
}

function _checkIfLicensed() {
  var scriptProperties = PropertiesService.getScriptProperties();
  Logger.log(scriptProperties.getProperty("LicenseKey"));
  if (
    scriptProperties.getProperty("LicenseKey") == null ||
    scriptProperties.getProperty("LicenseKey") == ""
  ) {
    Logger.log("Not Found");
    return false;
  } else {
    Logger.log("Found");
    return true;
  }
}
function _trialStarted() {
  var userProperties = PropertiesService.getUserProperties();
  Logger.log(typeof userProperties.getProperty("TrialStartDate"));
  if (userProperties.getProperty("TrialStartDate") == null) {
    Logger.log("Null");
    return false;
  } else {
    return userProperties.getProperty("TrialStartDate");
    // Logger.log(userProperties.getProperty('TrialStartDate'))
  }
}
function _trialExist() {
  var scriptProperties = PropertiesService.getScriptProperties();
  if (scriptProperties.getProperty("LicenseKey") === "") {
    return false;
  } else {
    return true;
  }
}
function clearAll() {
  var tableNames = [
    "tbl_client",
    "tbl_task",
    "tbl_client_info",
    "tbl_client_notes",
    "tbl_user",
  ];
  ClearInitialData(tableNames);
}
function _underTrial() {
  var msg;
  var userProperties = PropertiesService.getUserProperties();
  Logger.log(userProperties.getProperty("TrialStartDate"));
  if (userProperties.getProperty("TrialStartDate") == null) {
    Logger.log("Trial Not Started");
    msg = "NOT_STARTED";
  } else {
    if (_checkIfTrialExpired() > 30) {
      msg = "EXPIRED";
    } else {
      msg = "UNDER_TRIAL";
    }
  }

  Logger.log(msg);
  return msg;
}

function _setTrialDate() {
  var dt = Date();
  Logger.log(dt);
  var userProperties = PropertiesService.getUserProperties();
  if (userProperties.getProperty("TrialStartDate") == null) {
    userProperties.setProperty("TrialStartDate", dt);
    Logger.log("Null");
    return dt;
  } else {
    return userProperties.getProperty("TrialStartDate");
    // Logger.log(userProperties.getProperty('TrialStartDate'))
  }
  // userProperties.setProperty('TrialStartDate',dt );
}

function _checkIfTrialExpired() {
  var userProperties = PropertiesService.getUserProperties();
  var trialStartDate = moment(userProperties.getProperty("TrialStartDate"));
  var today = new Date();
  today = moment(today);
  Logger.log(today);
  Logger.log(trialStartDate);
  var dayDiff = today.diff(trialStartDate, "days"); // 1
  Logger.log(dayDiff);
  return dayDiff;
  // if (dayDiff > 2) {
  //   return true;
  // } else {
  //   return false;
  // }
}

function StoreLicey() {
  var keys = [
    "Ibn161Qj8bf",
    "7sJPwu",
    "884YoGV",
    "4ro22i",
    "I4BgMg5u",
    "CQgAL46B",
    "2dBiQUe8",
    "6mTsXoCd",
    "WGDFV3O3",
    "JEC3ZHyJJ1i",
    "MK3lmsWr",
    "FQGz8eCwpkIn",
    "CZU784Vuhil",
    "EJK4tn9vwIV6",
    "ztdUFNxjOy2L",
    "gx8tgtXG4CQx",
    "OHrHXiDp",
    "MplNnNQqK",
    "4GeQ7K0PwIw3",
    "mXt1EpHUyEk",
  ];
  keys = JSON.stringify(keys);
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperties({
    licenseKeys: keys,
  });
}

function matchLicenseKey(keyToMatch) {
  // var keyToMatch = "88YoGV";
  var scriptProperties = PropertiesService.getScriptProperties();
  var allKeys = JSON.parse(scriptProperties.getProperties()["licenseKeys"]);
  if (allKeys.indexOf(keyToMatch) > -1) {
    scriptProperties.setProperty("LicenseKey", keyToMatch);
    return true;
  } else {
    return false;
  }
}
function ClearInitialData(tableNames) {
  var namedRanges = SpreadsheetApp.getActiveSpreadsheet().getNamedRanges();
  /// Clear All Data excluding few table with given names ///
  // Logger.log(tableNames);
  namedRanges.forEach((nr) => {
    Logger.log(nr.getName());
    if (tableNames.includes(nr.getName())) {
      nr.getRange()
        .offset(1, 0)
        .clearContent();
    }
  });
  return true;
}
function SaveDataToScriptProperties() {
  var namedRanges = SpreadsheetApp.getActiveSpreadsheet().getNamedRanges();
  var Direction = SpreadsheetApp.Direction;
  /// Save Current Data to Script Properties before clearing it ///
  var tables = {};
  namedRanges.forEach((nr) => {
    var rng = nr.getRange();
    var lRow = rng
      .getCell(1, 1)
      .getNextDataCell(Direction.DOWN)
      .getRow();
    var tableName = nr.getName();
    var dataRng = rng.offset(1, 0, lRow - 1);
    var vals = dataRng.getValues();
    tables[tableName] = vals;
  });
  var data = JSON.stringify(tables);
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperties({
    allRecords: data,
  });
}

function DeleteAllProperties() {
  PropertiesService.getScriptProperties().deleteAllProperties();
  PropertiesService.getUserProperties().deleteAllProperties();
}

function ReloadDefaultData(tableNames) {
  var namedRanges = SpreadsheetApp.getActiveSpreadsheet().getNamedRanges();
  var scriptProperties = PropertiesService.getScriptProperties();
  //  Logger.log(scriptProperties.getProperties()['allRecords']);
  var allTables = JSON.parse(scriptProperties.getProperties()["allRecords"]);
  // Logger.log(allTables);
  var Direction = SpreadsheetApp.Direction;
  namedRanges.forEach((nr) => {
    if (tableNames.includes(nr.getName())) {
      var rng = nr.getRange();
      // var lRow = rng
      //   .getCell(1, 1)
      //   .getNextDataCell(Direction.DOWN)
      //   .getRow();

      var data = allTables[nr.getName()];
      // Logger.log(data);

      var dataRng = rng.offset(1, 0, data.length, rng.getNumColumns());
      // Logger.log(dataRng.getA1Notation());
      dataRng.setValues(data);
    }
  });
  return true;
}
