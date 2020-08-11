<template>
  <div>
    <b-jumbotron
      jumbotron-fluid
      lead="VADINAR BINA PIPELINE (VBPL)"
      class="gradient-lavender"
      id="homeJumbo"
    >
      <hr class="scarlet" />
      <!-- <p id="NotifCount">Notif Count :{{ NotifCount }}</p> -->
      <b-container class="mx-auto">
        <b-row>
          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                icon="plus-circle-fill"
                href="#foobar"
                variant="success"
                to="/new"
              ></b-avatar></div
          ></b-col>

          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                icon="funnel-fill"
                href="#foobar"
                to="/filtered"
                variant="info"
              ></b-avatar></div
          ></b-col>

          <div class="w-100"></div>
          <b-col class="p-1">Create New Notification</b-col>
          <b-col class="p-1">Filter Notification</b-col>
          <div class="w-100"></div>
          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                href="#foobar"
                to="Stats"
                variant="info"
                src="https://i.ibb.co/zGrbHNb/images-3.png"
              ></b-avatar></div
          ></b-col>
          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                href="#foobar"
                to="historyCard"
                variant="info"
                src="https://i.ibb.co/sjG9CSc/unnamed.png"
              ></b-avatar></div
          ></b-col>
          <div class="w-100"></div>
          <b-col class="p-1">Dashboard</b-col>
          <b-col class="p-1">History Card</b-col>
          <div class="w-100"></div>

          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                icon="unlock-fill"
                href="#foobar"
                to="/open"
                variant="danger"
              ></b-avatar></div
          ></b-col>
          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                src="https://i.ibb.co/FVmwG8J/new-icons.png"
                href="#foobar"
                to="/open"
              ></b-avatar></div
          ></b-col>
          <div class="w-100"></div>
          <b-col class="p-1">Open Notifications</b-col>
          <b-col class="p-1">New Notifications</b-col>

          <div class="w-100"></div>

          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                icon="download"
                to="/Downloads"
                variant="success"
              ></b-avatar></div
          ></b-col>
          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                src="https://i.ibb.co/3hWPh0S/Broken-Gear.jpg"
                href="#foobar"
                to="/FailureFrequency"
              ></b-avatar></div
          ></b-col>
          <div class="w-100"></div>
          <b-col class="p-1">Download Reports</b-col>
          <b-col class="p-1">Failure Frequency</b-col>
        </b-row>
      </b-container>
      <!--    List items -->
      <!-- <b-list-group style="max-width: 300px;">
        <b-list-group-item
          class="d-flex align-items-center"
          :to="{
            name: 'TableFromBadge',
            params: { filterCriteria: 'Mechanical & CP', filterValue: '1' },
          }"
          action
        >
          <b-avatar
            variant="info"
            src="https://i.ibb.co/hsL9Hyx/images-1.png"
            class="mr-3"
          ></b-avatar>
          <span class="mr-auto">Mechanical/CP</span>
        </b-list-group-item>
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
        </b-list-group-item>
        <b-list-group-item
          class="d-flex align-items-center"
          :to="{
            name: 'TableFromBadge',
            params: { filterCriteria: 'Instrumentation', filterValue: '1' },
          }"
          action
        >
          <b-avatar
            variant="info"
            src="https://i.ibb.co/k1TPVZn/electrical-computer-eng-4x.png"
            class="mr-3"
          ></b-avatar>
          <span class="mr-auto">Instrumentation</span>
        </b-list-group-item>
      </b-list-group> -->
    </b-jumbotron>

    <!--  PM Tracker Begins -->
    <b-jumbotron lead="PM Tracker" class="gradient-lightpink">
      <b-container class="bv-example-row">
        <b-row>
          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                href="#foobar"
                variant="info"
                src="https://i.ibb.co/jkphXv9/engi-icon2.png"
                to="/PMS"
              ></b-avatar></div
          ></b-col>

          <b-col class="p-1"
            ><div>
              <b-avatar
                size="72px"
                icon="funnel-fill"
                href="#foobar"
                to="/filteredActivities"
                variant="info"
              ></b-avatar></div
          ></b-col>
          <div class="w-100"></div>
          <b-col class="p-1">Create New Activity</b-col>
          <b-col class="p-1">Filter Activities</b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
import BackEndWrapper from "../services/BackEndWrapper";
export default {
  name: "Home",
  data() {
    return { bw: new BackEndWrapper(), aggregates: {} };
  },
  created() {
    this.getAggregates();
  },
  mounted() {
    // this.getAggregates();
    this.getNewNotifs();
  },
  methods: {
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
    // getNewNotifs() {
    //   google.script.run
    //     .withSuccessHandler(function(obj) {
    //       document.getElementById("NotifCount").textContent =
    //         "Notifs : " + obj.Electrical;
    //     })
    //     .getNewNotifsCount();
    // }
  },
};
</script>
