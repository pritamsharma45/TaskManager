<template>
  <b-jumbotron lead="Edit Dropdown" class="text-responsive-green">
    <hr class="darkGreenBlue" />
    <b-form-group label="Select DropDown:" label-for="input-3">
      <b-form-select
        id="input-3"
        v-model="selectedDD"
        :options="DD_Names"
        @change="loadDropdowns"
      ></b-form-select>
    </b-form-group>

    <b-form-group
      label-cols-sm="3"
      label="Enter Value :"
      label-align-sm="right"
      label-for="nested-action"
      class="text-responsive-algalblue"
    >
      <b-form-input v-model="option" id="nested-action" required></b-form-input>
    </b-form-group>
    <div>
      <button
        type="button"
        class="btn btn-success"
        align="right"
        @click="updateDD()"
      >
        Update
      </button>
    </div>
    <br />
    <div>
      <ul id="example-1" ref="list">
        <li v-for="item in ddOptions">
          {{ item }}
        </li>
      </ul>
    </div>
  </b-jumbotron>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";

export default {
  name: "DDManager",
  data() {
    return {
      bw: new BackEndWrapper(),
      selectedDD: "",
      ddOptions: [],

      DD_Names: [
        "Location",
        "Department",
        "Sender",
        "Receiver",
        "Mechanical",
        "Electrical",
        "Instrumentation",
        "CP",
        "Activity_Category",
        "Target_Equipment",
        "PM_Frequency",
        "Activity_Type",
        "Anchor_Officer",
        "Target_Location",
      ],
      option: "",
      selectedDDOptions: {},
    };
  },

  mounted() {
    // this.getDDNames();
  },

  methods: {
    loadDropdowns() {
      let DD_Name = [this.selectedDD];
      this.bw.getDDList(DD_Name).then(
        function(res) {
          console.log("dropdowns ", res);
          this.selectedDDOptions = res;
          this.ddOptions = this.selectedDDOptions[this.selectedDD];
          // this.$refs.list.refresh();
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
    getDDNames() {
      this.bw.getDDNames().then(
        function(res) {
          console.log("dropdowns ", res);
          this.ddNames = res;
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
    updateDD() {
      this.bw.addToDDWithName(this.selectedDD, this.option).then(
        function(res) {
          console.log("dropdowns ", Updated);
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
      this.ddOptions.push(this.option);
      this.option = "";
      this.$refs.list.refresh();
    },
  },
};
</script>
