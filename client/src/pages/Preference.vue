<template>
  <div>
    <h6>Edit your preferences</h6>
    <b-overlay :show="showSpinner" rounded="sm">
      <div>
        <form id="createEntityForm" action="" @submit.prevent="savePreference">
          <div class="form-row">
            <vue-form-generator
              tag="div"
              ref="form"
              :schema="schema"
              :model="model"
              @model-updated="modelUpdated"
            />
          </div>

          <div class="d-flex justify-content-end mt-0 pr-1">
            <button
              type="submit"
              class="btn btn-primary btn-sm btn-align-left"
              @click="savePreference"
              :disabled="disabled"
            >
              {{ isSaving ? "Saving..." : "Save Preferences" }}
            </button>
          </div>
        </form>
      </div>
    </b-overlay>
    <!-- <pre>
        {{ model }}
    </pre> -->
  </div>
</template>

<script>
import schema from "../forms/preference.js";
import ConfirmDialogue from "../components/ConfirmDialogue.vue";
import moment from "moment";
import configStore from "../store/configuration";
export default {
  data() {
    return {
      schema: schema,
      configStore: configStore,
      disabled: false,
      isSaving: false,
      model: {},
      showSpinner: false,
    };
  },
  mounted() {
    this.model = this.schema.model();
    this.getPreference();
  },
  methods: {
    savePreference() {
      this.isSaving = true;
      this.disabled = true;
      let prefs = JSON.stringify(this.model);
      google.script.run
        .withSuccessHandler((res) => {
          console.log(res);
          this.configStore.state.prefs = this.model;
          this.isSaving = false;
          this.disabled = false;
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        .setPreference(prefs);
    },
    getPreference() {
      google.script.run
        .withSuccessHandler((res) => {
          if (!res) {
            console.log("Get Prefs", res);
          } else {
            console.log("Get Prefs", res);
            this.model = JSON.parse(res);
            this.configStore.state.prefs = this.model;
          }
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        .getPreference();
    },
    formSubmitted() {},
    modelUpdated() {},
  },
};
</script>

<style>
</style>