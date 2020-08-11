<template>
  <b-jumbotron
    jumbotron-fluid
    lead="Activity List"
    class="text-responsive-green"
    style="width:100vw;"
  >
    <hr class="darkGreenBlue" />

    <b-form-group
      id="input-group-3"
      label="Select Jurisdiction :"
      label-for="input-3"
    >
      <b-form-select
        id="input-3"
        v-model="selectedJurisdiction"
        :options="locations"
        required
        @change="loadAfterSelectingJurisdiction"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      id="input-group-3"
      label="Filter Activities By :"
      label-for="input-3"
    >
      <b-form-select
        id="input-3"
        v-model="selectedFilterCriteria"
        :options="filterCriteria"
        required
      ></b-form-select>
    </b-form-group>
    <div class="form-group">
      <label for="type">Select One :</label>
      <select
        class="form-control"
        id="type"
        v-model="selectedKey"
        @change="refreshTable"
      >
        <option value="">Select...</option>
        <option v-for="elmnt in dropDowns[selectedFilterCriteria]">{{
          elmnt
        }}</option>
      </select>
    </div>

    <div>
      <button
        type="button"
        class="btn btn-success"
        align="right"
        @click="refreshTable"
      >
        Refresh
      </button>
    </div>
    <hr class="darkGreenBlue" />

    <b-table
      responsive
      class="table-responsive table-condensed "
      striped
      :items="tableItems"
      :fields="headers"
      ref="table"
      :tbody-tr-class="rowClass"
    >
      <template v-slot:cell(Activity_ID)="data">
        <router-link
          :to="{
            name: 'ActivityDetails',
            params: { req: tableItems[data.index] },
          }"
          >{{ data.value }}</router-link
        >
      </template>

      <!-- <template v-slot:cell(Update)="data">
        <router-link
          :to="{
            name: 'ActivityLogForm',
            params: {
              id: tableItems[data.index].Activity_ID,
              description: tableItems[data.index].Activity_Description,
            },
          }"
          >Update</router-link
        >
      </template> -->
      <template v-slot:cell(View_Logs)="data">
        <router-link
          :to="{
            name: 'ActivityLogs',
            params: { id: tableItems[data.index].Activity_ID },
          }"
          >View Logs</router-link
        >
      </template>
    </b-table>
  </b-jumbotron>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";

export default {
  name: "FilteredActivities",
  data() {
    return {
      bw: new BackEndWrapper(),
      dropDowns: {},
      errorLog: "",
      fetchedVal: "",
      equipmentName: "",
      selectedFilterCriteria: "",

      selectedJurisdiction: "",
      selectedKey: "",
      tableItems: [],
      allTableItems: [],
      headers: [
        "Activity_ID",
        "Activity_Description",
        "Target_Equipment",
        "Due_On",
        "View_Logs",
      ],
      filterCriteria: [
        { text: "Department", value: "Target_Department" },
        { text: "Target Equipment", value: "Target_Equipment" },
        { text: "Anchor Officer", value: "Anchor_Officer" },
        { text: "Activity Status", value: "Activity_Status" },
      ],
      locations: ["Vadinar", "Thamna", "Bawdi", "Bina"],
    };
  },

  mounted() {
    this.getFromLocalStorage();
    if (this.dropDowns == null) {
      this.loadDropdowns();
      console.log("Dropdowns Loaded");
    }
    if (this.tableItems.length > 0) {
      this.$refs.table.refresh();
    } else {
      this.refreshTable();
    }
  },
  methods: {
    loadTableItemsAll() {
      this.bw.getActivitiesJurisdictionWise(this.selectedJurisdiction).then(
        function(res) {
          this.allTableItems = res;
          this.tableItems = res;
          console.log("table items", res);
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },

    loadAfterSelectingJurisdiction() {
      this.loadTableItemsAll();
      // this.$refs.table.refresh();
    },

    refreshTable() {
      this.bw.getActivitiesJurisdictionWise(this.selectedJurisdiction).then(
        function(res) {
          this.tableItems = res.filter(
            (obj) => obj[this.selectedFilterCriteria] === this.selectedKey
          );
          this.pushToLocalStorage();
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },

    pushToLocalStorage() {
      if (typeof Storage !== "undefined") {
        window.localStorage.setItem(
          "LS_Jurisdiction",
          this.selectedJurisdiction
        );
        window.localStorage.setItem(
          "LS_Department",
          this.selectedFilterCriteria
        );
        window.localStorage.setItem("LS_Key", this.selectedKey);
        window.localStorage.setItem(
          "TableFromLocalStorage",
          JSON.stringify(this.tableItems)
        );
      } else {
      }
    },
    getFromLocalStorage() {
      if (typeof Storage !== "undefined") {
        this.selectedJurisdiction = window.localStorage.getItem(
          "LS_Jurisdiction"
        );
        this.selectedFilterCriteria = window.localStorage.getItem(
          "LS_Department"
        );
        this.selectedKey = window.localStorage.getItem("LS_Key");
        this.dropDowns = JSON.parse(localStorage.getItem("DDFromLocalStorage"));
        this.tableItems = JSON.parse(
          localStorage.getItem("TableFromLocalStorage")
        );
      } else {
        console.log("Local Storage Not Supported");
      }
    },
    loadDropdowns() {
      let DD_Names = [
        "Target_Department",
        "Anchor_Officer",
        "Target_Equipment",
        "Activity_Status",
        "Activity_Type",
      ];
      this.bw.getDDList(DD_Names).then(
        function(res) {
          console.log("dropdowns ", res);
          this.dropDowns = res;
          window.localStorage.setItem(
            "DDFromLocalStorage",
            JSON.stringify(res)
          );
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item["Days Left"] < "30") return "table-warning";
      if (item["Days Left"] > "30") return "table-success";
      if (item["Days Left"] < "0") return "table-danger";
      if (item.Status === "Over Due") return "table-danger";
    },
  },
};
</script>
