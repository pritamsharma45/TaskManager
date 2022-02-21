import Vue from "vue";
import "bootstrap";
import "bootstrap-vue";
import "./scss/app.scss";
import VueFormGenerator from "vue-form-generator/dist/vfg";
import JsonExcel from "vue-json-excel";
// import VueFormulate from "@braid/vue-formulate";
import "vue-form-generator/dist/vfg.css";

// import SmartTable from "vuejs-smart-table";
// import {Multiselect} from "vue-multiselect";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import AppMain from "./AppMain.vue";
var moment = require("moment");

// import CappedInput from "./components/CappedInput";

// Vue.use(SmartTable);
Vue.use(VueFormGenerator);
// Vue.use(VueFormulate);

// Vue.component('multiselect', Multiselect);

// Vue.component("CappedInput", CappedInput);
// Vue.use(CappedInput);
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(BootstrapVueIcons);
// Vue.component('vueMultiSelect', Multiselect);
// Vue.use(vueMultiSelect);
Vue.component("downloadExcel", JsonExcel);

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString().replace(/_/g, " ");

  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("formatAsDate", function(value) {
  if (!value) return "";
  return moment(value).format("DD/MM/YYYY");
});

Vue.filter("formatAsTime", function(value) {
  if (!value) return "";
  return moment(value).format("h:mm");
});

new Vue({
  el: "#req_app",
  components: { AppMain },
});
