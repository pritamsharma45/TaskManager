"use strict";
var _ = require("lodash");

import { createHiddenSheet } from "./HiddenSheet.js";
import ColumnNames from "./ColumnNames.js";
import QueryBuilder from "./QueryBuilder.js";

class SpreadsheetDB {
  constructor(options) {
    this.spreadsheet = null;
    this.sheet = null;
    this.ddSheet = null;
    this.options = {};
    this.defaults = {
      header_row: 1,
      column_names: null,
      source_url: null,
      id_column: "A",
    };
    this.open(options);
  }

  open(options) {
    Object.assign(this.options, this.defaults, options);

    if (this.options.source_url) {
      this.spreadsheet = SpreadsheetApp.openByUrl(this.options.source_url);
      this.sheet = this.spreadsheet.getSheetByName("Records");
      this.ddSheet = this.spreadsheet.getSheetByName("DropDowns");
    }

    if (!this.options.column_names) {
      this.options.column_names = this.getHeaderRow();
    }

    this.options.column_names = new ColumnNames(this.options.column_names);

    this.query = new QueryBuilder(this.options, this.spreadsheet, this.sheet);
  }

  getLastColumn() {
    return this.sheet.getDataRange().getLastColumn();
  }

  getLastRow() {
    return this.sheet.getDataRange().getLastRow();
  }
  /* get the First Row with column headings */
  getHeaderRow() {
    return this.getRowValues(this.options.header_row);
  }
  getRowValues(row) {
    try {
      var range = this.sheet.getRange(row, 1, 1, this.getLastColumn());
      var rows = range.getValues();
      return rows[0];
    } catch (e) {
      return [];
    }
  }

  /*
	if @range is null, get the whole sheet of data in json format
	Note: this can be heavy if the sheet is large
	 */
  getDataJSON(range = null) {
    let datamx = [];
    let start = 0;
    if (!range) {
      datamx = this.sheet.getDataRange().getValues();
      start = this.options.header_row;
    } else {
      datamx = this.sheet.getRange(range).getValues();
    }

    return this.options.column_names.makeJson(datamx);
    /*let ret=[];
		for(let row= start; row<datamx.length; row++)
		{
			ret.push(this.options.column_names.makeJson(datamx[row]) );
		}
		return ret;*/
  }

  addToDDWithName(ddName, option) {
    let ddSheet = this.spreadsheet.getSheetByName("DropDowns");
    let lastColNum = ddSheet.getDataRange().getLastColumn();
    let ddNames = ddSheet
      .getRange(1, 1, 1, lastColNum)
      .getValues()
      .toString()
      .split(",");

    let objColNames = new ColumnNames(ddNames);
    let colNumber = objColNames.getColNumber(ddName);

    let colLbl = col_number_to_label(colNumber);
    let Avals = ddSheet.getRange(colLbl + ":" + colLbl).getValues();
    let rowNum = Avals.filter(String).length + 1;

    ddSheet.getRange(rowNum, colNumber).setValue(option);
  }

  getDDOptionsForDDNames(DD_List) {
    // let DD_List = ["Location", "Department", "Status", "Priority"];
    let ddSheet = this.spreadsheet.getSheetByName("DropDowns");
    let lastColNum = ddSheet.getDataRange().getLastColumn();

    let ddNames = ddSheet
      .getRange(1, 1, 1, lastColNum)
      .getValues()
      .toString()
      .split(",");
    let ddCount = ddNames.length;

    let ddCollection = {};

    for (let c = 0; c < DD_List.length; c++) {
      let ddName = DD_List[c];
      let objColNames = new ColumnNames(ddNames);
      let colNumber = objColNames.getColNumber(ddName);

      let colLbl = col_number_to_label(colNumber);
      let Avals = ddSheet.getRange(colLbl + ":" + colLbl).getValues();
      let numberOfValues = Avals.filter(String).length;
      let dd = ddSheet
        .getRange(2, colNumber, numberOfValues)
        .getValues()
        .toString()
        .split(",");
      ddCollection[ddName] = dd;
    }
    return ddCollection;
  }

  getDropDown() {
    let ddSheet = this.spreadsheet.getSheetByName("DropDowns");
    let lastColNum = ddSheet.getDataRange().getLastColumn();

    let ddNames = ddSheet
      .getRange(1, 1, 1, lastColNum)
      .getValues()
      .toString()
      .split(",");
    let ddCount = ddNames.length;

    let ddCollection = {};

    for (let c = 0; c < ddCount; c++) {
      let ddName = ddNames[c];
      let objColNames = new ColumnNames(ddNames);
      let colNumber = objColNames.getColNumber(ddName);

      let colLbl = col_number_to_label(colNumber);
      let Avals = ddSheet.getRange(colLbl + ":" + colLbl).getValues();
      let numberOfValues = Avals.filter(String).length;
      let dd = ddSheet
        .getRange(2, colNumber, numberOfValues)
        .getValues()
        .toString()
        .split(",");
      ddCollection[ddName] = dd;
    }
    return ddCollection;
  }

  findRowById(id) {
    let column = this.options.id_column;

    let formula = make_match_formula(id, column, this.sheet.getName());

    let hidden_sheet = createHiddenSheet(this.spreadsheet, "_search_sheet");
    let row = hidden_sheet.runFormula(formula, "A1");
    return row;
  }

  getRowDataById(id) {
    let row = this.findRowById(id);

    let result = this.getDataJSON(row + ":" + row);
    if (result && result.length) {
      if (result.length == 1) {
        return result[0];
      }
    }
    return result;
  }

  update(id, col_name, col_value) {
    let row = this.findRowById(id);
    let col = this.options.column_names.getColNumber(col_name);

    if (row > 0 && col > 0) {
      this.sheet.getRange(row, col).setValue(col_value);
      return true;
    }
    return false;
  }
  insert(rec) {
    let row = this.options.column_names.jsonToRow(rec);
    this.sheet.appendRow(row);
    var column = this.sheet.getRange("B2:B");
    column.setNumberFormat("@");
    return true;
  }

  insert2() {
    var rec = {
      Activity_ID: "sdfvsd",
      Activity_Category: "dfsdfsdfa",
    };
    let row = this.options.column_names.jsonToRow(rec);
    //this.sheet.appendRow(row);
    return row;
  }
}

export function make_match_formula(needle, col, sheet_name) {
  let colref = "'" + sheet_name + "'!" + col + ":" + col;
  let formula = `MATCH(${JSON.stringify(needle)}, ${colref}, 0)`;

  return formula;
}

export function col_number_to_label(num) {
  var str = "";
  //num--; //0 is not A; 1 is A
  while (num > 0) {
    let rem = (num - 1) % 26;
    num = Math.floor((num - 1) / 26);
    str = String.fromCharCode(65 + rem) + str;
  }
  return str;
}

export default SpreadsheetDB;
