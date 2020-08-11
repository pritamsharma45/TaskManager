<template>
  <b-jumbotron
    jumbotron-fluid
    lead="Showing open notifications only"
    class="text-responsive-green gradient-endless-river"
    style="width:100vw;"
  >
    <br />
    <p class="text-responsive-grey" align="left">
      {{ titleLabel }}
    </p>
    <hr class="darkGreenBlue" />

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
  props: ["filterCriteria", "filterValue"],
  data() {
    return {
      bw: new BackEndWrapper(),

      dropDowns: {},
      filteredObj: {},
      equipmentName: "MLP-C",
      titleLabel: "",
      inCol: "",
      tableItems: [],
      headers: [],
    };
  },

  mounted() {
    this.loadTableItems();
    this.$refs.table.refresh();
  },
  created: function() {
    this.loadTableItems();

    this.$refs.table.refresh();
  },

  methods: {
    loadTableItems() {
      if (this.filterValue > 2) {
        this.inCol = "Receiver";
        this.titleLabel = "Maint. Officer :  " + this.filterCriteria;
        this.headers = ["Id", "Date", "Notification_Details"];
      } else {
        this.inCol = "Department";
        this.titleLabel = "Department :  " + this.filterCriteria;
        this.headers = ["Id", "Date", "Notification_Details"];
      }

      this.bw.getHistory(this.filterCriteria, this.inCol, "Records").then(
        function(res) {
          res = res.filter((obj) => obj["Status"] === "Open");

          this.tableItems = res;
          console.log("table items", res);
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );

      this.$refs.table.refresh();
    },
  },
};
</script>
