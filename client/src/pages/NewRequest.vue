<template>
  <div>
    <div id="account-details-2" class="left-align"></div>
    <b-jumbotron jumbotron-fluid lead="Notification Details" class="gradient-LightGreenBlue">
      <hr class="darkGreenBlue" />
      <p>Enter the details of the notifications below.</p>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="type">Jurisdiction:</label>
          <select class="form-control" id="type" v-model="req.Office_Location" required>
            <option value>Select...</option>
            <option v-for="(elmnt, index) in dropDowns['Jurisdiction']">
              {{
              elmnt
              }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="type">To:</label>
          <select class="form-control" id="type" v-model="req.Receiver" required>
            <option value>Select...</option>
            <option v-for="(elmnt, index) in dropDowns['Receiver']">
              {{
              elmnt
              }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="type">By:</label>
          <select class="form-control" id="type" v-model="req.Sender" required>
            <option value>Select...</option>
            <option v-for="elmnt in dropDowns['Sender']">{{ elmnt }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="locationtype">Location:</label>

          <b-form-input id="locationtype" list="my-location-id" v-model="req.Location" required></b-form-input>

          <datalist id="my-location-id">
            <option v-for="elmnt in dropDowns['Location']">{{ elmnt }}</option>
          </datalist>
        </div>

        <div class="form-group">
          <label for="type">Department:</label>
          <select class="form-control" id="type" v-model="req.Department">
            <option v-for="elmnt in dropDowns['Department']" v-bind:value="elmnt">{{ elmnt }}</option>
          </select>
        </div>

        <!-- <span>Selected Dept: {{ req.Department }}</span> -->
        <div class="form-group">
          <label for="type">Equipment Name:</label>

          <b-form-input id="type" list="my-list-id" v-model="req.Equipment_Name" required></b-form-input>

          <datalist id="my-list-id">
            <option v-for="elmnt in dropDowns[req.Department]">
              {{
              elmnt
              }}
            </option>
          </datalist>
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1">Notification Description :</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="req.Notification_Details"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="type">Priority:</label>
          <select class="form-control" id="type" v-model="req.Priority" required>
            <option value>Select...</option>
            <option v-for="elmnt in dropDowns['Priority']">{{ elmnt }}</option>
          </select>
        </div>

        <!-- <b-form-file
          multiple
          v-model="files"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>-->
        <input name="file" id="files" type="file" multiple />

        <b-alert
          :show="dismissCountDown"
          dismissible
          :variant="alertVariant"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>{{ alertMessage }}</p>
        </b-alert>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Notes</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
            v-model="req.Note"
          ></textarea>
        </div>
        <div>
          <b-button :disabled="isSubmitting" variant="success" @click="onSubmit">Submit</b-button>
        </div>
      </form>
    </b-jumbotron>
  </div>
</template>
<script>
import BackEndWrapper from "../services/BackEndWrapper";

export default {
  name: "NewRequest",
  data() {
    return {
      req: {
        Location: "",
        Office_Location: "",
        Department: "",
        Equipment_Name: "",
        Notification_Details: "",
        Note: "",
        Priority: "",
        Date: "",
        Receiver: "",
        Sender: ""
      },
      dropDowns: {},
      files: null,
      selectedDepartment: "",
      contacts: [],
      allContacts: {},
      mailIDs: [],
      bw: new BackEndWrapper(),
      dismissSecs: 6.0,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      alertMessage: "",
      alertVariant: "",
      isSubmitting: false
    };
  },

  computed: {
    selDept: function() {
      console.log("selected Dept", this.dropDowns[this.req.Department]);
      return this.dropDowns[this.req.Department];
    }
  },

  mounted() {
    this.loadDropdowns();
    this.loadContacts();
  },

  methods: {
    onSubmit: function() {
      this.alertVariant = "primary";
      this.alertMessage = "Please wait. Updating .....";
      this.showAlert();
      this.isSubmitting = true;
      this.postRequest();
      this.getContactAndIds();
      this.sendMailWithAttachments();
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
    sendMailWithAttachments() {
      const f = document.getElementById("files");

      Promise.all(
        [...f.files].map((file, i) => {
          const fr = new FileReader();
          console.log("Files", file.name);
          return new Promise(r => {
            fr.onload = e => {
              const data = e.target.result.split(",");
              r({
                fileName: file.name,
                mimeType: data[0].match(/:(\w.+);/)[1],
                data: data[1]
              });
            };
            fr.readAsDataURL(file);
          });
        })
      ).then(obj => {
        google.script.run
          .withSuccessHandler(this.mailSent)
          .sendEmail(this.req, this.mailIDs, obj);
      });
    },
    postRequest() {
      const dt = new Date();
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      this.req.Date = dt.toLocaleDateString("en-GB", options);
      this.bw.newRequest(this.req).then(
        function(res) {
          // this.$router.push({ name: "open" });
          this.alertVariant = "success";
          this.alertMessage = "Notification Update Successful. !!";

          this.resetForm(); //clear form automatically after successful request
          this.showAlert();
          this.isSubmitting = false;
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },

    resetForm() {
      console.log("Reseting the form");
      var self = this;
      Object.keys(this.req).forEach(function(key, index) {
        self.req[key] = "";
      });
    },
    mailSent(res) {
      if (res) {
        console.log("Mail Sending Success");
        this.alertVariant = "success";
        this.alertMessage = "Mail sent successfully.!!";
      } else {
        console.log("Mail Sending Failed");
        this.alertVariant = "danger";
        this.alertMessage = "Mail sending failed. Contact administrator. !!";
      }

      this.sendReminder();
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
        this.contacts.push("+" + found.Mobile.toString());
        this.mailIDs.push(found.MailID);
      });
      console.log("Mail IDS :", this.mailIDs);
    },

    sendReminder() {
      var msg = "Equipment Failure Notifications :-";
      msg =
        msg +
        "/" +
        "Location : " +
        this.req.Location +
        "/" +
        this.req.Department +
        "/" +
        this.req.Equipment_Name +
        "/" +
        "Notification Details :" +
        this.req.Notification_Details +
        "/" +
        "Link : https://script.google.com/macros/s/AKfycbz4Q0VoFctPT2vrFkZsLw2wciR8TNpcvlUtdxeh4ug2nPmjQ33a/exec";

      this.bw.sendElksSMS(msg, this.contacts).then(
        function(res) {
          console.log("Msg sent :", res);

          if (res) {
            // this.alertVariant = "success";
            // this.alertMessage = "Message sent successfully.!!";
          } else {
            this.alertVariant = "danger";
            this.alertMessage =
              "Message sending failed.!Contact administrator!";
          }
        }.bind(this),
        function(err) {}.bind(this)
      );
    },

    loadDropdowns() {
      let DD_Names = [
        "Jurisdiction",
        "Location",
        "Department",
        "Status",
        "Priority",
        "Sender",
        "Receiver",
        "Mechanical",
        "Electrical",
        "Instrumentation",
        "CP"
      ];
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

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>
