import Vue from "vue";
import taskStore from "./task";

const state = Vue.observable({
  dropdowns: {},
  indexedDropdowns: {},
  tables: {},
  tablesLoaded: false,
  loading: true,
  loggedUser: null,
});

export default {
  get state() {
    return state;
  },
  get allTables() {
    return {
      ...state.tables,
      tbl_task: taskStore.state.tasks,
    };
  },
  getIndexedTables() {
    const tableNames = [
      "tbl_task_type",
      "tbl_activity_type",
      "tbl_company_type",
      "tbl_periodicity",
      "tbl_user",
      "tbl_client",
      // "tbl_task",
    ];
    let o = {};
    if (state.tablesLoaded == true) {
      tableNames.forEach((name) => {
        state.indexedDropdowns[name] = this.getIndexedItems(state.tables[name]);
        // o[name] = this.getIndexedItems(state.tables[name]);
      });
    } else {
    }
    console.log("Indexed Items :", state.indexedDropdowns);
  },
  async getIndexedDropdowns() {
    try {
      google.script.run
        .withSuccessHandler((res) => {
          state.indexedDropdowns = res;
          console.log("State [Indexed Dropdowns] :", res);
          // localStorage.set("indexedDropdowns", JSON.stringify(res));
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        .getIndexedDropdowns([
          "tbl_task_type",
          "tbl_activity_type",
          "tbl_company_type",
          "tbl_periodicity",
          "tbl_user",
          "tbl_client",
        ]);
    } catch (error) {}
  },
  // async getTables() {
  //   try {
  //     google.script.run
  //       .withSuccessHandler((res) => {
  //         // console.log("State [All Configuration Tables] :", res);
  //         state.tables = res;
  //       })
  //       .withFailureHandler((error) => {
  //         console.log(error);
  //       })
  //       .GetTables([
  //         "tbl_task_type",
  //         "tbl_activity_type",
  //         "tbl_company_type",
  //         "tbl_periodicity",
  //         "tbl_user",
  //         "tbl_client",
  //         "tbl_task",
  //       ]);
  //   } catch (error) {}
  // },
  getTables() {
    var that = this;
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          state.tables = res;
          state.loading = false;
          state.tablesLoaded = true;
          console.log("State [All Tables] :", res);
          that.getIndexedTables();
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .GetTables([
          "tbl_task_type",
          "tbl_activity_type",
          "tbl_company_type",
          "tbl_periodicity",
          "tbl_user",
          "tbl_client",
          // "tbl_task",
        ]);
    });
  },
  updateOrAddItem(item, tableName) {
    try {
      if (tableName === "tbl_task") {
        if (item.hasOwnProperty("id")) {
          let foundItem = taskStore.state.tasks.find((k) => {
            k.id === item.id;
          });
          foundItem = { ...foundItem, ...item };
        } else {
          taskStore.state.tasks.push(item);
        }
        console.log(
          `Items in ${tableName} after Updating or Adding Item. Item:-`,
          taskStore.state.tasks
        );
      } else {
        if (item.hasOwnProperty("id")) {
          let foundItem = state.tables[tableName].find((k) => {
            k.id === item.id;
          });
          foundItem = { ...foundItem, ...item };
        } else {
          state.tables[tableName].push(item);
        }
        console.log(
          `Items in ${tableName} after Updating or Adding Item. Item:-`,
          state.tables[tableName]
        );
      }
    } catch (error) {}
  },
  getIndexedItems(arr) {
    console.log("dfgpopuiotydtrdfsdfgs");
    if (arr.length > 0) {
      let o = {};
      arr.forEach((el) => {
        o[el.id] = el;
      });
      return o;
    } else {
      console.log("Indexing Not possible. Due to empty array provided");
      return {};
    }
  },
  /**
   * Function to check if item in a given table is deletable or not.
   * @param {Object} item: Item to be deleted
   * @param {String} fromTable:Table from which item to be deleted.
   * @param {String} inTables: Array of table names to look for
   * @returns {Boolean}
   */
  isDeletable(item, fromTable, inTables) {
    const fld = fromTable.replace("tbl_", "") + "_id";
    const keys = this._getFkeys(fld, inTables);
    // console.log(keys);
    var bool = true;
    Object.keys(keys).forEach((k) => {
      if (keys[k].length > 0) {
        if (keys[k].includes(item.id)) {
          bool = false;
        }
      }
    });

    return bool;
  },
  _getFkeys(forField, inTables) {
    let o = {};
    var that = this;
    inTables.forEach((tbl) => {
      if (that._getHeader(tbl).includes(forField)) {
        if (that.allTables[tbl].length > 0) {
          const arr = that.allTables[tbl].map((el) => {
            return el[forField];
          });
          o[tbl] = arr;
        } else {
          o[tbl] = [];
        }
      }
    });
    return o;
  },
  _getHeader(tableName) {
    // console.log("All tables", this.allTables);
    const arr = Object.keys(this.allTables[tableName][0]);
    // console.log(arr);
    return arr;
  },
  getStringifiedTables() {
    var that = this;
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          // state.tables = res;
          // state.loading = false;
          // state.tablesLoaded = true;
          console.log("State [All Tables] :", res);
          that.getIndexedTables();
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .GetTables([
          "tbl_task_type",
          "tbl_activity_type",
          "tbl_company_type",
          "tbl_periodicity",
          "tbl_user",
          "tbl_client",
          // "tbl_task",
        ]);
    });
  },
  _ArrayToJSON(array2D) {
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
  },
};
