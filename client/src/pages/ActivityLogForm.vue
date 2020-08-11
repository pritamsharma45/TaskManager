<template>
  <div>
    <div>
      <b-jumbotron
        lead="Activity Details"
        class="gradient-aqua"
        text-variant="white"
      >
        <hr class="bluishGreen" />
        <b-container>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">
                Activity Id :
              </p></b-col
            >
            <b-col cols="8"
              ><p class="text-responsive-yellow" align="left">
                {{ id }}
              </p></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-white" align="right">
                Activity Description :
              </p></b-col
            >
            <b-col cols="8"
              ><p class="text-responsive-yellow" align="left">
                {{ description }}
              </p></b-col
            >
          </b-row>
        </b-container>

        <hr />

        <b-card class="bg-ocean-blue">
          <hr class="blue" />
          <form @submit.prevent="onSubmit">
            <b-form-group
              label-cols-sm="3"
              label="Done On :"
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
            <b-form-group
              label-cols-sm="3"
              label="Permit ID :"
              label-align-sm="right"
              label-for="nested-Done"
              class="text-responsive-algalblue"
            >
              <b-form-input
                v-model="req.Permit_ID"
                id="nested-Done"
                rows="2"
              ></b-form-input>
            </b-form-group>

            <b-button variant="primary" href="#" @click="addNewLog"
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
  name: "ActivityLogForm",
  props: ["id", "description"],
  data() {
    return {
      bw: new BackEndWrapper(),
      req: {
        Done_On: "",
        Activity_Details: "",
        Observation: "",
        Done_By: "",
        Remarks: "",
        Permit_ID
      }
    };
  },
  mounted() {
    //  this.loadRequest();
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

      this.req.Activity_ID = this.id;
      this.req.Log_ID = logId;
      this.bw.addNewRow(this.req, "Activity Logs").then(
        function(res) {
          this.$router.push({ name: "home" });
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    }
  }
};
</script>
