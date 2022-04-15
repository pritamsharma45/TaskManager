<template>
  <div>
    <div>
      <b-navbar toggleable="lg">
        <b-navbar-brand active="true" to="/">Company Name</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <div v-b-hover="handleHover" class="py-1 px-2">
              <b-overlay :show="showSpinner" rounded="sm">
                <b-nav-form v-if="appUnderTrial">
                  <b-form-input
                    size="sm"
                    class="mr-sm-2"
                    v-model="licenseKey"
                    placeholder="Enter license key"
                    v-if="isHovered"
                  ></b-form-input>
                  <b-button size="sm" v-if="!isHovered"
                    >Trial Version (Enter License Key)</b-button
                  >
                  <b-button
                    size="sm"
                    class="my-2 my-sm-0"
                    v-if="isHovered"
                    @click="licenseKeySubmitted"
                    >Submit</b-button
                  >
                </b-nav-form>
              </b-overlay>
            </div>

            <b-nav-item
              v-for="menu in menusWithoutDropdowns"
              :to="menu.routerLink"
              :key="menu.id"
              :active="menu.active"
              class="text-white"
              :disabled="linkDisabled"
              >{{ menu.name }}</b-nav-item
            >

            <b-nav-item-dropdown
              v-for="menu in menusWithDropdowns"
              :key="menu.id"
              :text="menu.name"
              class="text-white"
              :disabled="linkDisabled"
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
    <div class="container">
      <router-view :key="$route.fullPath"></router-view>
    </div>

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
export default {
  name: "AppMain",
  router,
  data() {
    return {
      name: "",
      licenseKey: "",
      showSpinner: false,
      isHovered: false,
      trialExpired: false,
      appPurchased: false,
      appRenewed: true,
      appInService: true,
      appUnderTrial: false,
      linkDisabled: false,
      isLicensed:true,
      daysRemaining:"",
      appUser: "",
      menus: menuSchema.menus,
    };
  },
  mounted() {
    this.$router.push("/");

    this.checkIfLicensed();
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
  methods: {
    licenseKeySubmitted() {
      if (this.licenseKey === "") {
      } else {
        console.log("License key submitted", this.licenseKey);
        this.matchLicenseKey();
      }
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    },
    matchLicenseKey() {
      this.showSpinner = true;
      console.log("Matching License matchLicenseKey");
      google.script.run
        .withSuccessHandler((res) => {
          console.log("License Key matched : ",res);
          this.appPurchased = res;
          this.linkDisabled = !res;
          this.appInService = res;
          this.showSpinner = !res;
          this.licenseKey = "";
          this.appUnderTrial = false;
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        .matchLicenseKey(this.licenseKey);
    },
    checkIfTrialExpired() {
      google.script.run
        .withSuccessHandler((res) => {
          console.log("Days remaining :", res);
          this.daysRemaining = res;
          if(res>14){
            this.linkDisabled = true;
          this.appUnderTrial = false;
           this.$router.push("/expired");
          }else{
            this.linkDisabled = false;
          this.appUnderTrial = true;
          }
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        ._checkIfTrialExpired();
    },
    checkIfLicensed() {
      console.log("Checking if Licensed");
      google.script.run
        .withSuccessHandler((res) => {
          this.isLicensed = res;
          console.log("Web App is Licensed :",res);
          if(!res){
            this.appUnderTrial = true ;
            console.log("Checking if Trial Expired");
            this.checkIfTrialExpired();
          }
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        ._checkIfLicensed();
    },
  },
};
</script>

<style></style>
