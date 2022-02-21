<template>
  <!-- <b-card bg-variant="light" :header="title" no-body> -->
  <!--  style="min-width: 90rem;" -->
  <!-- <template #header> -->
  <div>
    <!-- <div class="d-flex justify-content-center">
          <p class="h4 mb-2">
            {{ showingPlus ? "Add New Client" : "Collapse Form" }}
            <b-icon
              @click="
                () => {
                  showingPlus = !showingPlus;
                }
              "
              :icon="showingPlus ? 'plus-circle' : 'dash-circle'"
              :variant="showingPlus ? 'success' : 'danger'"
            ></b-icon>
          </p>
        </div> -->

    <!-- <b-button
      size="sm"
      block
      class="mb-2 mt-2"
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
      >{{ showingPlus ? "Add New Client " : "Collapse" }}
    </b-button> -->
    <!-- </template> -->
    <!-- Hidden Create Form Component -->
    <b-button
      size="sm"
      block
      class="mb-2 mt-2"
      variant="light"
      :to="{
        name: 'CreateEntity',
        params: { schema: schema, routerPath: 'createclient' },
      }"
    >
      <b-icon icon="plus" aria-hidden="true" class="text-success"></b-icon>
      Add New Client
    </b-button>

    <!-- <create-entity
      v-if="!showingPlus"
      :schema="schema"
      :cardView="false"
    ></create-entity> -->

    <!--  Filter Component -->

    <b-row>
      <b-col class="my-1">
        <!-- If Filter Type is By Client : Auto complete -->
        <b-form-group v-if="filterType === 'client'">
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Search client ..                "
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = null"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group v-if="filterType !== 'client'">
          <b-input-group size="sm">
            <b-form-select v-model="filter" placeholder="Filter .. " size="sm">
              <b-form-select-option
                v-for="(option, index) in configStore.state.tables[
                  'tbl_company_type'
                ]"
                :key="index"
                :value="option.id"
                >{{ option["company_type"] }}</b-form-select-option
              >
            </b-form-select>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = null" size="sm"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col class="my-1" cols="8">
        <b-form-group
          label="Filter By"
          label-cols-sm="2"
          label-size="sm"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio-group
            v-model="filterType"
            :options="filterCriterias"
            :aria-describedby="ariaDescribedby"
            name="radio-inline"
          ></b-form-radio-group>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Table Component -->
    <b-overlay :show="showSpinner" rounded="sm">
      <b-table
        :items="items"
        :fields="fields"
        class="table-condensed"
        responsive
        striped
        hover
        :current-page="currentPage"
        :per-page="perPage"
        @row-clicked="
          (item, index) => {
            $set(item, '_showDetails', !item._showDetails);
            if (prevSelected != null) {
              prevSelected._showDetails = !prevSelected._showDetails;
            }
            prevSelected = item;
          }
        "
      >
        <!-- Render S.No -->
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>

        <!-- Render Company Type -->
        <template #cell(company_type_id)="data">
          {{ config["tbl_company_type"][data.value]["company_type"] }}</template
        >

        <!-- Render Selectable Checkboxes -->

        <!-- <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span class="text-primary h5" aria-hidden="true">&check;</span>
        </template>
        <template v-else>
          <span class="text-primary h5" aria-hidden="true">&square;</span> 
        </template>
       </template> -->

        <!--  Actions Buttons  -->

        <template #row-details="row">
          <b-button
            pill
            variant="info"
            size="sm"
            class="mr-1"
            @click="updateClientInfo(row.item, row.index)"
          >
            Update Client Info
          </b-button>
          <b-button
            pill
            variant="info"
            size="sm"
            class="mr-1"
            @click="viewClientInfo(row.item, row.index, $event.target)"
          >
            View Client Info
          </b-button>
          <b-button
            pill
            variant="info"
            size="sm"
            class="mr-1"
            @click="updateClientNotes(row.item, row.index)"
          >
            Add Client Note
          </b-button>
          <b-button
            pill
            variant="info"
            size="sm"
            class="mr-1"
            @click="viewClientNote(row.item, row.index, $event.target)"
          >
            View Client Notes
          </b-button>

          <b-button
            pill
            variant="info"
            size="sm"
            @click="showRelatedTasks(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Show Related Tasks
          </b-button>
          <b-button
            pill
            variant="info"
            size="sm"
            class="mr-1"
            @click="editClient(row.item, row.index)"
          >
            Edit Client
          </b-button>

          <b-button
            pill
            variant="danger"
            size="sm"
            class="mr-1"
            v-b-modal.modal-delete-client
            @click="selectedClient = row.item"
          >
            Delete Client
          </b-button>
        </template>

        <!-- <template #cell(actions)="row">
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
          </template> -->

        <div class="text-center">
          <b-spinner
            variant="primary"
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
        </div>
      </b-table>
    </b-overlay>
    <!--  Related Task Modal -->
    <b-modal
      id="related_tasksModal"
      title="Related Tasks"
      ok-only
      @hide="resetInfoModal"
      size="xl"
      scrollable
    >
      <b-card no-body style="max-width: 150rem">
        <modal-tasks :clientId="selectedClientId"></modal-tasks>
      </b-card>
    </b-modal>
    <!--  Related Notes Modal -->
    <b-modal
      id="related_noteModal"
      title="Client Notes"
      ok-only
      @hide="resetNoteModal"
      size="xl"
      scrollable
    >
      <b-card no-body style="max-width: 150rem">
        <modal-notes :clientId="selectedClientId"></modal-notes>
      </b-card>
    </b-modal>
    <!--  Client Info Modal -->
    <b-modal
      :id="clientInfoModal.id"
      title="Client Info"
      ok-only
      @hide="resetInfoModal"
    >
      <strong>{{ clientInfoError }}</strong>
      <b-card v-if="clientInfoError === ''" no-body style="max-width: 40rem">
        <b-list-group flush>
          <b-list-group-item v-for="fld in clientInfoModal.header" :key="fld.id"
            >{{ fld | capitalize }} :
            <strong>{{ clientInfoModal.item[fld] }}</strong>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-modal>

    <!--  Client Detail Modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <b-card no-body style="max-width: 40rem">
        <b-list-group flush>
          <b-list-group-item
            ><strong>Client Name : </strong>
            {{ infoModal.client.client_name }}</b-list-group-item
          >
          <b-list-group-item
            ><strong>Email : </strong>{{ infoModal.client.email
            }}<strong> | Phone : </strong
            >{{ infoModal.client.phone }}</b-list-group-item
          >
          <b-list-group-item
            ><strong>Address 1 : </strong>
            {{ infoModal.client.address_1 }}</b-list-group-item
          >
          <b-list-group-item
            ><strong>Address 2 : </strong>
            {{ infoModal.client.address_2 }}</b-list-group-item
          >
          <b-list-group-item
            ><strong>City : </strong>{{ infoModal.client.city
            }}<strong> | Country : </strong>{{ infoModal.client.country
            }}<strong> | Postcode : </strong
            >{{ infoModal.client.postcode }}</b-list-group-item
          >
        </b-list-group>
      </b-card>
    </b-modal>
    <!-- Client Delete  modal -->
    <b-modal
      id="modal-delete-client"
      :title="clientDeleteModal.title"
      @hide="resetclientDeleteModal"
      @ok="handleDelete(selectedClient)"
    >
      {{ clientDeleteModal.content }}
    </b-modal>

    <b-col sm="7" md="6" class="my-1">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-col>
    <!-- </b-card> -->

    <!-- <pre>Filter on : {{ filterOn }}</pre>
    <pre>Filter on : {{ filter }}</pre>
    <pre>Prev : {{ prevSelected }}</pre> -->
  </div>
