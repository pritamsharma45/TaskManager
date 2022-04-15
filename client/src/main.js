import Vue from "vue";
import "bootstrap";
import "bootstrap-vue";
import "./scss/app.scss";
import VueFormGenerator from "vue-form-generator/dist/vfg";
import JsonExcel from "vue-json-excel";
import VueFab from "vue-float-action-button";
import "vue-form-generator/dist/vfg.css";
import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: "", // override the window title
};

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import AppMain from "./AppMain.vue";
var moment = require("moment");

// import searchSelect from "./components/searchSelect";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueFab);
Vue.use(VueHtmlToPaper, options);

Vue.component("downloadExcel", JsonExcel);
Vue.use(VueFormGenerator);
Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString().replace(/_/g, " ");

  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("formatAsDate", function(value) {
  if (!value) return "";
  return moment(value).format("DD/MM/YYYY");
});
Vue.filter("formatAs", function(value, type, options) {
  options = options || {};
  const locale = options.locale || "en-gb";
  const currency = options.currency || "GBP";
  if (!value) return "";
  switch (type) {
    case "currency":
      const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
      });
      value = formatter.format(value);
      break;
    case "percent":
      value = value + " %";
      break;
    case "date":
      value = moment(value).format("DD/MM/YYYY");
      break;
    case "time":
      value = moment(value).format("h:mm");
      break;
    case "capitalize":
      value = value = value.toString().replace(/_/g, " ");
      value = value.charAt(0).toUpperCase() + value.slice(1);
      break;
    default:
      break;
  }
  return value;
});
Vue.filter("formatAspercent", function(value) {
  if (!value) return "";
  return value + " %";
});
Vue.filter("pad", function(value, length, prefix) {
  if (!value) return "";
  var str = "" + value;
  while (str.length < length) {
    str = "0" + str;
  }
  return prefix + str;
});
Vue.filter("formatAsTime", function(value) {
  if (!value) return "";
  return moment(value).format("h:mm");
});

new Vue({
  el: "#req_app",
  components: { AppMain },
});
