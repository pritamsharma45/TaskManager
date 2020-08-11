<template>
  <div>
    <b-jumbotron jumbotron-fluid style="width:100vw;">
      <b-form-group
        label-cols-sm="3"
        label="Select Jurisdiction :"
        label-align-sm="right"
        label-for="nested-Locations"
        class="text-responsive-algalblue"
      >
        <b-form-select
          id="Locations"
          v-model="officeLocation"
          :options="locationOptions"
          @change="loadTableItems"
        ></b-form-select>
      </b-form-group>
      <!-- <template v-slot:lead>
        {{ title }}
      </template> -->
      <div>
        <b-form-checkbox
          id="checkbox-1"
          v-model="notifsType"
          name="checkbox-1"
          value="Closed"
          unchecked-value="Open"
          class="text-responsive-algalblue"
          @change="loadTableItems"
        >
          Show Closed Notifications
        </b-form-checkbox>
        <b-button variant="success" size="sm" @click="reloadFromServer">
          <b-icon icon="arrow-repeat"></b-icon> Refresh
        </b-button>
      </div>
      <hr class="darkGreenBlue" />
      <p class="text-responsive-algalblue">
        Showing list of <b> {{ notifsType }}</b> notifications of
        <b> {{ officeLocation }}</b> jurisdiction
      </p>
      <div>
        <b-table
          responsive
          bordered
          class="table-responsive table-condensed "
          striped
          :items="tableItems"
          :fields="headerFields"
          :tbody-tr-class="rowClass"
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
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";
//import { mapActions}  from 'vuex'
export default {
  name: "ClosedNotifications",
  data() {
    return {
      bw: new BackEndWrapper(),
      notifsType: "Open",
      officeLocation: "",
      title: "",
      tableItems: [],
      locationOptions: ["Vadinar", "Thamna", "Bawdi", "Bina"],
      headerFields: [
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
    };
  },
  mounted() {
    google.script.run.withSuccessHandler(matchArrayLength).RecordTableLength();
    function matchArrayLength(length) {
      if (length > this.tableItems.length) {
        this.reloadFromServer();
      }
      console.log("Loaded from Local storage instead", length);
    }

    try {
      this.getFromLocalStorage();
    } catch (error) {
      console.log("Error in get LS:", error.message);
      console.log("Local Storage Failed");
      this.loadTableItems();
    }
  },
  methods: {
    reloadFromServer() {
      this.notifsType = "Open";
      this.loadTableItems();
    },
    loadTableItems() {
      this.bw.getNotifsJurisdictionWise(this.officeLocation).then(
        function(res) {
          res = res.filter((obj) => obj["Status"] === this.notifsType);
          this.tableItems = res;
          this.title =
            "Showing list of " +
            this.notifsType +
            " notifications of " +
            this.officeLocation +
            " jurisdiction.";
          this.pushToLocalStorage();
          console.log("table items", res);
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
    pushToLocalStorage() {
      if (typeof Storage !== "undefined") {
        window.localStorage.setItem("LS_OfficeLocation", this.officeLocation);

        window.localStorage.setItem("LS_Status", this.notifsType);
        window.localStorage.setItem(
          "OpenNotifsTable",
          JSON.stringify(this.tableItems)
        );
      } else {
      }
    },
    getFromLocalStorage() {
      if (typeof Storage !== "undefined") {
        this.officeLocation = window.localStorage.getItem("LS_OfficeLocation");
        this.notifsType = window.localStorage.getItem("LS_Status");

        this.tableItems = JSON.parse(localStorage.getItem("OpenNotifsTable"));

        console.log(
          "Notifications from LS",
          JSON.parse(localStorage.getItem("OpenNotifsTable"))
        );
      } else {
        console.log("Local Storage Not Supported");
      }
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.Status === "Open") return "table-danger";
      if (item.Status === "Closed") return "table-success";
    },
  },
};
</script>
