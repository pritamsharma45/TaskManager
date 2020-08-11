<template>
  <div class="wrapper" id="req_app">
    <div>
      <b-navbar toggleable="lg" class="navbar navbar-expand-sm navbar-custom">
        <b-navbar-brand to="/">
          <b-img
            src="http://heartstchr.github.io/img/bpl.jpeg"
            fluid
            alt="Fluid image"
          ></b-img
        ></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/" exact exact-active-class="active">
              <b-icon
                icon="house-fill"
                variant="primary"
                font-scale="2"
              ></b-icon>
              Home
            </b-nav-item>
            <b-nav-item to="/NewRequest" exact exact-active-class="active">
              <b-iconstack font-scale="2">
                <b-icon stacked icon="file-plus" variant="primary"></b-icon>
                <b-icon
                  stacked
                  icon="envelope"
                  variant="info"
                  scale="0.45"
                ></b-icon>
              </b-iconstack>
              New Notification</b-nav-item
            >
            <b-nav-item to="/open" exact exact-active-class="active"
              ><b-icon
                icon="unlock-fill"
                variant="primary"
                font-scale="2"
              ></b-icon>
              Open Notifications</b-nav-item
            >
            <b-nav-item to="/Stats" exact exact-active-class="active"
              ><b-icon
                icon="bar-chart-fill"
                variant="primary"
                font-scale="2"
              ></b-icon
              >Statistics</b-nav-item
            >

            <b-nav-item to="/filtered" exact exact-active-class="active"
              ><b-icon
                icon="funnel-fill"
                variant="primary"
                font-scale="2"
              ></b-icon>
              Filtered Notifications</b-nav-item
            >
            <b-nav-item to="/historyCard" exact exact-active-class="active">
              <b-iconstack font-scale="2">
                <b-icon
                  stacked
                  icon="arrow-counterclockwise"
                  variant="primary"
                ></b-icon>
                <b-icon
                  stacked
                  icon="clock-fill"
                  variant="primary"
                  scale="0.35"
                ></b-icon>
              </b-iconstack>
              History Card</b-nav-item
            >
            <b-nav-item to="/PMS" exact exact-active-class="active">
              <b-iconstack font-scale="2">
                <b-icon stacked icon="file-plus" variant="primary"></b-icon>
                <b-icon
                  stacked
                  icon="tools"
                  variant="primary"
                  scale="0.45"
                ></b-icon>
              </b-iconstack>
              New Activity</b-nav-item
            >
            <b-nav-item
              to="/filteredActivities"
              exact
              exact-active-class="active"
            >
              All Activities</b-nav-item
            >

            <b-nav-item to="/Downloads" exact exact-active-class="active"
              >Admin</b-nav-item
            >
            <b-nav-item to="/DDManager" exact exact-active-class="active">
              Edit Dropdown</b-nav-item
            >
          </b-navbar-nav>

          <!-- Right aligned nav items -->
        </b-collapse>
      </b-navbar>

      <router-view></router-view>
    </div>

    <!-- Page Content  -->
    <!-- <div id="content">
			<router-view></router-view>
		</div> -->
  </div>
</template>
<script>
import router from "./routes";

export default {
  name: "AppMain",
  router,
};
</script>
