<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h6 class="mt-2">{{ schema.formTitle }}</h6>
      </div>
    </div>
    <b-overlay :show="showSpinner" rounded="sm">
      <div :class="cardView ? 'card pl-1 pt-1 pb-1 pr-4 mx-2 my-1' : ''">
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
            />
          </div>
          <!-- <vue-form-generator
              tag="div"
              ref="form"
              :schema="schema"
              :options="formOptions"
              :model="model"
              @model-updated="modelUpdated"
              @validated="onValidated"
            />
          </div> -->
          <div class="d-flex justify-content-end mt-0 pr-1">
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
    initialData: {
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
      files: [],
      isSaving: false,
      isDisabled: true,
    };
  },
  mounted() {
    this.model = this.schema.model();
    if (this.initialData) {
      this.model = { ...this.model, ...this.initialData };
    }

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
    console.log("Dropdown ready ", configStore.state.indexedDropdowns); //this.showError();
    this.schema._populateSelectOptions(
      configStore.state.tables,
      configStore.state.indexedDropdowns
    );

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
    console.log("Form Loaded");
  },
  methods: {
    createEntity() {
      // console.log(this.model);
      const createItem = { ...this.model, ...this.defaultData };
      console.log("Create Item after merging with default data", createItem);
      this.isSaving = true;
      this.showSpinner = true;
      this.bw.createEntity(createItem, this.schema.table_name).then(
        function (res) {
          console.log("Added or Updated Item", res);
          configStore.updateOrAddItem(createItem, this.schema.table_name);
          this.getFiles(res);
          if (this.schema.goBackTo) {
            // console.log("Redirect Route", this.redirectRoute);
            this.$router.push(this.schema.goBackTo);
          } else {
            this.resetForm();
          }
        }.bind(this),
        function (err) {
          console.log("Item Creation Failed", res); //this.showError();
        }.bind(this)
      );
    },
    uploadFiles() {},
    getFiles(newItem) {
      const fileFields = this.schema.getFileFields();

      let count = 0;
      if (fileFields.length > 0) {
        fileFields.forEach((fld) => {
          let files = document.getElementById(fld).files;
          if (files) {
            console.log("File Model", files);
            if (files.length > 0) {
              count = count + files.length;
            }
          }
        });
      } else {
        // No file fields found . Hence send mail and return
        console.log("No File Fields.");
        // this.sendMail();
        // this.$router.push({ name: this.schema.goBackTo });
        return;
      }
      if (count == 0) {
        // this.closeIndefinite();
        console.log("No files in File Fields.");
        //  No files in  file fields. Hence send mail and then return
        // this.sendMail();
        // this.$router.push({ name: this.schema.goBackTo });
        return;
      }
      // console.log("File Count:", count);
      console.log("Files found in File Fields.File Length :");
      let uploadedFileCount = 0;
      // this.indefinite();

      fileFields.forEach((fld) => {
        if (this.model[fld] === "") return;
        let files = document.getElementById(fld).files;
        console.log("Files :", files);
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          console.log("File :", file);
          const fr = new FileReader();
          fr.onload = (e) => {
            const data = e.target.result.split(",");
            const obj = {
              fileName: file.name,
              mimeType: data[0].match(/:(\w.+);/)[1],
              data: data[1],
            };

            google.script.run
              .withSuccessHandler((res) => {
                console.log("Uploaded File Id", res);
                this.files.push(res);
                uploadedFileCount = uploadedFileCount + 1;
                if (uploadedFileCount == count) {
                  console.log(
                    "All Files Uploaded successfully. Now Commiting Files to DB.",
                    this.files
                  );
                  var res = configStore.updateItems(
                    [newItem["fields"]["id"].value],
                    this.schema.table_name,
                    {
                      attachments: JSON.stringify(this.files),
                    }
                  );
                  // this.closeIndefinite();
                }
              })
              .saveFile2(obj);
          };
          fr.readAsDataURL(file);
        }
      });
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
      if (this.initialData) {
        this.model = { ...this.model, ...this.initialData };
      }
      document.getElementById("createEntityForm").reset();
    },
    modelUpdated(val, schema) {
      // console.log(`${val} in ${schema}`);
      if (this.schema.compute) {
        this.handleCalculte(
          this.schema.compute.methodName,
          this.schema.compute.els
        );
      }
    },
    handleCalculte(functionName, event) {
      this[functionName](event);
    },
    getCharge(els) {
      els = els.map((el) => {
        return this.model[el];
      });
      const charge = (els[0] + els[1] / 60) * els[2];
      this.model["charge"] = charge.toFixed(2);
      console.log(charge);
    },
  },
};
</script>

<style></style>
