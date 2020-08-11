"use strict";
import MockBackEnd from "./MockBackEnd.js";
import GASBackEnd from "./GASBackEnd.js";

class BackEndWrapper {
  constructor() {
    if (typeof google !== "undefined") {
      this.real = new GASBackEnd();
    } else {
      this.real = new MockBackEnd();
    }
  }

  loadRequests() {
    return this.real.loadRequests();
  }

  getDDNames() {
    return this.real.getDDNames();
  }

  loadNotificationObject() {
    return this.real.loadNotificationsObject();
  }

  loadNotificationsTable(sheetName) {
    return this.real.loadNotificationsTable(sheetName);
  }
  getTableItemsInSheet() {
    return this.real.getTableItemsInSheet();
  }

  loadHeaders() {
    return this.real.loadHeaders();
  }

  getHistory(criteria, columnName, sheetName) {
    return this.real.getHistory(criteria, columnName, sheetName);
  }

  loadDropdowns() {
    return this.real.loadDropdowns();
  }
  sendEmail2(req, mailIds) {
    return this.real.sendEmail2(req, mailIds);
  }
  requestDetails(id) {
    return this.real.requestDetails(id);
  }
  approveRequest(id, updateObj) {
    return this.real.approveRequest(id, updateObj);
  }

  writeToRow(id, updateObj, sheetName) {
    return this.real.approveRequest(id, updateObj, sheetName);
  }

  rejectRequest(id) {
    return this.real.rejectRequest(id);
  }
  newRequest(req) {
    return this.real.newRequest(req);
  }

  newActivity(req) {
    return this.real.newActivity(req);
  }
  getDDList(DDList) {
    return this.real.getDDList(DDList);
  }

  getNotifsJurisdictionWise(location) {
    return this.real.getNotifsJurisdictionWise(location);
  }
  getActivitiesJurisdictionWise(location) {
    return this.real.getActivitiesJurisdictionWise(location);
  }

  addToDDWithName(ddName, option) {
    return this.real.addToDDWithName(ddName, option);
  }

  sendElksSMS(msg, contacts) {
    return this.real.sendElksSMS(msg, contacts);
  }
  addNewRow(rowObj, sheetName) {
    return this.real.addNewRow(rowObj, sheetName);
  }
  closedNotifications() {
    return this.real.closedNotifications();
  }

  getAggregates() {
    return this.real.getAggregates();
  }
}

export default BackEndWrapper;