</template>

<script>
import CreateEntity from "../pages/CreateEntity";
import ModalTasks from "../pages/ListAllTasksModal.vue";
import ModalNotes from "../pages/ListAllNotesModal.vue";
import clientInfoSchema from "../forms/clientInfo";
import clientNoteSchema from "../forms/clientNote";
import GASBackEnd from "../services/GASBackEnd";
import editDeleteMixin from "../mixins/editDeleteHandlr";
import clientStore from "../store/client";
import configStore from "../store/configuration";
var moment = require("moment");

export default {
  components: { CreateEntity, ModalTasks, ModalNotes },
  name: "GenericList3",
  mixins: [editDeleteMixin],
  props: {
    schema: {
      type: Object,
      required: true,
    },
    routerPath: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      bw: new GASBackEnd(),
      configStore,
      clientStore,
      title: "",
      fields: [],
      showSpinner: false,
      showingPlus: true,
      clientInfoError: "",
      prevSelected: null,
      selectedClientId: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      filterType: "client",
      infoModal: {
        id: "info-modal",
        title: "",
        client: {},
        content: "",
      },
      clientInfoModal: {
        id: "client_info_modal",
        title: "Client Info",
        item: {},
        header: [],
      },
      clientDeleteModal: {
        id: "client-delete-modal",
        title: "Client Delete",
        content:
          "You are attempting to delete the selected client. Do you want to go ahead ?",
      },
      clientInfoSchema: clientInfoSchema,
      clientNoteSchema: clientNoteSchema,
      filterCriterias: [
        {
          text: "Type",
          value: "type",
        },
        {
          text: "Client",
          value: "client",
        },
      ],
    };
  },
  computed: {
    items() {
      let items = configStore.state.tables["tbl_client"];

      if (this.filter != null) {
        if (this.filterType === "client") {
          items = items.filter((client) => {
            return configStore.state.indexedDropdowns["tbl_client"][client.id][
              "client_name"
            ].includes(this.filter);
          });
        } else {
          items = items.filter((client) => {
            return client["company_type_id"] === this.filter;
          });
        }
      }
      this.totalRows = items.length;
      return items;
    },
    config() {
      return configStore.state.indexedDropdowns;
    },
  },
  created() {
    clientStore.getTables();
  },
  mounted() {
    this.fields = [
      { key: "index", label: "" },
      "client_name",
      "email",
      "address_1",
      "address_2",
      "city",
      "country",
      "postcode",
      { key: "company_type_id", label: "Type" },
    ];
    // this.fields = [ { key: "selected", label: "" },"client_name","email","address_1","address_2","city","country","postcode","type"]
    this.title = this.schema.listTitle;
  },
  methods: {
    fetchTables() {
      // this.bw.GetPopulatedTable("tbl_client").then(
      //   function (res) {
      //     this.tblLoadingObject = res;
      //     this.items = res.mainTable;
      //     this.items = this.items.reverse();
      //     this.totalRows = this.items.length;
      //     // Fetch related Tables : tbl_client
      //     this.showSpinner = false;
      //   }.bind(this),
      //   function (err) {
      //     console.log("Fetched ", res); //this.showError();
      //   }.bind(this)
      // );
    },
    // updateClientInfo(item, index) {
    //   console.log("Updating Client Info", item);
    //   // let taskItem = this.tblLoadingObject.keyedTable[index];
    //   console.log("Index", item);
    //   this.clientInfoSchema.defaultModelData.client_id = item.id;
    //   if (item.hasOwnProperty("_showDetails")) {
    //     delete item._showDetails;
    //   }
    //   google.script.run
    //     .withSuccessHandler((res) => {
    //       console.log("Client Info Found:", res);
    //       if (res == null) {
    //         this.$router.push({
    //           name: "CreateEntity",
    //           params: {
    //             schema: this.clientInfoSchema,
    //             id: item.id,
    //             redirectRoute: "/AllClients",
    //           },
    //         });
    //       } else {
    //         const formData = res.items[0];
    //         this.$router.push({
    //           name: "CreateEntity",
    //           params: {
    //             schema: this.clientInfoSchema,
    //             formData: formData,
    //             redirectRoute: "/AllClients",
    //           },
    //         });
    //       }
    //     })
    //     .withFailureHandler((error) => {
    //       console.log(error);
    //     })
    //     .getClientInfo(item.id);
    // },
    updateClientInfo(item, index) {
      console.log("Updating Client Info", item);
      const info = clientStore.getClientInfo(item.id);
      console.log("Client Info", info);
      if (info == null) {
        this.$router.push({
          name: "CreateEntity",
          params: {
            schema: this.clientInfoSchema,
            id: item.id,
            redirectRoute: "/AllClients",
          },
        });
      } else {
        const formData = info;
        this.$router.push({
          name: "CreateEntity",
          params: {
            schema: this.clientInfoSchema,
            formData: formData,
            redirectRoute: "/AllClients",
          },
        });
      }
    },
    updateClientNotes(item, index) {
      this.$router.push({
        name: "CreateEntity",
        params: {
          schema: this.clientNoteSchema,
          id: item.id,
          redirectRoute: "/AllClients",
        },
      });
    },
    viewClientInfo(item, index, button) {
      console.log("Client Id Clicked :", item.id);
      const clientInfo = clientStore.getClientInfo(item.id);
      console.log("Client Info :", clientInfo);
      if (clientInfo == null) {
        this.clientInfoError = "No client info found.!!";
        this.clientInfoModal.id = "client_info_modal";
        this.$root.$emit("bv::show::modal", this.clientInfoModal.id, button);
      } else {
        this.clientInfoModal.id = "client_info_modal";
        this.clientInfoError = "";
        this.clientInfoModal.item = clientInfo;
        this.clientInfoModal.item.associated_dob = moment(
          this.clientInfoModal.item.associated_dob
        ).format("DD/MM/YYYY");
        const header = clientStore.state.clientInfoHeader;
        const newHeader = [...header].splice(2);
        this.clientInfoModal.header = newHeader;
        console.log("Header ", clientStore.state.clientInfoHeader);
        this.$root.$emit("bv::show::modal", this.clientInfoModal.id, button);
      }
      // google.script.run
      //   .withSuccessHandler((res) => {
      //     console.log("Client Info :", res);
      //     if (res == null) {
      //       this.clientInfoError = "No client info found.!!";
      //       this.clientInfoModal.id = "client_info_modal";
      //       this.$root.$emit(
      //         "bv::show::modal",
      //         this.clientInfoModal.id,
      //         button
      //       );
      //     } else {
      //       this.clientInfoModal.id = "client_info_modal";
      //       this.clientInfoModal.item = res.items[0];
      //       this.clientInfoModal.item.associated_dob = moment(
      //         this.clientInfoModal.item.associated_dob
      //       ).format("DD/MM/YYYY");
      //       res.header.splice(0, 2);
      //       this.clientInfoModal.header = res.header;
      //       this.$root.$emit(
      //         "bv::show::modal",
      //         this.clientInfoModal.id,
      //         button
      //       );
      //     }
      //   })
      //   .withFailureHandler((error) => {
      //     console.log(error);
      //   })
      //   .getClientInfo(item.id);
    },
    viewClientNote(item, index, button) {
      console.log("Related Notes Button Clicked :", item);
      this.selectedClientId = item.id;
      this.$root.$emit("bv::show::modal", "related_noteModal", button);
    },
    showRelatedTasks(item, index, button) {
      console.log("Related Task Button Clicked.Clicked Client :", item);
      this.selectedClientId = item.id;
      this.$root.$emit("bv::show::modal", "related_tasksModal", button);
    },
    editClient(item, index) {
      // let taskItem = this.tblLoadingObject.keyedTable[index];
      console.log("Index", item);
      if (item.hasOwnProperty("_showDetails")) {
        delete item._showDetails;
      }
      console.log("Selected Item", item);
      // console.log(taskItem);
      //  this.$router.push({ name: 'EditTask', params: { task: taskItem } });
      this.$router.push({
        name: "CreateEntity",
        params: {
          schema: this.schema,
          formData: item,
          redirectRoute: "/AllClients",
        },
      });
    },
    handleDelete(item) {
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
          this.items.splice(
            this.items.findIndex((a) => a.id === item.id),
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
      const bool = configStore.isDeletable(item, tableName, ["tbl_task"]);
      console.log("Is Deletable", bool);
      if (!bool) {
        this.$bvToast.toast(
          "Selected item cannot be deleted. Item found in Task table. !!",
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = this.items.length;
      this.currentPage = 1;
    },
  },
};
</script>
