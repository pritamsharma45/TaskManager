<template>
  <b-card no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header pills>
        <b-nav-item
          v-for="nav in navs"
          :key="nav.id"
          :to="{
            name: 'GenericList',
            path: path,
            params: { listObject: nav, routerPath: nav.name },
          }"
          variant="success"
          exact
          exact-active-class="active"
          replace
          >{{ nav.title }}</b-nav-item
        >

        <!-- <b-nav-item
          :to="{
            name: 'GenericList',
            params: { listObject: listObject1, routerPath: 'profile' },
          }"
          exact
          exact-active-class="active"
          replace
          >Periodcities</b-nav-item
        >
        <b-nav-item
          :to="{
            name: 'GenericList',
            params: { listObject: listObject2, routerPath: 'emails' },
          }"
          exact
          exact-active-class="active"
          replace
          >Task Types</b-nav-item
        > -->
      </b-nav>
    </b-card-header>

    <b-card-body>
      <router-view :key="$route.fullPath"></router-view>
    </b-card-body>
  </b-card>
</template>

<script>
import companyType from "../forms/companyType";
import activityType from "../forms/activityType";
// import clientType from "../forms/client";
import periodicity from "../forms/periodicity";
import taskType from "../forms/taskType";
import user from "../forms/user";
import store from "../store/configuration";

export default {
  name: "ManageDropDownNav",
  data() {
    return {
      // bw: new GASBackEnd(),
      showSpinner: true,
      loaded: false,
      navs: [
        {
          name: "tbl_task_type",
          path: "/manage/",
          title: "Task Types",
          items: [],
          header: [{ key: "index", label: "" }, "task_type", "actions"],
          schema: taskType,
        },
        {
          name: "tbl_activity_type",
          title: "Activity Types",
          path: "/manage/activityType",
          items: [],
          header: [{ key: "index", label: "" }, "activity_type", "actions"],
          schema: activityType,
        },
        {
          name: "tbl_company_type",
          title: "Company Types",
          path: "/manage/companyType",
          items: [],
          header: [{ key: "index", label: "" }, "company_type", "actions"],
          schema: companyType,
        },

        {
          name: "tbl_user",
          title: "Users",
          items: [],
          header: [{ key: "index", label: "" }, "user", "actions"],
          schema: user,
        },
        // {
        //   name: "tbl_client_type",
        //   title: "Client Types",
        //   items: [],
        //   header: ["id", "client_type", "actions"],
        //  schema:clientType,
        // },
        // {
        //   name: "tbl_periodicity",
        //   title: "Periodicities",
        //   items: [],
        //   header: ["id", "periodicity", "actions"],
        //   schema:periodicity,
        // },
      ],
    };
  },

  mounted() {
    // store.getTables();
  },
  methods: {
    fetchTables() {
      
      const tableNames = this.navs.map((o) => {
        return o.name;
      });
      this.navs.forEach((o) => (o.items = res[o.name]));

      // google.script.run
      //   .withSuccessHandler((res) => {
      //     console.log(res);
      //     this.navs.forEach((o) => (o.items = res[o.name]));
      //     console.log(this.navs);
      //     this.showSpinner = false ;
      //     this.loaded = true ;
      //   })
      //   .withFailureHandler((error) => {
      //     console.log(error);
      //   })
      //   .GetTables(tableNames);
    },
  },
};
</script>
