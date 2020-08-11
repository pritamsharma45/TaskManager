import "bootstrap";
import "bootstrap-vue";
import "./scss/app.scss";

import Vue from "vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import AppMain from "./AppMain.vue";

Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  el: "#req_app",

  components: { AppMain }
});
