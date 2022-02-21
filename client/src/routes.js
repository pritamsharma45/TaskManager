import Vue from "vue";
import Router from "vue-router";
import CreateEntity from "./pages/CreateEntity.vue";
import CreateClientInfo from "./pages/CreateClientInfo.vue";
import CreateClientNotes from "./pages/CreateClientNotes.vue";
import CreateTask from "./pages/CreateTask.vue";
import CreateTimesheet from "./pages/CreateTimesheet.vue";
import AllTasks from "./pages/ListAllTasks.vue";
import AllUsers from "./pages/ListAllUsers.vue";
import AllTimesheets from "./pages/ListAllTimesheets.vue";
import AllClients from "./pages/ListAllClients.vue";
import Admin from "./pages/Admin.vue";
import Expired from "./pages/Expired.vue"


// import EditTimesheet from "./pages/EditTimesheet.vue";
// import EditTask from "./pages/EditTask.vue";

import Dropdowns from "./pages/Dropdowns.vue";
import GenericList from "./components/GenericList.vue";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/dropdowns",
      name: "Dropdowns",
      component: Dropdowns,
      children: [
        {
          path: "/dropdowns/:routerPath",
          name: "GenericList",
          component: () => import("./components/GenericList.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/manage/:routerPath",
      name: "managedropdown",
      component: CreateEntity,
      props: true,
    },
    {
      path: "/CreateEntity/:routerPath",
      name: "CreateEntity",
      component: CreateEntity,
      props: true,
    },

    {
      path: "/CreateClientInfo",
      name: "CreateClientInfo",
      component: CreateClientInfo,
    },
    {
      path: "/CreateClientNotes",
      name: "CreateClientNotes",
      component: CreateClientNotes,
    },
    { path: "/CreateTask", name: "CreateTask", component: CreateTask },
    {
      path: "/CreateTimesheet",
      name: "CreateTimesheet",
      component: CreateTimesheet,
    },
    {
      path: "/AllTasks",
      name: "AllTasks",
      component: AllTasks,
    },
    {
      path: "/",
      redirect: "/AllTasks",
    },
    {
      path: "/",
      name: "AllTasks",
      component: AllTasks,
    },
    {
      path: "/AllUsers",
      name: "AllUsers",
      component: AllUsers,
    },
    {
      path: "/AllClients",
      name: "AllClients",
      component: AllClients,
    },
    {
      path: "/AllTimesheets",
      name: "AllTimesheets",
      component: AllTimesheets,
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
    },
    {
      path: "/expired",
      name: "Expired",
      component: Expired,
    },
    // {
    //   path: "/ManageUsers",
    //   name: "ManageUsers",
    //   component: () => import("./components/GenericList.vue"),
    //   props: true,
    // },
    // {
    //   path: "/EditTask/:task",
    //   name: "EditTask",
    //   component: EditTask,
    //   props: true,
    // },
    // {
    //   path: "/EditTimesheet/:timesheet",
    //   name: "EditTimesheet",
    //   component: EditTimesheet,
    //   props: true,
    // },

    // {
    //   path: "/settings",
    //   name: "Dropdowns",
    //   component: Dropdowns,
    //   children: [
    //     {
    //       path: "/settings/profile",
    //       name: "Profile",
    //       component: UserProfile,
    //       // props: true,
    //     },
    //     {
    //       path: "/settings/emails",
    //       name: "Emails",
    //       component: UserEmails,
    //       // props: true,
    //     },
    //   ],
    // },
    // Drop down Manager ////

    // { path: "/EditTask", name: "EditTask", component: EditTask },
  ],
  linkExactActiveClass: "active",
});
