<template>
  <div>
    <div>
      <b-jumbotron
        jumbotron-fluid
        lead="Notification Details"
        class="gradient-aqua"
        text-variant="white"
      >
        <hr class="bluishGreen" />
        <b-container>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Notification Id :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Id }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Sent To :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Receiver }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Location :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Location }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Department :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Department }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Equipment Name :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Equipment_Name }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Description :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Notification_Details }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Priority :</p>
            </b-col>
            <b-col cols="8">
              <p align="left" class="text-responsive-yellow">{{ req.Priority }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Note :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Note }}</p>
            </b-col>
          </b-row>

          <b-button :disabled="isSubmitting" variant="success" @click="sendMailAgain">Send Mail</b-button>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="center">
                -------------------- Updated Notification Details
                --------------------
              </p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Notification Date :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Date }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Status :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Status }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Rectification Date :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Rectification_Date }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Actvity Start Date :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Activity_Start_Date }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Actvity End Date :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Activity_End_Date }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Action Taken :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Action }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Linked Permit ID :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Permit_No }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Material Consumed :</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Material_Consumed }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Man Hours(Hrs):</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Man_Hours }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">House keeping done:</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Housekeeping }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Handed over to ops:</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.HandedOver_To_Ops }}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Notification Closed On:</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Closed_On }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">Notification Closed By:</p>
            </b-col>
            <b-col cols="8">
              <p class="text-responsive-yellow" align="left">{{ req.Closed_By }}</p>
            </b-col>
          </b-row>
        </b-container>

        <hr />
        <!--  Update Notification Card -->
        <b-card class="bg-ocean-blue" v-if="isOpen">
          <form @submit.prevent="onSubmit">
            <b-form-group
              label-cols-sm="3"
              label="Update Notification Status"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="text-responsive-algalblue"
            >
              <hr class="blue" />

              <b-form-group
                label-cols-sm="3"
                label="Rectified On :"
                label-align-sm="right"
                label-for="nested-rectificationDate"
                class="text-responsive-algalblue"
              >
                <b-form-datepicker
                  id="datepicker-buttons"
                  v-model="req.Rectification_Date"
                  style="font-size: 13px;"
                  today-button
                  reset-button
                  close-button
                  size="sm"
                  locale="en-GB"
                  required
                  :date-format-options="{
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }"
                ></b-form-datepicker>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Activity Start Date :"
                label-align-sm="right"
                label-for="nested-startDate"
                class="text-responsive-algalblue"
              >
                <b-form-datepicker
                  block
                  id="nested-startDate"
                  v-model="req.Activity_Start_Date"
                  today-button
                  reset-button
                  size="sm"
                  close-button
                  locale="en-GB"
                  required
                  :date-format-options="{
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }"
                ></b-form-datepicker>
                <b-form-timepicker
                  id="timepicker-starttime"
                  v-model="req.Activity_Start_Time"
                  placeholder="Choose a time"
                  locale="en-GB"
                ></b-form-timepicker>
              </b-form-group>
              <b-form-group
                label-cols-sm="3"
                label="Activity End Date :"
                label-align-sm="right"
                label-for="nested-endDate"
                class="text-responsive-algalblue"
              >
                <b-form-datepicker
                  block
                  id="nested-endDate"
                  v-model="req.Activity_End_Date"
                  today-button
                  reset-button
                  size="sm"
                  close-button
                  locale="en-GB"
                  required
                  :date-format-options="{
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }"
                ></b-form-datepicker>
                <b-form-timepicker
                  id="timepicker-placeholder"
                  v-model="req.Activity_End_Time"
                  placeholder="Choose a time"
                  locale="en-GB"
                ></b-form-timepicker>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Action Taken :"
                label-align-sm="right"
                label-for="nested-action"
                class="text-responsive-algalblue"
              >
                <b-form-textarea v-model="req.Action" id="nested-action" rows="3" required></b-form-textarea>
              </b-form-group>
              <b-form-group
                label-cols-sm="3"
                label="Material Consumed :"
                label-align-sm="right"
                label-for="nested-action"
                class="text-responsive-algalblue"
              >
                <b-form-textarea
                  v-model="req.Material_Consumed"
                  id="nested-action"
                  rows="2"
                  required
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                label-cols-sm="3"
                label="Permit ID :"
                label-align-sm="right"
                label-for="nested-permitID2"
                class="text-responsive-algalblue"
              >
                <b-form-input v-model="req.Permit_No" id="nested-permitID2" required></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Permit Issue Date :"
                label-align-sm="right"
                label-for="nested-action"
                class="text-responsive-algalblue"
              >
                <b-form-datepicker
                  block
                  id="nested-endDate"
                  v-model="req.Permit_Issue_Date"
                  today-button
                  reset-button
                  size="sm"
                  close-button
                  locale="en"
                  :date-format-options="{
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }"
                  required
                ></b-form-datepicker>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Manhours(in Hours) :"
                label-align-sm="right"
                label-for="nested-action"
                class="text-responsive-algalblue"
              >
                <b-form-input v-model="req.Man_Hours" id="nested-action" rows="2" required></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Housekeeping Done :"
                label-align-sm="right"
                label-for="nested-Housekeeping"
                class="text-responsive-algalblue"
              >
                <b-form-select id="Housekeeping" v-model="housekeeping" :options="options"></b-form-select>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Handed over to ops :"
                label-align-sm="right"
                label-for="nested-HOTOPS"
                class="text-responsive-algalblue"
              >
                <b-form-select id="HOTOPS" v-model="handedOver" :options="options"></b-form-select>
              </b-form-group>
              <div class="form-group">
                <label for="type">Closed By:</label>
                <select class="form-control" id="type" v-model="req.Closed_By">
                  <option value>Select...</option>
                  <option v-for="(elmnt, index) in dropDowns['Receiver']">
                    {{
                    elmnt
                    }}
                  </option>
                </select>
              </div>
              <b-form-checkbox
                id="checkbox-1"
                v-model="req.Status"
                name="checkbox-"
                value="Closed"
                unchecked-value="No"
                class="text-responsive-algalblue"
              >Mark Close</b-form-checkbox>
            </b-form-group>
            <b-alert
              :show="dismissCountDown"
              dismissible
              variant="warning"
              @dismissed="dismissCountDown = 0"
              @dismiss-count-down="countDownChanged"
            >
              <p>{{ progressStatus }}</p>
            </b-alert>
            <input type="submit" class="btn btn-success" value=" Submit " />
          </form>
        </b-card>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";
