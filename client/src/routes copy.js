import Vue from "vue";
import Router from "vue-router";
import CreateEntity from "./pages/CreateEntity.vue";
import AllTasks from "./pages/ListAllTasks.vue";
import SmartForm from "./components/SmartForm.vue";
import InvoiceModal from "./components/InvoiceModal.vue";
import AllTimesheets from "./pages/ListAllTimesheets.vue";
import AllReports from "./pages/AllReports.vue";
import AllClients from "./pages/ListAllClients.vue";
import Admin from "./pages/Admin.vue";
import Expired from "./pages/Expired.vue";
import Dropdowns from "./pages/Dropdowns.vue";
import Preference from "./pages/Preference.vue";

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
      path: "/CustomInvoice",
      name: "CustomInvoice",
      component: InvoiceModal,
      props: true,
    },
    {
      path: "/Preference",
      name: "Preference",
      component: Preference,
    },
    {
      path: "/AllTasks",
      name: "AllTasks",
      component: AllTasks,
    },
    {
      path: "/AllReports",
      name: "AllReports",
      component: AllReports,
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
    {
      path: "/SmartForm",
      name: "SmartForm",
      component: SmartForm,
    },
    // {
    //   path: "/ManageUsers",
    //   name: "ManageUsers",
    //   component: () => import("./components/GenericList.vue"),
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
