<template>
  <div>
    <b-jumbotron style="width:90vw;">
      <template v-slot:lead> Activity Logs for : {{ id }} </template>
      <div>
        <hr class="darkGreenBlue" />
      </div>
      <div>
        <b-table
          responsive
          bordered
          class="table-responsive table-condensed "
          striped
          :items="tableItems"
          :fields="headerFields"
          ref="table"
        >
          <template v-slot:cell(Detail)="data">
            <router-link
              :to="{
                name: 'LogDetails',
                params: { req: tableItems[data.index] }
              }"
              >View Detail</router-link
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
  name: "ActivityLogs",
  props: ["id"],
  data() {
    return {
      bw: new BackEndWrapper(),
      tableItems: [],
      headerFields: [
        "Done_On",
        "Activity_Details",
        "Observation",
        "Done_By",
        "Detail"
      ]
    };
  },
  mounted() {
    this.loadTableItems();
  },
  methods: {
    loadTableItems() {
      this.bw.loadNotificationsTable("Activity Logs").then(
        function(res) {
          res = res.filter(obj => obj["Activity_ID"] === this.id);
          this.tableItems = res;
          console.log("table items", res);
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
      this.$refs.table.refresh();
    }
  }
};
</script>
