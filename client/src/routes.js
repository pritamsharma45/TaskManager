import Vue from "vue";
import Router from "vue-router";
import NewRequest from "./pages/NewRequest.vue";
import RequestDetails from "./pages/RequestDetails.vue";
import NotifsDetails from "./pages/NotifsDetails.vue";
import LogDetails from "./pages/LogDetails.vue";
import ActivityDetails from "./pages/ActivityDetails.vue";
import ActivityLogs from "./pages/ActivityLogs.vue";
import DDManager from "./pages/DDManager.vue";
import Downloads from "./pages/Downloads.vue";
import Stats from "./pages/Stats.vue";
import OpenNotifications from "./pages/OpenNotifications.vue";
import FilteredNotifications from "./pages/FilteredNotifications.vue";
import TableFromBadge from "./pages/TableFromBadge.vue";
import ActivityLogForm from "./pages/ActivityLogForm.vue";
import HistoryCard from "./pages/HistoryCard.vue";
import FailureFrequency from "./pages/FailureFrequency.vue";

import FilteredActivities from "./pages/FilteredActivities.vue";
import PMS from "./pages/ActivityCodification.vue";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { name: "NewRequest", path: "/NewRequest", component: NewRequest },
    { path: "/new", component: NewRequest },
    {
      name: "detail",
      path: "/detail/:id",
      component: RequestDetails,
      props: true,
    },
    {
      name: "PMS",
      path: "/PMS",
      component: PMS,
    },
    {
      name: "Home",
      path: "/",
      component: Home,
    },
    {
      name: "NotifsDetails",
      path: "/NotifsDetails/:req",
      component: NotifsDetails,
      props: true,
    },
    {
      name: "LogDetails",
      path: "/LogDetails/:req",
      component: LogDetails,
      props: true,
    },
    {
      name: "ActivityDetails",
      path: "/ActivityDetails/:req",
      component: ActivityDetails,
      props: true,
    },
    {
      name: "ActivityLogs",
      path: "/ActivityLogs/:id",
      component: ActivityLogs,
      props: true,
    },
    {
      name: "TableFromBadge",
      path: "/TableFromBadge/:filterCriteria",
      component: TableFromBadge,
      props: true,
    },
    {
      name: "ActivityLogForm",
      path: "/ActivityLogForm/:id",
      component: ActivityLogForm,
      props: true,
    },
    { name: "open", path: "/open", component: OpenNotifications },
    { name: "filtered", path: "/filtered", component: FilteredNotifications },
    { name: "historyCard", path: "/historyCard", component: HistoryCard },
    {
      name: "FailureFrequency",
      path: "/FailureFrequency",
      component: FailureFrequency,
    },
    {
      name: "filteredActivities",
      path: "/filteredActivities",
      component: FilteredActivities,
    },

    { name: "DDManager", path: "/DDManager", component: DDManager },
    { name: "Downloads", path: "/Downloads", component: Downloads },
    { name: "Stats", path: "/Stats", component: Stats },
  ],
  linkExactActiveClass: "active",
});
