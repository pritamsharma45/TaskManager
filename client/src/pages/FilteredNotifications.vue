<template>
  <div>
    <b-jumbotron
      jumbotron-fluid
      lead="Filter Notifications"
      class="text-responsive-green"
      style="width:100vw;"
    >
      <hr class="darkGreenBlue" />
      <b-form-group
        id="input-group-5"
        label="Filter Notifications By :"
        label-for="input-3"
      >
        <b-form-select
          id="input-5"
          v-model="selCategory"
          :options="filterCriteria"
        ></b-form-select>
      </b-form-group>
      <div class="form-group">
        <label for="type2">Select One :</label>
        <select
          class="form-control"
          id="type2"
          v-model="selFilterKey"
          onChange="loadTableItems()"
        >
          <option value="">Select...</option>
          <option v-for="elmnt in dropDowns[selCategory]">{{ elmnt }}</option>
        </select>
        <div>
          <br />
          <button
            type="button"
            class="btn btn-success"
            align="right"
            @click="loadTableItems()"
          >
            Refresh
          </button>
        </div>
      </div>

      <b-table
        responsive
        bordered
        class="table-responsive table-condensed "
        striped
        :items="tableItems"
        :fields="headers"
        ref="table"
        :tbody-tr-class="rowClass"
        tbody-td-class="text-truncate"
        head-variant="dark"
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
  </div>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";

export default {
  name: "FilteredNotifications",
  data() {
    return {
      bw: new BackEndWrapper(),
      dropDowns: {},
      tableItems: [],
      headers: [
        "Id",
        "Date",
        "Location",
        "Department",
        "Equipment_Name",
        "Notification_Details",
        "Note",
        "Priority",
        "Status",
      ],
      filterCriteria: [
        { text: "Select One", value: null },
        { text: "Location", value: "Location" },
        { text: "Department", value: "Department" },
        { text: "Equipment Name", value: "Equipment_Name" },
        { text: "Maint. Officer", value: "Receiver" },
        { text: "Sender", value: "Sender" },
        { text: "Priority", value: "Priority" },
      ],

      selCategory: "",
      selFilterKey: "",
    };
  },

  mounted() {
    try {
      this.getFromLocalStorage();
    } catch (error) {
      console.log("Error in get LS:", error.message);
      if (error) {
        console.log("Local Storage Failed");
        this.loadDropdowns();
        console.log("Dropdowns Loaded");
      }
    }

    if (this.dropDowns == null) {
      this.loadDropdowns();
      console.log("Dropdowns Loaded");
    }
    if (this.tableItems.length > 0) {
      this.$refs.table.refresh();
    } else {
    }
  },

  methods: {
    loadTableItems() {
      this.bw.getHistory(this.selFilterKey, this.selCategory, "Records").then(
        function(res) {
          this.tableItems = res;
          console.log("table items", res);
          this.pushToLocalStorage();
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );

      this.$refs.table.refresh();
    },
    pushToLocalStorage() {
      if (typeof Storage !== "undefined") {
        window.localStorage.setItem(
          "LS_NotificationCategory",
          this.selCategory
        );
        window.localStorage.setItem("LS_NotificationKey", this.selFilterKey);

        window.localStorage.setItem(
          "Notif_TableFromLocalStorage",
          JSON.stringify(this.tableItems)
        );
      } else {
      }
    },
    getFromLocalStorage() {
      if (typeof Storage !== "undefined") {
        this.selCategory = window.localStorage.getItem(
          "LS_NotificationCategory"
        );
        this.selFilterKey = window.localStorage.getItem("LS_NotificationKey");

        // this.dropDowns = localStorage.getItem("LS_Notif_DD");
        this.tableItems = JSON.parse(
          localStorage.getItem("Notif_TableFromLocalStorage")
        );
        this.dropDowns = JSON.parse(localStorage.getItem("LS_Notif_DD"));
        console.log(
          "Notifications from LS",
          JSON.parse(localStorage.getItem("Notif_TableFromLocalStorage"))
        );
      } else {
        console.log("Local Storage Not Supported");
      }
    },
    loadDropdowns() {
      this.bw.loadDropdowns().then(
        function(res) {
          console.log("dropdowns ", res);
          this.dropDowns = res;
          window.localStorage.setItem("LS_Notif_DD", JSON.stringify(res));
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.Status === "Open") return "table-danger";
      if (item.Status === "Closed") return "table-success";
    },
  },
};
</script>
