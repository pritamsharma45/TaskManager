<template>
  <div>
    <div>
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#">
          <img
            :src="store.state.logoURL"
            alt="FD4CAST"
            style="width: 250px; max-width: 100%; height: auto"
          />
        </b-navbar-brand>
        <!-- <b-navbar-brand active="true" to="/">Evexus</b-navbar-brand> -->

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              v-for="menu in menusWithoutDropdowns"
              :to="menu.routerLink"
              :key="menu.id"
              :active="menu.active"
              class="font-weight-bold"
              >{{ menu.name }}</b-nav-item
            >

            <b-nav-item-dropdown
              v-for="menu in menusWithDropdowns"
              :key="menu.id"
              :text="menu.name"
              class="font-weight-bold"
              right
            >
              <b-dropdown-item
                v-for="subMenu in menu.subMenus"
                :key="subMenu.id"
                :to="subMenu.routerLink"
                exact-path-active-class
              >
                <b-icon
                  :icon="subMenu.icon"
                  variant="success"
                  class="mx-2"
                ></b-icon
                >{{ subMenu.name }}</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- <div class="container">
      
    </div> -->
    <b-container fluid>
      <div v-if="showSpinner">
        <b-button variant="warning" disabled>
          <b-spinner small type="grow" variant="primary"></b-spinner>
          Loading application ...
        </b-button>
      </div>
      <router-view :key="$route.fullPath"></router-view>
    </b-container>

    <!-- <footer id="footer" class="footer-1">
      <div class="main-footer widgets-dark typo-light">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-3">
              <div class="widget subscribe no-box">
                <h5 class="widget-title">HEMPEL<span></span></h5>
                <p>About the company, little discription will goes here..</p>
              </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-3">
              <div class="widget no-box">
                <h5 class="widget-title">Quick Links<span></span></h5>
              </div>

              <div class="footer-copyright">
                <div class="container">
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <p>Copyright HEMPEL© 2021. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer> -->
  </div>
</template>
<script>
import router from "./routes";
import menuSchema from "./forms/menuSchema";
import store from "./store/configuration";
import taskstore from "./store/task";
export default {
  name: "AppMain",
  router,
  data() {
    return {
      name: "",
      showSpinner: true,
      store: store,
      menus: menuSchema.menus,
      logoLink:
        "https://drive.google.com/uc?export=view&id=1vOf1sRdudHvgTUEtm3hdth3KORG-eVm5",
    };
  },
  created() {
    taskstore.getTasks();
    // https://drive.google.com/file/d/1vMscspRL90aLX-OGHg6gRFnAroPzijdi/view?usp=sharing
    // https://drive.google.com/file/d/1vOf1sRdudHvgTUEtm3hdth3KORG-eVm5/view?usp=sharing   White
    // configStore.getIndexedTables();
  },
  mounted() {
    store.getTables().then((val) => {
      console.log("All Tables fetched");
      this.showSpinner = false;
      this.$router.push("/");
    });
    store.getPreference();
  },
  computed: {
    menusWithDropdowns: function () {
      return this.menus.filter((menu) => {
        return menu.subMenus !== undefined;
      });
    },
    menusWithoutDropdowns: function () {
      return this.menus.filter((menu) => {
        return menu.subMenus === undefined;
      });
    },
  },
  methods: {},
};
</script>

<style></style>
