import Vue from "vue";

const state = Vue.observable({
  tasks: [],
  loading: true,
});

export default {
  get state() {
    return state;
  },
  getTasks() {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(function(res) {
          state.tasks = res.reverse();
          state.loading = false;
          //   console.log("State [Clients] :", res);
          resolve(res);
        })
        .withFailureHandler(function() {
          reject();
        })
        .GetTable(["tbl_task"]);
    });
  },
};
