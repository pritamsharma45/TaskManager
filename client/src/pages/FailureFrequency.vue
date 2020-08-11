<template>
  <b-jumbotron
    jumbotron-fluid
    lead="Equipment Failure Frequency"
    class="text-responsive-green gradient-lightpurple"
    style="width:100vw;"
  >
    <hr class="darkGreenBlue" />
    <b-form-group
      id="input-group-6"
      label="Select Location :"
      label-for="input-6"
    >
      <b-form-select
        id="input-6"
        v-model="location"
        :options="locations"
        required
        @change="loadQueries"
      ></b-form-select>
    </b-form-group>
    <div>
      <!-- <button
        type="button"
        class="btn btn-success"
        align="right"
        @click="loadTableItems()"
      >
        Get List
      </button> -->
    </div>
    <b-table
      responsive
      bordered
      class="table-responsive table-condensed table-light"
      striped
      :items="tableItems"
      :fields="headers"
      ref="table"
      head-variant="dark"
    >
      <!-- <template v-slot:cell(Id)="data">
        <router-link
          :to="{
            name: 'NotifsDetails',
            params: { req: tableItems[data.index] },
          }"
          >{{ data.value }}</router-link
        >
      </template> -->
    </b-table>
  </b-jumbotron>
</template>

<script>
export default {
  name: "FailureFrequency",
  data() {
    return {
      location: "",
      tableItems: [],
      headers: ["Equipment_Name", "Failure_Frequency"],
      locations: ["Vadinar", "Thamna", "Bawdi", "Bina"],
    };
  },

  mounted() {},

  methods: {
    loadQueries() {
      google.script.run
        .withSuccessHandler(this.onSuccess)
        .getFailureFrequency(this.location);
    },

    onSuccess(res) {
      this.tableItems = res;
      console.log("Table ", res);
    },
  },
};
</script>
