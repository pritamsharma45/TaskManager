function showSideForUploadingCustomers() {
  var html = HtmlService.createHtmlOutputFromFile("FilePicker").setTitle(
    "Upload customers data"
  );
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(html);
}

function transferData(data) {
  var rng = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("tbl_client");
  var headerInData = data[0];

  var headerInNamedRange = rng.getValues()[0];
  // Logger.log(headerInNamedRange)
  // Logger.log(headerInData)

  if (
    headerInData.join().replace(/ /g, "") ==
    headerInNamedRange.join().replace(/ /g, "")
  ) {
    // Logger.log("Matched")
    try {
      var pasteData = data.slice(1);
      rng.offset(1, 0).clear();
      rng.offset(1, 0, pasteData.length).setValues(pasteData);
      // Logger.log(pasteData)

      return "Uploaded successfully";
    } catch (err) {
      // Logger.log(err.message)
      return "Upload Failed" + err.message;
    }
  } else {
    return "Upload failed. Check if header is matching properly. It's order should also be identical.";
  }
}

function convertTo2Darray() {
  var items = [{ id: "1", name: "apple" }, { id: "2", name: "banana" }];

  var i = 0,
    result = [];

  while (i < items.length) {
    result.push([]);
    for (var key in items[i]) {
      result[result.length - 1].push(items[i][key]);
    }
    i++;
  }

  var rng = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("tbl_client");

  rng.offset(1, 0, items.length).setValues(result);

  Logger.log(result);
}

function ArrayToJSON(array2D) {
  const header = array2D[0];
  const body = array2D.slice(1);
  const arr2 = body.map((el) => {
    let obj = {};
    for (let i = 0; i < el.length; ++i) {
      obj[header[i]] = el[i];
    }
    return obj;
  });
  return arr2;
}
/**
 * Function to trim the rows of a range. The range should contain a header in the first row.
 * @param {Range} range: a range object from Google spreadsheet. First row of range must be the headers.
 * @returns {Range}
 */
function trimRangeRows(range) {
  var values = range.getValues();
  for (var rowIndex = values.length - 1; rowIndex >= 0; rowIndex--) {
    if (values[rowIndex].join("") !== "") {
      break;
    }
  }
  return range.offset(
    (rowOffset = 0),
    (columnOffset = 0),
    (numRows = rowIndex + 1)
  );
}

function NamedRangeToJSON() {
  var rng = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("tbl_client");
  var vals = trimRangeRows(rng).getValues();
  const jsons = ArrayToJSON(vals);
  const o = {};
  jsons.map((row) => {
    o[row["company_type"]] = row["id"];
  });

  // Logger.log(o);
  // Logger.log(ArrayToJSON(vals));
}

function indexedTable(rangeName, index_col_name, value_col_name) {
  var rng = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(rangeName);
  var vals = trimRangeRows(rng).getValues();
  const jsons = ArrayToJSON(vals);
  let o = {};
  jsons.map((row) => {
    o[row[index_col_name]] = row[value_col_name];
  });
  return o;
}

function ReplaceClientTypeWithKey() {
  var rangeWhereToDoReplacement = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(
    "tbl_client"
  );
  let object = indexedTable("tbl_client_type", "type", "id");
  for (const k in object) {
    let textFinder = rangeWhereToDoReplacement
      .createTextFinder(k)
      .matchEntireCell(true)
      .replaceAllWith(object[k]);
  }
}
