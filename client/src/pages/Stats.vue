<template>
  <div>
    <b-jumbotron
      jumbotron-fluid
      lead="Notification Dashboard"
      class="text-responsive-darkBlue gradient-cyan"
      style="width:100vw;"
    >
      <hr />
      <strong> Location Wise Aggregation </strong>
      <!--    New  Notification -->
      <div>
        <b-list-group>
          <b-list-group-item
            action
            @click="onJurisdictionClick(item.Office_Location)"
            v-b-toggle.collapse-1
            v-for="(item, index) in aggregates.locationWiseOpen"
            class="d-flex justify-content-between align-items-center text-responsive-blue"
          >
            {{ item.Office_Location }}
            <b-badge variant="danger" pill>{{ item.Total }}</b-badge>
          </b-list-group-item>
        </b-list-group>

        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <strong> Department Wise Aggregation </strong>
            <b-list-group style="max-width: 300px;">
              <b-list-group-item
                class="d-flex align-items-center"
                :to="{
                  name: 'TableFromBadge',
                  params: { filterCriteria: 'Mechanical', filterValue: '1' },
                }"
                action
              >
                <b-avatar
                  variant="info"
                  src="https://i.ibb.co/hsL9Hyx/images-1.png"
                  class="mr-3"
                ></b-avatar>
                <span class="mr-auto">Mechanical</span>
                <b-badge variant="primary" pill>{{
                  selectedAggregate.Mechanical
                }}</b-badge></b-list-group-item
              >
              <b-list-group-item
                class="d-flex align-items-center"
                :to="{
                  name: 'TableFromBadge',
                  params: { filterCriteria: 'CP', filterValue: '1' },
                }"
                action
              >
                <b-avatar
                  variant="info"
                  src="https://i.ibb.co/hsL9Hyx/images-1.png"
                  class="mr-3"
                ></b-avatar>
                <span class="mr-auto">CP</span>
                <b-badge variant="primary" pill>{{
                  selectedAggregate.CP
                }}</b-badge></b-list-group-item
              >
              <b-list-group-item
                class="d-flex align-items-center"
                :to="{
                  name: 'TableFromBadge',
                  params: { filterCriteria: 'Electrical', filterValue: '1' },
                }"
                action
              >
                <b-avatar
                  variant="info"
                  src="https://i.ibb.co/16b44F0/tipton-municipal-utilities-about-electric-utility-png-800-799.png"
                  class="mr-3"
                ></b-avatar>
                <span class="mr-auto">Electrical</span>
                <b-badge variant="primary" pill>{{
                  selectedAggregate.Electrical
                }}</b-badge></b-list-group-item
              >
              <b-list-group-item
                class="d-flex align-items-center"
                :to="{
                  name: 'TableFromBadge',
                  params: {
                    filterCriteria: 'Instrumentation',
                    filterValue: '1',
                  },
                }"
                action
              >
                <b-avatar
                  variant="info"
                  src="https://i.ibb.co/k1TPVZn/electrical-computer-eng-4x.png"
                  class="mr-3"
                ></b-avatar>
                <span class="mr-auto">Instrumentation</span>
                <b-badge variant="primary" pill>{{
                  selectedAggregate.Instrumentation
                }}</b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-collapse>

        <hr />

        <strong> Officer Wise Aggregation </strong>
        <b-card>
          <b-list-group>
            <b-list-group-item
              action
              v-for="(item, index) in aggregates.officerWiseOpen"
              class="d-flex justify-content-between align-items-center text-responsive-blue"
            >
              {{ item.Receiver }}
              <b-badge variant="danger" pill>{{ item.Open }}</b-badge>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
      <!--    Open  Notification -->
    </b-jumbotron>
  </div>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";

export default {
  name: "Stats",
  data() {
    return {
      bw: new BackEndWrapper(),
      aggregates: {},
      selectedAggregate: {},
    };
  },
  mounted() {
    this.getAggregates();
  },

  methods: {
    getAggregates() {
      this.bw.getAggregates().then(
        function(res) {
          this.aggregates = res;
          console.log("agrregates ", res);
          //this.fetchRequests = res ;
        }.bind(this),
        function(err) {
          //this.showError();
        }.bind(this)
      );
    },
    onJurisdictionClick(location) {
      console.log("Aggregate", location);
      this.aggregates.locationWiseOpen.forEach((aggregate) => {
        if (aggregate.Office_Location == location) {
          this.selectedAggregate = aggregate;
          console.log("Selected Aggreagate", this.selectedAggregate);
        }
      });
    },
  },
};
</script>
