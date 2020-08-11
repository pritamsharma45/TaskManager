<template>
  <div>
    <b-jumbotron lead="Activity Codification" class="gradient-MintGreen">
      <hr class="darkSpringGreen" />
      <p class="text-darkSpringGreen">
        Enter the details of the activty below.
      </p>

      <!-- <span>Selected Dept: {{ req.Department }}</span> -->
      <form @submit.prevent="onSubmit">
        <label for="jurisdiction" class="text-darkSpringGreen"
          >Select Jurisdiction:</label
        >
        <select
          class="form-control"
          id="jurisdiction"
          v-model="req.Jurisdiction"
          required
        >
          <option value="">Select...</option>
          <option v-for="elmnt in dropDowns['Jurisdiction']">{{
            elmnt
          }}</option>
        </select>

        <!-- <div class="form-group">
          <label for="type" class="text-darkSpringGreen"
            >Activity Category:</label
          >
          <select
            class="form-control"
            id="type"
            v-model="req.Activity_Category"
            required
          >
            <option value="">Select...</option>
            <option v-for="elmnt in dropDowns['Activity_Category']">{{
              elmnt
            }}</option>
          </select>
        </div> -->

        <div class="form-group">
          <label for="type" class="text-darkSpringGreen"
            >Target Equipment Name :</label
          >
          <select
            class="form-control"
            id="type"
            v-model="req.Target_Equipment"
            required
          >
            <option value="">Select...</option>
            <option v-for="elmnt in dropDowns['Target_Equipment']">{{
              elmnt
            }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="type" class="text-darkSpringGreen"
            >Target Location :</label
          >
          <select
            class="form-control"
            id="type"
            v-model="req.Target_Location"
            required
          >
            <option value="">Select...</option>
            <option v-for="elmnt in dropDowns['Target_Location']">{{
              elmnt
            }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1" class="text-darkSpringGreen"
            >Activity Description :</label
          >
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="req.Activity_Description"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="type" class="text-darkSpringGreen">Department :</label>
          <select
            class="form-control"
            id="type"
            v-model="req.Target_Department"
            required
          >
            <option value="">Select...</option>
            <option v-for="elmnt in dropDowns['Target_Department']">{{
              elmnt
            }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="type" class="text-darkSpringGreen">Frequency :</label>
          <select
            class="form-control"
            id="type"
            v-model="req.PM_Frequency"
            required
          >
            <option value="">Select...</option>
            <option v-for="elmnt in dropDowns['PM_Frequency']">{{
              elmnt
            }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="type" class="text-darkSpringGreen"
            >Responsible Officer :</label
          >
          <select
            class="form-control"
            id="type"
            v-model="req.Anchor_Officer"
            required
          >
            <option value="">Select...</option>
            <option v-for="elmnt in dropDowns['Anchor_Officer']">{{
              elmnt
            }}</option>
          </select>
        </div>
        <b-alert
          :show="dismissCountDown"
          dismissible
          variant="primary"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>New Activity Added Successfully .!!</p>
        </b-alert>

        <div class="form-group">
          <label for="type" class="text-darkSpringGreen">Activity Type :</label>
          <select
            class="form-control"
            id="type"
            v-model="req.Activity_Type"
            required
          >
            <option value="">Select...</option>
            <option v-for="elmnt in dropDowns['Activity_Type']">{{
              elmnt
            }}</option>
          </select>
        </div>
        <div>
          <input type="submit" class="btn btn-success" value=" Submit " />
        </div>
      </form>
    </b-jumbotron>
  </div>
</template>
<script>
import BackEndWrapper from "../services/BackEndWrapper";

export default {
  name: "PMS",
  data() {
    return {
      req: {
        Target_Location: "",
        Target_Department: "",
        Target_Equipment: "",
        Activity_Description: "",
        Activity_Type: "",
        Frequency: "",
        Jurisdiction: "",

        Anchor_Officer: "",
      },
      dropDowns: {},

      bw: new BackEndWrapper(),
      dismissSecs: 3.5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },

  mounted() {
    this.loadDropdowns();
  },
  methods: {
    onSubmit: function() {
      this.postRequest();
      console.log("Make API request.");
      this.resetForm(); //clear form automatically after successful request
      this.showAlert();
    },
    postRequest() {
      this.bw.newActivity(this.req).then(
        function(res) {
          console.log("Activity Added :", res);

          // alert("Submitted !!");
        }.bind(this),
        function(err) {
          this.showError();
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

    loadDropdowns() {
      let DD_Names = [
        "Target_Location",
        "Target_Department",
        "Target_Equipment",

        "Activity_Type",
        "PM_Frequency",
        "Anchor_Officer",
        "Jurisdiction",
      ];
      console.log("DD_NamesPAssed");
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
    },
  },
};
</script>
