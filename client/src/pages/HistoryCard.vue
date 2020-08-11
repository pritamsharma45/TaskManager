<template>
  <b-jumbotron jumbotron-fluid lead="History Card" class="text-responsive-green" style="width:100vw;">
    <hr class="darkGreenBlue" />
    <div class="form-group">
      <label for="type">Equipment Name:</label>
      <select class="form-control" id="type" v-model="equipmentName">
        <option value="">Select...</option>
        <option v-for="elmnt in dropDowns['Equipment_Name']">{{
          elmnt
        }}</option>
      </select>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-success"
        align="right"
        @click="loadTableItems()"
      >
        Get History
      </button>
    </div>
    <b-table
      responsive
      class="table-responsive table-condensed "
      striped
      :items="tableItems"
      :fields="headers"
      ref="table"
    >
      <template v-slot:cell(Id)="data">
        <router-link
          :to="{
            name: 'NotifsDetails',
            params: { req: tableItems[data.index] },
          }"
          >{{ data.value }}</router-link
        >
      </template>
    </b-table>
  </b-jumbotron>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";

export default {
  name: "FilteredNotifications",
  data() {
    return {
      bw: new BackEndWrapper(),
      dropDowns: {},
      filteredObj: {},
      equipmentName: "MLP-C",
      tableItems: [],
      headers: ["Id", "Date", "Notification_Details"],
    };
  },

  mounted() {
    this.loadDropdowns();
    this.loadTableItems();
    this.$refs.table.refresh();
  },
  created: function() {
    this.loadTableItems();

    this.$refs.table.refresh();
  },

  methods: {
    loadTableItems() {
      this.bw.getHistory(this.equipmentName, "Equipment_Name", "Records").then(
        function(res) {
          this.tableItems = res;
          console.log("table items", res);
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );

      this.$refs.table.refresh();
    },
    loadDropdowns() {
      let DD_Names = ["Equipment_Name"];
      this.bw.getDDList(DD_Names).then(
        function(res) {
          console.log("dropdowns ", res);
          this.dropDowns = res;
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },

    // rowClass(item, type) {
    //   if (!item || type !== "row") return;
    //   if (item.status === "awesome") return "table-success";
    // }
  },
};
</script>
