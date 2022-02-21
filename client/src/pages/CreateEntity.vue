<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h5 class="mt-2">{{ schema.formTitle }}</h5>
      </div>
      <!-- Dropdown populating spinner  -->
      <!-- <div v-if="!dropdownReady">
        <b-button variant="warning" disabled>
          <b-spinner small type="grow" variant="danger"></b-spinner>
          Populating dropdown ...
        </b-button>
      </div> -->
    </div>
    <b-overlay :show="showSpinner" rounded="sm">
      <div :class="cardView ? 'card pl-1 pt-1 pb-1 pr-4 mx-2 my-2' : ''">
        <!--  @submit.prevent="onSubmit -->
        <form id="createEntityForm" action="" @submit.prevent="createEntity">
          <div class="form-row">
            <vue-form-generator
              tag="div"
              ref="form"
              :schema="schema"
              :options="formOptions"
              :model="model"
              @model-updated="modelUpdated"
              @validated="onValidated"
            />
          </div>
          <div class="d-flex justify-content-end mt-1 pr-1">
            <button
              type="submit"
              class="btn btn-primary btn-sm btn-align-left"
              @click="formSubmitted"
              :disabled="!isDisabled"
            >
              {{ isSaving ? "Saving..." : "Submit" }}
            </button>
          </div>
        </form>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import GASBackEnd from "../services/GASBackEnd";
import configStore from "../store/configuration";

export default {
  props: {
    routerPath: { type: String, required: false },
    schema: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: false,
    },
    formData: {
      type: Object,
      required: false,
    },
    editId: {
      type: String,
      required: false,
    },
    cardView: { type: Boolean, required: false, default: true },
    redirectRoute: { type: String, required: false },
  },
  name: "CreateEntity",
  data() {
    return {
      bw: new GASBackEnd(),
      model: {},
      dropdownReady: false,
      defaultData: this.schema.defaultModelData,
      showSpinner: false,
      formOptions: {
        validateAfterChanged: true,
        validationErrorClass: "",
        validationSuccessClass: "",
        validateAfterLoad: true,
        // validateAsync: true,
      },
      isSaving: false,
      isDisabled: true,
    };
  },
  mounted() {
    this.model = this.schema.model();

    if (this.formData) {
      console.log("Form data:", this.formData);
      this.model = this.formData;
      this.schema.formTitle = this.schema.formTitle.replace(
        "Create New",
        "Edit"
      );
    } else {
      this.schema.formTitle = this.schema.formTitle.replace(
        "Edit",
        "Create New"
      );
    }
    console.log("Dropdown ready ", configStore.state.tables); //this.showError();
    this.schema._populateSelectOptions(configStore.state.tables);

    // this.bw.getRelatedTablesByModel(this.schema.model()).then(
    //   function (res) {
    //     this.schema._populateSelectOptions(res);
    //     this.dropdownReady = true;
    //     console.log("Dropdown ready", res);
    //   }.bind(this),
    //   function (err) {
    //     console.log("Dropdown ready ", res); //this.showError();
    //   }.bind(this)
    // );
  },
  methods: {
    createEntity() {
      console.log(this.model);
      const createItem = { ...this.model, ...this.defaultData };
      console.log("Create Item after merging with default data", createItem);
      this.isSaving = true;
      this.showSpinner = true;
      this.bw.createEntity(createItem, this.schema.table_name).then(
        function (res) {
          console.log("Updated", res);
          configStore.updateOrAddItem(createItem, this.schema.table_name);
          if (this.redirectRoute) {
            console.log("Redirect Route", this.redirectRoute);
            this.$router.push(this.redirectRoute);
          } else {
            this.resetForm();
          }
        }.bind(this),
        function (err) {
          console.log("Item Creation Failed", res); //this.showError();
        }.bind(this)
      );
    },
    onValidated(res, errors) {
      this.isDisabled = res;
      console.log("Model Validated", res);
    },
    formSubmitted() {
      let item = Object.assign({}, this.model);
      this.$emit("formSubmitted", item);
    },
    resetForm() {
      this.isSaving = false;
      this.isDisabled = true;
      this.showSpinner = false;
      this.model = {};
      document.getElementById("createEntityForm").reset();
    },
  },
};
</script>

<style></style>