export default {
  name: "NotifsDetails",
  props: ["req"],
  data() {
    return {
      bw: new BackEndWrapper(),
      userID: "",
      handedOver: "",
      housekeeping: "",
      options: ["Yes", "No", "NA"],
      dropDowns: {},
      awesome: false,
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      isOpen: true,
      allContacts: {},
      contacts: [],
      mailIDs: [],
      progressStatus: "Please Wait. Updating .......",
      isSubmitting: false
    };
  },
  computed: {
    dt: function() {
      return new Date();
    },
    handedOver: function() {
      return req.HandedOver_To_Ops;
    },
    housekeeping: function() {
      return req.Housekeeping;
    }
  },

  mounted() {
    console.log("Notifs", this.req);
    if (this.req.Status === "Closed") {
      console.log("Status is closed");
      this.isOpen = false;
    }

    // this.getUserID();
    this.loadDropdowns();
    this.loadContacts();
    this.handedOver = this.req.HandedOver_To_Ops;
    this.housekeeping = this.Housekeeping;
  },
  created() {
    this.getUserID();
  },
  methods: {
    loadRequest() {
      console.log("loading request with id ", this.id);

      this.bw.requestDetails(this.id).then(
        function(req) {
          console.log("requestDetails ", req);
          this.req = req;
        }.bind(this),
        function(err) {
          console.log("Error occured ", err);
        }.bind(this)
      );
    },
    loadDropdowns() {
      let DD_Names = ["Receiver"];
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
    getUserID() {
      google.script.run
        .withSuccessHandler(function(user) {
          this.userID = user;
          document.getElementById("userID-2").innerHTML =
            "Logged User : " + user;
        })
        .getActiveUserId();
    },
    onSubmit() {
      var updateObj = {};
      const dt = new Date();
      const options = { day: "numeric", month: "numeric", year: "numeric" };

      updateObj["Status"] = this.req.Status;
      updateObj["Action"] = this.req.Action;
      updateObj["Rectification_Date"] = this.req.Rectification_Date;
      updateObj["Material_Consumed"] = this.req.Material_Consumed;

      updateObj["Man_Hours"] = this.req.Man_Hours;

      updateObj["Permit_Issue_Date"] = this.req.Permit_Issue_Date;
      updateObj["Activity_Start_Date"] = this.req.Activity_Start_Date;
      updateObj["Activity_End_Date"] = this.req.Activity_End_Date;
      updateObj["Activity_Start_Time"] = this.req.Activity_Start_Time;
      updateObj["Activity_End_Time"] = this.req.Activity_End_Time;
      updateObj["HandedOver_To_Ops"] = this.handedOver;
      updateObj["Housekeeping"] = this.housekeeping;
      updateObj["Permit_No"] = this.req.Permit_No;

      updateObj["Closed_On"] = dt.toLocaleDateString("en-GB", options);
      updateObj["Closed_By"] = this.req.Closed_By;

      console.log("update Object", updateObj);
      this.bw.approveRequest(this.req.Id, updateObj).then(
        function(res) {
          this.progressStatus = "Updated Successfuly. !!";
          this.$router.push({ name: "open" });
          this.isOpen = false;
          this.sendEmail();
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
      this.showAlert();
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
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
        this.req.Office_Location,
        this.req.Receiver,
        this.req.Department,
        "DGM"
      ];
      let found = "";
      contactKeys.forEach(element => {
        found = this.allContacts.find(function(el) {
          if (el.Name == element) {
            return el;
          }
        });

        this.mailIDs.push(found.MailID);
      });
    },
    sendEmail() {
      this.getContactAndIds();

      google.script.run.sendNotifClosureMail(this.req, this.mailIDs);
    },
    sendMailAgain() {
      this.isSubmitting = true;
      this.getContactAndIds();
      var oldReq = {};
      oldReq["Receiver"] = this.req.Receiver;
      oldReq["Department"] = this.req.Department;
      oldReq["Location"] = this.req.Location;
      oldReq["Equipment_Name"] = this.req.Equipment_Name;

      var obj = [];

      console.log("mailIds", this.mailIDs);
      console.log("old Request object", oldReq);
      console.log("file obj", obj);
      // this.mailIDs = ["sharma.pritam311@gmail.com"];
      google.script.run
        .withSuccessHandler(function(res) {
          if (res) {
            alert("Mail sent successfully. !!");
            this.isSubmitting = false;
          }
        })
        .withFailureHandler(function(res) {
          console.log("Mail sent Failed :");
        })
        .sendEmail(oldReq, this.mailIDs, obj);
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>
