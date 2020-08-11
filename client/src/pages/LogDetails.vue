<template>
  <div>
    <div>
      <b-jumbotron jumbotron-fluid
        lead="Log Details"
        class="gradient-PaleBlue"
        text-variant="red"
      >
        <hr class="midnightBlue" />
        <b-container>
          <b-row>
            <b-col>
              <p class="text-responsive-midnightBlue" align="right">
                Log Id :
              </p></b-col
            >
            <b-col cols="8"
              ><p class="text-responsive-midnightBlue" align="left">
                {{ req.Log_ID }}
              </p></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-midnightBlue" align="right">
                Done By :
              </p></b-col
            >
            <b-col cols="8"
              ><p class="text-responsive-midnightBlue-big" align="left">
                {{ req.Done_By }}
              </p></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-midnightBlue" align="right">
                Activity Details :
              </p></b-col
            >
            <b-col cols="8"
              ><p class="text-responsive-midnightBlue-big" align="left">
                {{ req.Activity_Details }}
              </p></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-midnightBlue" align="right">
                Observations :
              </p></b-col
            >
            <b-col cols="8"
              ><p class="text-responsive-midnightBlue-big" align="left">
                {{ req.Observation }}
              </p></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-midnightBlue" align="right">
                Remarks :
              </p></b-col
            >
            <b-col cols="8"
              ><p class="text-responsive-midnightBlue-big" align="left">
                {{ req.Remarks }}
              </p></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-midnightBlue" align="right">
                Permit ID :
              </p></b-col
            >
            <b-col cols="8"
              ><p class="text-responsive-midnightBlue-big" align="left">
                {{ req.Permit_ID }}
              </p></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-midnightBlue" align="right">
                Done On :
              </p></b-col
            >
            <b-col cols="8"
              ><p align="left" class="text-responsive-midnightBlue-big">
                {{ req.Done_On }}
              </p></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <p class="text-responsive-midnightBlue" align="right">
                Due On :
              </p></b-col
            >
            <b-col cols="8"
              ><p align="left" class="text-responsive-midnightBlue-big">
                {{ req.Due_On }}
              </p></b-col
            >
          </b-row>
        </b-container>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";
export default {
  name: "LogDetails",

  props: ["req"],
  data() {
    return {
      bw: new BackEndWrapper(),
      req: {}
    };
  },
  mounted() {
    this.loadRequest();
    // this.loadTableItems();
  },
  methods: {
    loadRequest() {}
  }
};
</script>
