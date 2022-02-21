<template>
  <div>
    <b-button
      size="sm"
      block
      class="my-2"
      variant="light"
      @click="
        () => {
          showingPlus = !showingPlus;
        }
      "
    >
      <b-icon
        aria-hidden="true"
        class="text-success"
        :icon="showingPlus ? 'plus' : 'dash'"
        :variant="showingPlus ? 'primary' : 'danger'"
      ></b-icon
      >{{ showingPlus ? "Add  " : "Collapse" }}
    </b-button>
    <create-entity
      v-if="!showingPlus"
      :schema="schema"
      :cardView="true"
      @formSubmitted="formSubmitted"
    ></create-entity>

    <b-card bg-variant="light" :header="title" no-body>
      <template>
        <b-container fluid>
          <b-overlay :show="showSpinner" rounded="sm">
            <b-table :items="items" :fields="fields" class="table-condensed">
              <!-- Render S.No -->
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(actions)="row">
                <b-button-group>
                  <b-button
                    size="sm"
                    @click="deleteHandler(row.item, row.index, $event.target)"
                    variant="danger"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                  <b-button
                    size="sm"
                    @click="edit(row.item, row.index, $event.target)"
                    variant="light"
                  >
                    <b-icon variant="primary" icon="pencil"></b-icon>
                  </b-button>
                </b-button-group>
              </template>
            </b-table>
          </b-overlay>
        </b-container>
      </template>
    </b-card>
  </div>
</template>

<script>
import CreateEntity from "../pages/CreateEntity";
import store from "../store/configuration";
export default {
  components: { CreateEntity },
  name: "GenericList",
  props: {
    listObject: {
      type: Object,
      required: true,
    },
    routerPath: {
      type: String,
      required: false,
    },
    criteria: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      title: "",
      items: [],
      fields: "",
      schema: {},
      showingPlus: true,
      showSpinner: false,
    };
  },
  mounted() {
    this.fields = this.listObject.header;
    this.title = this.listObject.title;
    this.schema = this.listObject.schema;
    this.items = store.state.tables[this.listObject.name];
    // this.fetchTables();
  },
  methods: {
    fetchTables() {
      this.showSpinner = true;
      google.script.run
        .withSuccessHandler((res) => {
          this.items = res;
          console.log("Table", res);
          this.showSpinner = false;
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        .GetTable(this.listObject.name);
    },
    deleteHandler(item, index, button) {
      // Call Delete Item Method of GAS  with table name  and id as props
      this.showSpinner = true;
      this.isDeletable(this.schema.table_name, item);
    },
    delete(item) {
      google.script.run
        .withSuccessHandler((res) => {
          this.$bvToast.toast("Selected Item Deleted Successfully", {
            title: `Deleted`,
            variant: "success",
            solid: true,
          });
          console.log("Delete Successfully", res);
          store.state.tables[this.listObject.name].splice(
            store.state.tables[this.listObject.name].findIndex(
              (a) => a.id === item.id
            ),
            1
          );
          this.showSpinner = false;
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        .deleteItem(this.schema.table_name, item.id);
    },
    isDeletable(tableName, item) {
      const bool = store.isDeletable(item, tableName, [
        "tbl_task",
        "tbl_client",
      ]);
      console.log("Is Deletable", bool);
      if (!bool) {
        this.$bvToast.toast(
          "Selected item cannot be deleted. Item found in other tables. !!",
          {
            title: `Deleted`,
            variant: "danger",
            solid: true,
          }
        );
        this.showSpinner = false;
        return;
      } else {
        this.delete(item);
      }

      // google.script.run
      //   .withSuccessHandler((res) => {
      //     console.log(res);
      //     if (res) {
      //       this.$bvToast.toast(
      //         "Selected item cannot be deleted. Item found in other tables. !!",
      //         {
      //           title: `Deleted`,
      //           variant: "danger",
      //           solid: true,
      //         }
      //       );
      //       this.showSpinner = false;
      //       return;
      //     } else {
      //       this.delete(item);
      //     }
      //   })
      //   .withFailureHandler((error) => {
      //     console.log("Checking Is Deleteable Method Failed", error);
      //   })
      //   ._checkIfForeignKeyExistInOtherTables(fieldName, item.id);
    },
    edit(item, index, button) {
      // Render Create Entity component with table name and ID as props
      console.log("Index", item);
      // console.log(taskItem);
      //  this.$router.push({ name: 'EditTask', params: { task: taskItem } });
      this.$router.push({
        name: "CreateEntity",
        params: { schema: this.schema, formData: item },
      });
    },
    formSubmitted(event) {
      var items = this.items;
      let nextId = "";
      var arr = items.map((row) => {
        return row["id"];
      });
      if (arr.length == 0) {
        nextId = 1;
      } else {
        nextId = Math.max(...arr) + 1;
      }
      // console.log("Next ID", nextId);

      // console.log("Form submitted :", event);
      let item = event;
      item.id = nextId;
      // store.state.tables[this.listObject.name].push(item);
      // console.log(
      //   "After Pushing item",
      //   store.state.tables[this.listObject.name]
      // );
    },
  },
};
</script>
