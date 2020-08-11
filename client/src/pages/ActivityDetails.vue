<template>
  <div>
    <div>
      <b-jumbotron
        jumbotron-fluid
        lead="Maintenance Activity Details"
        class="gradient-OrangePink"
        text-variant="red"
      >
        <hr class="scarlet" />
        <b-container>
          <b-row>
            <b-col>
              <p class="text-responsive-scarlet" align="right">
                Activity Id :
              </p></b-col
            >
            <b-col cols="8"
              ><strong class="text-responsive-scarlet" align="left">
                {{ req.Activity_ID }}
              </strong></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-scarlet" align="right">
                Anchor Officer :
              </p></b-col
            >
            <b-col cols="8"
              ><strong class="text-responsive-scarlet-big" align="left">
                {{ req.Anchor_Officer }}
              </strong></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-scarlet" align="right">
                Location :
              </p></b-col
            >
            <b-col cols="8"
              ><strong class="text-responsive-scarlet-big" align="left">
                {{ req.Target_Location }}
              </strong></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-scarlet" align="right">
                Department :
              </p></b-col
            >
            <b-col cols="8"
              ><strong class="text-responsive-scarlet-big" align="left">
                {{ req.Target_Department }}
              </strong></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-scarlet" align="right">
                Target Equipment :
              </p></b-col
            >
            <b-col cols="8"
              ><strong class="text-responsive-scarlet-big" align="left">
                {{ req.Target_Equipment }}
              </strong></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-scarlet" align="right">
                Description :
              </p></b-col
            >
            <b-col cols="8"
              ><strong class="text-responsive-scarlet-big" align="left">
                {{ req.Activity_Description }}
              </strong></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-scarlet" align="right">
                Last Done On :
              </p></b-col
            >
            <b-col cols="8"
              ><strong align="left" class="text-responsive-scarlet-big">
                {{ req.Last_Done_On }}
              </strong></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-scarlet" align="right">
                Due On :
              </p></b-col
            >
            <b-col cols="8"
              ><strong align="left" class="text-responsive-scarlet-big">
                {{ req.Due_On }}
              </strong></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-scarlet" align="right">
                Status :
              </p></b-col
            >
            <b-col cols="8"
              ><strong class="text-responsive-scarlet-big" align="left">
                {{ req.Status }}
              </strong></b-col
            >
          </b-row>

          <b-button variant="primary" href="#" @click="sendReminder"
            >Send Reminder</b-button
          >
        </b-container>

        <hr />

        <b-card class="bg-ocean-fawn">
          <strong class="text-responsive-scarlet" align="left">
            Enter Maintenance Details
          </strong>
          <hr class="blue" />
          <form @submit.prevent="onSubmit">
            <b-form-group
              label-cols-sm="3"
              label="Maintenance Done On :"
              label-align-sm="right"
              label-for="nested-rectificationDate"
              class="text-responsive-algalblue"
            >
              <b-form-datepicker
                id="nested-rectificationDate"
                v-model="req.Done_On"
                today-button
                reset-button
                close-button
                locale="en"
              ></b-form-datepicker>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Activity Details :"
              label-align-sm="right"
              label-for="nested-Activity_Details"
              class="text-responsive-algalblue"
            >
              <b-form-textarea
                v-model="req.Activity_Details"
                id="nested-Activity_Details"
                rows="3"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Observations :"
              label-align-sm="right"
              label-for="nested-Observation"
              class="text-responsive-algalblue"
            >
              <b-form-textarea
                v-model="req.Observation"
                id="nested-Observation"
                rows="2"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Remarks :"
              label-align-sm="right"
              label-for="nested-Remarks"
              class="text-responsive-algalblue"
            >
              <b-form-textarea
                v-model="req.Remarks"
                id="nested-Remarks"
                rows="2"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Done By :"
              label-align-sm="right"
              label-for="nested-Done"
              class="text-responsive-algalblue"
            >
              <b-form-input
                v-model="req.Done_By"
                id="nested-Done"
                rows="2"
              ></b-form-input>
            </b-form-group>

            <b-button variant="danger" href="#" @click="addNewLog"
              >Submit</b-button
            >
          </form>
          <br /><br />
          <br /><br />
        </b-card>
        <br />
        <br />
        <br />
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";
export default {
  name: "ActivityDetails",

  props: ["req"],
  data() {
    return {
      bw: new BackEndWrapper(),
      allContacts: {},
      mailIDs: [],
      contacts: [],
    };
  },
  mounted() {
    this.loadRequest();
    this.loadContacts();
    // this.loadTableItems();
  },
  methods: {
    onSubmit: function() {
      this.addNewLog();
      console.log("Make API request.");
      this.resetForm(); //clear form automatically after successful request
      alert("Activity details logged successfully.!");
    },

    loadRequest() {},
    resetForm() {
      console.log("Reseting the form");
      var self = this;
      Object.keys(this.req).forEach(function(key, index) {
        self.req[key] = "";
      });
    },
    addNewLog() {
      var dt = new Date();
      const y = dt.getFullYear() - 2015;
      const m = dt.getMonth() + 1;
      const h = dt.getHours();
      const mn = dt.getMinutes();
      const sn = dt.getSeconds();
      var logId =
        String.fromCharCode(97 + y) +
        String.fromCharCode(97 + m) +
        String.fromCharCode(97 + h) +
        String(mn).padStart(2, "0") +
        String(sn).padStart(2, "0");
      logId = logId.toUpperCase();

      // this.req.Activity_ID = this.id;
      this.req.Log_ID = logId;
      this.bw.addNewRow(this.req, "Activity Logs").then(
        function(res) {
          google.script.run.changeNumberFormat(
            "Activity Logs",
            "B2:B",
            "dd/MM/yyyy"
          );
          this.$router.push({ name: "filteredActivities" });
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
    sendReminder() {
      this.getContactAndIds();
      // this.sendMsg();
      this.sendEmail();
    },
    sendMsg() {
      var msg = "PM Activity Notification :-";
      // msg =
      //   msg +
      //   "/" +
      //   "Location : " +
      //   this.req.Location +
      //   "/" +
      //   this.req.Department +
      //   "/" +
      //   this.req.Equipment_Name +
      //   "/" +
      //   "Notification Details :" +
      //   this.req.Notification_Details +
      //   "/" +
      //   "Link : https://script.google.com/macros/s/AKfycbz4Q0VoFctPT2vrFkZsLw2wciR8TNpcvlUtdxeh4ug2nPmjQ33a/exec";
      // console.log("Msg Sent");

      // this.bw.sendElksSMS(msg, this.contacts).then(
      //   function(res) {
      //     console.log("Msg", msg);
      //   }.bind(this),
      //   function(err) {
      //   }.bind(this)
      // );
      var msg = msg + JSON.stringify(this.req);
      this.bw.sendElksSMS(msg, this, contacts).then(
        function(res) {
          // this.$router.push({ name: "home" });
          alert("Message sent successfully.!");
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
    loadContacts() {
      this.bw.loadNotificationsTable("Contacts").then(
        function(res) {
          this.allContacts = res;
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
    getContactAndIds() {
      let contactKeys = [
        this.req.Jurisdiction,
        this.req.Anchor_Officer,
        this.req.Target_Department,
        "DGM",
      ];
      let found = "";
      contactKeys.forEach((element) => {
        found = this.allContacts.find(function(el) {
          if (el.Name == element) {
            return el;
          }
        });
        this.contacts.push("+" + found.Mobile.toString());
        this.mailIDs.push(found.mailID);
      });
      console.log("Contact :", this.contacts);
    },
    sendEmail() {
      this.bw.sendEmail2(this.req, this.mailIDs).then(
        function(res) {
          // this.$router.push({ name: "open" });
        }.bind(this),
        function(err) {
          console.log("User Not Signed in");
        }.bind(this)
      );
    },
  },
};
</script>
