"use strict";

class GASBackEnd {
  constructor() {}
  loadRequests() {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .loadRequests();
    });
  }
  getHistory(criteria, columnName, sheetName) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getHistory(criteria, columnName, sheetName);
    });
  }

  loadNotificationsObject() {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getNotificationObject();
    });
  }

  loadNotificationsTable(sheetName) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getNotificationTableItems(sheetName);
    });
  }

  getTableItemsInSheet() {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getTableItemsInSheet();
    });
  }
  loadHeaders() {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .loadHeaders();
    });
  }

  loadDropdowns() {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getDropDown();
    });
  }
  requestDetails(id) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .requestDetails(id);
    });
  }

  sendEmail(req, mailIds,obj) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .sendEmail(req, mailIds,obj);
    });
  }
  sendEmail2(req, mailIds) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .sendEmail2(req, mailIds);
    });
  }
  approveRequest(id, updateObj) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .approveRequest(id, updateObj);
    });
  }
  witeToRow(id, updateObj, sheetName) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .writeToRow(id, updateObj, sheetName);
    });
  }

  rejectRequest(id) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .rejectRequest(id);
    });
  }
  newRequest(req) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .newRequest(req);
    });
  }

  newActivity(req) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .newActivity(req);
    });
  }

  getDDList(DDList) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getDDList(DDList);
    });
  }

  getNotifsJurisdictionWise(location) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getNotifsJurisdictionWise(location);
    });
  }
  getActivitiesJurisdictionWise(location) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getActivitiesJurisdictionWise(location);
    });
  }
  getDDNames() {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getDDNames();
    });
  }

  addToDDWithName(ddName, option) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .addToDDWithName(ddName, option);
    });
  }

  sendElksSMS(msg, contacts) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .sendElksSMS(msg, contacts);
    });
  }
  addNewRow(rowObj, sheetName) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .addNewRow(rowObj, sheetName);
    });
  }
  closedNotifications() {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .closedNotifications();
    });
  }
  getAggregates() {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .getPivotTableObject();
    });
  }
}

export default GASBackEnd;
