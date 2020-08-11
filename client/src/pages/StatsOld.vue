<template>
  <div>
    <b-jumbotron
      lead="Notification Dashboard"
      class="text-responsive-white gradient-dark-blue"
    >
      <hr />
      <p class="text-responsive-white" align="left">
        List of Open Notifications Categorically :
      </p>

      <b-list-group>
        <b-list-group-item
          v-for="(item, index) in aggregates.OpenOnly"
          class="d-flex justify-content-between align-items-center text-responsive-blue"
          :to="{
            name: 'TableFromBadge',
            params: { filterCriteria: item.key, filterValue: index },
          }"
          action
        >
          {{ item.key }}
          <b-badge variant="danger" pill>{{ item.value }}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-jumbotron>
    <b-jumbotron lead="Notification Dashboard">
      <p class="text-responsive-grey" align="left">
        Month Wise Notification Status :
      </p>

      <b-container class="bv-example-row">
        <p class="text-responsive-grey" align="left">
          Select Month :
        </p>

        <b-row>
          <b-col
            ><b-button-group vertical>
              <b-button
                variant="success"
                v-for="item in Object.keys(aggregates.MonthWise)"
                @click="selectMonth"
                :id="item"
                >{{ item }}</b-button
              >
            </b-button-group></b-col
          >
        </b-row>
        <p class="text-responsive-grey" align="left">
          Open Notifications :
        </p>

        <b-row>
          <b-col
            ><b-list-group>
              <b-list-group-item
                v-for="item in monthlyOpenNotifs"
                class="d-flex justify-content-between align-items-center"
                ref="ListGrp1"
              >
                {{ item.key }}
                <b-badge variant="warning" pill>{{ item.value }}</b-badge>
              </b-list-group-item>
            </b-list-group></b-col
          >
        </b-row>
        <p class="text-responsive-grey" align="left">
          Sent Notifications :
        </p>

        <b-row>
          <b-col
            ><b-list-group>
              <b-list-group-item
                v-for="item in monthlySentNotifs"
                class="d-flex justify-content-between align-items-center"
                ref="ListGrp2"
              >
                {{ item.key }}
                <b-badge variant="danger" pill>{{ item.value }}</b-badge>
              </b-list-group-item>
            </b-list-group></b-col
          >
        </b-row>
      </b-container>
    </b-jumbotron>

    <div>{{ selMonth }}</div>
  </div>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";

export default {
  name: "Stats",
  data() {
    return {
      bw: new BackEndWrapper(),
      selMonth: "",
      monthlyOpenNotifs: [],
      monthlySentNotifs: [],
      months: "",
      aggregates: {},
    };
  },
  mounted() {},
  created() {
    this.getAggregates();
  },

  methods: {
    selectMonth(event) {
      this.selMonth = event.target.id;
      this.monthlyOpenNotifs = this.aggregates.MonthWise[this.selMonth].filter(
        (obj) => obj.status === "Open"
      );
      this.monthlySentNotifs = this.aggregates.MonthWise[this.selMonth].filter(
        (obj) => obj.status === "Sent"
      );
      this.$refs.ListGrp1.refresh();
      this.$refs.ListGrp2.refresh();
    },

    getAggregates() {
      this.bw.getAggregates().then(
        function(res) {
          console.log("agrregates ", res);
          //this.fetchRequests = res ;
          this.aggregates = res;
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
  },
};
</script>
