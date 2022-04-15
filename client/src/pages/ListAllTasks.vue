<template>
  <div>
    <b-row>
      <!-- Button : Add New Button -->
      <b-col cols="3"
        ><b-button
          size="sm"
          class="my-2 mr-2 font-weight-bold"
          variant="warning"
          :to="{
            name: 'CreateEntity',
            params: { schema: schema, routerPath: 'createtask' },
          }"
        >
          <b-icon
            icon="plus"
            aria-hidden="true"
            class="text-success font-weight-bold"
          ></b-icon>
          New Task
        </b-button>

        <b-button
          size="sm"
          class="my-2 font-weight-bold"
          variant="warning"
          :to="{
            name: 'CreateEntity',
            params: { schema: clientSchema, routerPath: 'createclient' },
          }"
        >
          <b-icon
            icon="plus"
            aria-hidden="true"
            class="text-success font-weight-bold"
          ></b-icon>
          New Client
        </b-button></b-col
      >
      <!-- <b-col> <search-select></search-select></b-col> -->
      <!-- Button :  Show Search/Filter Panel -->
      <b-col cols="3" class="p-0"
        ><b-button
          size="sm"
          class="my-2 font-weight-bold"
          variant="warning"
          @click="showingFilterPanel = !showingFilterPanel"
        >
          Show Search & Filter panel
          <b-icon
            :icon="showingFilterPanel ? 'chevron-up' : 'chevron-down'"
            aria-hidden="true"
            class="text-success font-weight-bold"
          ></b-icon> </b-button
      ></b-col>
      <!-- Button : Get Completion Status -->
      <b-col class="p-0"
        ><b-button
          size="sm"
          class="my-2 font-weight-bold"
          variant="warning"
          @click="showingExportDialog = !showingExportDialog"
        >
          Get completion status of tasks
          <b-icon
            :icon="!showingExportDialog ? 'chevron-up' : 'chevron-down'"
            aria-hidden="true"
            class="text-success font-weight-bold"
          ></b-icon> </b-button
      ></b-col>
      <!--Switch :  Show Completed As well -->
      <b-col cols="2" class="p-0">
        <b-form-checkbox
          class="mt-1 font-weight-bold"
          size="sm"
          v-model="showCompleted"
          name="check-button"
          switch
        >
          Show Completed Tasks
        </b-form-checkbox>
      </b-col>
      <!--Switch :  Bulk Edit -->
      <b-col cols="1">
        <b-form-checkbox
          size="sm"
          class="mt-1 font-weight-bold"
          v-model="bulkEditMode"
          name="check-button"
          @input="deselectRow"
          switch
        >
          Bulk Edit
        </b-form-checkbox>
      </b-col>
      <!-- Button : Refresh -->
      <!-- <b-col>
        <b-button
          size="sm"
          variant="success"
          v-if="showRefreshButton"
          @click="fetchTasks"
        >
          <b-icon
            icon="arrow-clockwise"
            aria-label="Refresh"
          ></b-icon> </b-button
      ></b-col> -->
    </b-row>
    <!-- Card : Completion Status  -->
    <div class="my-2 mx-3" v-if="!showingExportDialog">
      <!-- <b-card
        bg-variant="warning"
        header="Get completion status as per selection criteria"
        style="max-width: 70rem"
      > -->
      <b-card-body>
        <strong>Get completion status as per selection criteria :</strong>

        <b-input-group>
          <template #prepend>
            <b-form-select v-model="exportTaskType">
              <b-form-select-option
                v-for="(option, index) in configStore.state.tables
                  .tbl_task_type"
                :key="index"
                :value="{ name: option.task_type, id: option.id }"
                >{{ option.task_type }}</b-form-select-option
              >
            </b-form-select>
          </template>
          <b-input-group-append is-text>
            <b-form-checkbox
              v-model="taskStatusPending"
              name="check-button"
              switch
            >
              Completed
            </b-form-checkbox>
          </b-input-group-append>
          <b-input-group-append>
            <download-excel
              class="btn btn-info"
              :data="exportTasks"
              :fields="json_fields"
              :header="exportHeader"
              :worksheet="exportTaskType"
              :name="exportFileName"
            >
              Click to download
            </download-excel>
          </b-input-group-append>
        </b-input-group>
      </b-card-body>
      <!-- </b-card> -->
    </div>

    <!--  Search/Filter Component -->
    <b-row v-if="showingFilterPanel">
      <!--  Filter By Other -->
      <b-col cols="3">
        <b-form-group>
          <b-input-group size="sm">
            <b-form-select v-model="filter" placeholder="Filter .. " size="sm">
              <b-form-select-option
                v-for="(option, index) in configStore.state.tables[
                  filterType.table_name
                ]"
                :key="index"
                :value="option.id"
                >{{ option[filterType.display] }}</b-form-select-option
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

      <b-col cols="1">
        <label style="font-size: 0.8em">Filter By:</label>
      </b-col>
      <b-col cols="5">
        <b-form-radio-group
          v-model="filterType"
          :options="filterCriterias"
          :aria-describedby="ariaDescribedby"
          name="radio-inline"
        ></b-form-radio-group>
      </b-col>
    </b-row>

    <!-- MAIN TABLE  -->
    <b-overlay :show="configStore.state.loading" rounded="sm">
      <b-table
        small
        :style="[
          configStore.state.tableFont === 'small'
            ? 'font-size: 0.8em'
            : 'font-size: 2.2em',
        ]"
        :sticky-header="windowHeight"
        ref="selectableTable"
        :filter="filter"
        filter-included-fields="['client_id']"
        filter-ignored-fields="['deadline_date','reminder_date','periodicity_id']"
        :selectable="bulkEdit"
        @row-selected="onRowSelected"
        @row-hovered="onRowClicked"
        @filtered="onFiltered"
        :items="tasks"
        :fields="fields"
      >
        <template #cell(deadline_date)="data">
          <p>{{ data.value | formatAsDate }}</p>
        </template>
        <template #cell(reminder_date)="data">
          <p>{{ data.value | formatAsDate }}</p>
        </template>
        <!-- Render S.No -->
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <!-- <template #cell(client_id)="data">
          {{ config["tbl_client"][data.value]["client_name"] }}
        </template> -->
        <template #cell(task_type_id)="data">
          {{ config["tbl_task_type"][data.value]["task_type"] }}
        </template>
        <template #cell(periodicity_id)="data">
          {{ config["tbl_periodicity"][data.value]["periodicity"] }}
        </template>
        <template #cell(status)="data">
          <div v-if="showCompleted">
            <b-icon
              :icon="
                data.value === 'Completed' ? 'check-circle' : 'clock-history'
              "
              :variant="data.value === 'Completed' ? 'success' : 'danger'"
            ></b-icon>
          </div>

          <div v-else></div>
        </template>

        <!-- <template #cell(selected)="{ rowSelected }">
          <template v-if="rowSelected">
            <span class="text-primary h5" aria-hidden="true">&check;</span>
          </template>
          <template v-else>
            <span class="text-primary h5" aria-hidden="true">&square;</span>
          </template>
        </template> -->

        <template #row-details="row">
          <b-button
            pill
            variant="success"
            size="sm"
            class="m-1 py-0"
            style="font-size: 0.8em"
            @click="markComplete(row.item, row.index, false)"
          >
            Mark Complete
          </b-button>
          <b-button
            pill
            variant="success"
            size="sm"
            class="m-1 py-0"
            style="font-size: 0.8em"
            @click="markComplete(row.item, row.index, true)"
          >
            Mark Complete And Recreate Task
          </b-button>
          <b-button
            pill
            variant="warning"
            size="sm"
            class="m-1 py-0"
            style="font-size: 0.8em"
            @click="markPending(row.item)"
          >
            Mark Pending
          </b-button>

          <b-button
            pill
            variant="info"
            size="sm"
            @click="clientInfo(row.item, row.index, $event.target)"
            class="m-1 py-0"
            style="font-size: 0.8em"
          >
            Client Info
          </b-button>
          <b-button
            pill
            variant="info"
            size="sm"
            class="m-1 py-0"
            style="font-size: 0.8em"
            @click="handleEdit(row.item, row.index, $event.target)"
          >
            Edit Task
          </b-button>
          <b-button
            pill
            variant="danger"
            size="sm"
            class="m-1 py-0"
            style="font-size: 0.8em"
            v-b-modal.modal-delete-task
            @click="selectedItem = row.item"
          >
            Delete Task
          </b-button>
        </template>
      </b-table>

      <!-- Client Info modal -->
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
      <!-- Task Delete  modal -->
      <b-modal
        id="modal-delete-task"
        :title="taskDeleteModal.title"
        @hide="resetTaskDeleteModal"
        @ok="handleDelete(selectedItem)"
      >
        {{ taskDeleteModal.content }}
      </b-modal>
      <!-- Bulk Change Warning  modal -->
      <b-modal
        ref="modal-bulk-change"
        title="Bulk edit warning. !"
        @ok="fabClicked"
      >
        You are about to change status of multiple selected items. Are you sure
        to go ahead ?
      </b-modal>
      <!-- <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col> -->
    </b-overlay>

    <!-- FAB -->
    <div v-if="bulkEditMode">
      <vue-fab icon="arrow_forward_ios" :mainBtnColor="mainBtnColor">
        <fab-item
          v-for="(item, idx) in menu"
          :idx="idx"
          :title="item.title"
          :color="item.color"
          :icon="item.icon"
          @clickItem="handleBulkEdit"
          :key="idx"
        />
      </vue-fab>
    </div>

    <!-- <pre>Prev : {{ prevSelected }}</pre> -->
    <!-- <div>
      <b-icon
        :icon="showCompleted ? 'patch-check-fill' : 'check-circle'"
      ></b-icon>
      <b-icon
        :icon="showCompleted ? 'check-circle-fill' : 'check-square-fill'"
      ></b-icon>
    </div> -->
  </div>
</template>

<script>
import taskSchema from "../forms/task";
import clientSchema from "../forms/client";
import GASBackEnd from "../services/GASBackEnd";
import ConfirmDialogue from "../components/ConfirmDialogue.vue";
import moment from "moment";
import store from "../store/task";
import configStore from "../store/configuration";

export default {
  name: "AllTasks",
  components: { ConfirmDialogue },
  data() {
    return {
      bw: new GASBackEnd(),
      windowHeight: window.innerHeight * 0.85 + "px",
      store,
      configStore,
      indexedDropdowns: {},
      bulkEditMode: false,
      bulkEdit: true,
      fabItem: "",
      selectedItems: [],
      showCompleted: false,
      taskStatusPending: false,
      currentPage: 1,
      perPage: 10,
      totalRows: "",
      filter: null,
      filterType: {
        table_name: "tbl_client",
        display: "client_name",
        filterField: "client_id",
      },
      showingFilterPanel: false,
      filterCriterias: [
        {
          text: "Task Type",
          value: {
            table_name: "tbl_task_type",
            display: "task_type",
            filterField: "task_type_id",
          },
        },
        {
          text: "Assigned Member",
          value: {
            table_name: "tbl_user",
            display: "user",
            filterField: "user_id",
          },
        },
        {
          text: "Client",
          value: {
            table_name: "tbl_client",
            display: "client_name",
            filterField: "client_id",
          },
        },
      ],
      // filterCriteriaOptions: ['Tom','Hank'],
      model: taskSchema.model,
      schema: taskSchema,
      clientSchema: clientSchema,
      prevSelected: null,
      selectedItem: {},
      editItem: {},
      fields: [
        { key: "index", label: "" },
        //  { key: "selected", label: "" },
        {
          key: "client_id",
          label: "Client",
          formatter: (value) => {
            return this.config["tbl_client"][value]["client_name"];
            // return value.charAt(0).toUpperCase();
          },
          sortable: true,
          sortByFormatted: true,
          // sortDirection: "desc",
        },
        {
          key: "task_type_id",
          label: "Task",
        },
        { key: "deadline_date", label: "Deadline Date", sortable: true },
        { key: "reminder_date", label: "Reminder Date" },
        { key: "periodicity_id", label: "Periodicity" },
        { key: "status", label: "" },
        // {
        //   key: "status",
        //   label: "Is Pending",
        //   formatter: (value, key, item) => {
        //     return value ? "Yes" : "No";
        //   },
        //   sortable: true,
        //   sortByFormatted: true,
        //   filterByFormatted: true,
        // },
        // { key: "actions", label: "Actions" },
      ],
      json_fields: {
        Client: "client_id",
        Task: "task_type_id",
        "Completion due date": "deadline_date",
      },
      exportHeader: "Outstanding Tasks",
      tblLoadingObject: {},
      menu: [
        {
          icon: "delete_forever",
          title: "Delete",
          color: "#ec243b",
          action: "delete",
        },
        {
          icon: "task_alt",
          title: "Mark complete",
          color: "#3e9213",
          action: "complete",
        },
        {
          icon: "history_toggle_off",
          title: "Mark pending",
          color: "#ff9900",
          action: "pending",
        },
      ],
      mainBtnColor: "#073d5e",
      exportFileName: "",
      exportTaskType: {},
      taskTypeName: "default",
      exportTaskTypeOptions: [],
      exportWorksheetName: "My sheet",
      showingExportDialog: "false",
      headers: taskSchema.fields,
      infoModal: {
        id: "info-modal",
        title: "",
        client: {},
        content: "",
      },
      taskDeleteModal: {
        id: "task-delete-modal",
        title: "Task Delete",
        content:
          "You are attempting to delete the selected task. Do you want to go ahead ?",
      },
    };
  },
  created() {
    // store.getTasks();
    // configStore.getIndexedTables();
  },
  mounted() {
    // this.fetchTasks();
    console.log("Task manger  Mounted");
    // if (localStorage.getItem('tbl_tasks'))
    //     this.todo_items = JSON.parse(localStorage.getItem('todo_items'));
    // console.log(taskSchema);
  },
  beforeDestroy() {
    console.log("Previous Selected", this.prevSelected);
    if (this.prevSelected != null) {
      this.prevSelected._showDetails = false;
    }
  },
  computed: {
    tasks() {
      let tasks = [];
      if (this.showCompleted) {
        tasks = configStore.state.tables["tbl_task"];
      } else {
        tasks = configStore.state.tables["tbl_task"].filter((task) => {
          return task.status === "Pending";
        });
      }

      if (this.filter != null) {
        console.log("Tasks filter did run");
        tasks = tasks.filter((task) => {
          return task[this.filterType.filterField] === this.filter;
        });
      }
      this.totalRows = tasks.length;
      return tasks;
    },
    config() {
      return configStore.state.indexedDropdowns;
    },
    showSpinner() {
      return store.state.loading;
    },
    taskItemWithShowDetail: function () {
      let taskItem = this.tasks.filter(
        (element) => element._showDetails == true
      );
      console.log("TaskItemWithShowDetail", taskItem);
    },
    exportTasks: function () {
      let exportTasks = configStore.state.tables["tbl_task"];

      if (this.taskStatusPending == false) {
        exportTasks = exportTasks.filter((task) => {
          return (
            task.status === "Pending" &&
            task.task_type_id === this.exportTaskType.id
          );
        });
        this.exportHeader = "Outstanding Tasks : " + this.exportTaskType.name;
        this.json_fields = {
          Client: "client_id",
          "Completion due date": "deadline_date",
        };
      } else {
        exportTasks = exportTasks.filter((task) => {
          return (
            task.status === "Completed" &&
            task.task_type_id === this.exportTaskType
          );
        });
        // const taskTypeName =
        //   configStore.state.indexedDropdowns.tbl_task_type[this.exportTaskType][
        //     "task_type"
        //   ];
        this.exportHeader = "Completed Tasks : " + this.exportTaskType.name;
        this.json_fields = {
          Client: "client_id",
          "Completed Date": "deadline_date",
        };
      }

      //  Render Foreing keys in tasks array
      const indexedTbl = configStore.state.indexedDropdowns["tbl_client"];

      this.exportFileName = this.exportTaskType.name + ".xls";

      exportTasks = exportTasks.map((task) => {
        const dtString = moment(task.deadline_date).format("DD/MM/YYYY");

        // const dtString = new Date( task.deadline_date);
        task.deadline_date = dtString;
        task.client_id = indexedTbl[task.client_id]["client_name"];
        return task;
      });
      return exportTasks;
    },
  },
  methods: {
    fetchTasks() {
      // this.showSpinner = true;
      // this.bw.GetPopulatedTable("tbl_task").then(
      //   function (res) {
      //     this.tblLoadingObject = res;
      //     this.allTasks = res.mainTable.reverse();
      //     this.pendingTasks = res.mainTable.reverse().filter((task) => {
      //       return task.status === "Pending";
      //     });
      //     this.tasks = this.pendingTasks;
      //     this.totalRows = this.tasks.length;
      //     this.exportTaskTypeOptions = this.populateDropdown("tbl_task_type");
      //     // Fetch related Tables : tbl_client
      //     this.showSpinner = false;
      //     this.showRefreshButton = false;
      //     console.log("Table Loading Objects", res);
      //     console.log("Client Table", res.relatedTables.tbl_client);
      //     // this.populateDropdown();
      //   }.bind(this),
      //   function (err) {
      //     console.log("Fetched ", res); //this.showError();
      //   }.bind(this)
      // );
    },
    onRowSelected(items) {
      console.log(items);
      this.selectedItems = items;
      // this.onRowClicked(items[0]);
    },
    onRowClicked(item, index) {
      if (!this.bulkEditMode) {
        this.$set(item, "_showDetails", !item._showDetails);
        if (this.prevSelected != null) {
          this.prevSelected._showDetails = !this.prevSelected._showDetails;
        }
        this.prevSelected = item;
      }
    },
    deselectRow() {
      if (!this.bulkEditMode) {
        this.clearSelected();
      }

      if (this.prevSelected != null) {
        this.prevSelected._showDetails = false;
        delete this.prevSelected._showDetails;
        this.bulkEdit = true;
      } else {
        this.bulkEdit = false;
      }
      this.prevSelected = null;
    },

    fabClicked() {
      const item = this.fabItem;
      console.log("FAB clicked Item", item);
      const tableName = "tbl_task";
      const ids = this.selectedItems.map((e) => {
        return e.id;
      });
      switch (this.menu[item.idx].action) {
        case "delete":
          configStore.deleteItems(this.selectedItems, tableName);
          break;
        case "complete":
          configStore.updateItems(ids, tableName, { status: "Completed" });
          break;
        case "pending":
          configStore.updateItems(ids, tableName, { status: "Pending" });
          break;
        default:
          break;
      }
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    clientInfo(item, index, button) {
      let client_id = item.client_id;
      console.log("client ID:", client_id);
      // console.log("Client Table:", this.tblLoadingObject.relatedTables_normal);
      this.infoModal.client = this.config["tbl_client"][client_id];
      this.infoModal.title = "Client Info";
      this.infoModal.content = JSON.stringify(this.infoModal.client, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    markComplete(item, index, reCreate) {
      this.showSpinner = true;
      this.configStore.state.loading = true;

      let msg = "";
      if (reCreate) {
        msg =
          "Selected item has been marked completed along with task recreation.";
      } else {
        msg = "Selected item has been marked completed.";
      }
      console.log("Index", index);
      console.log("Selcted Task Item", item);

      google.script.run
        .withSuccessHandler((res) => {
          console.log("Mark Completed", res);
          this.configStore.state.loading = false;
          if (reCreate) {
            item.status = "Completed";
            configStore.state.tables["tbl_task"].push(res);
          } else {
            item.status = "Completed";
          }
          configStore.state.tables["tbl_task"].push(res);
          // this.showRefreshButton = true;
          // this.showSpinner = false;
          this.$bvToast.toast(msg, {
            title: `Marked Completed`,
            variant: "success",
            solid: true,
          });
        })
        .withFailureHandler((error) => {
          console.log(error);
          // this.showSpinner = false;
        })
        .MarkComplete(item, reCreate);
    },
    markPending(item) {
      var res = configStore.updateItems([item.id], "tbl_task", {
        status: "Pending",
      });
      console.log("Marked Pending", res);
    },
    handleEdit(item, index) {
      this.$router.push({
        name: "CreateEntity",
        params: {
          schema: taskSchema,
          formData: item,
          redirectRoute: "/AllTasks",
        },
      });
    },
    handleDelete(item) {
      console.log("Task Item to delete", item);
      this.showSpinner = true;
      this.configStore.state.loading = true;

      google.script.run
        .withSuccessHandler((res) => {
          this.configStore.state.loading = flase;
          this.$bvToast.toast("Selected Item Deleted Successfully", {
            title: `Deleted`,
            variant: "success",
            solid: true,
          });
          console.log("Delete Successfully", res);
          configStore.state.tables["tbl_task"].splice(
            configStore.state.tables["tbl_task"].findIndex(
              (a) => a.id === item.id
            ),
            1
          );
          this.showSpinner = false;
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        .deleteItem("tbl_task", item.id);

      // this.tasks.splice(this.tasks.findIndex(a => a.id === item.id) , 1);
    },
    handleBulkEdit(fabItem) {
      this.fabItem = fabItem;
      this.$refs["modal-bulk-change"].show();
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = this.tasks.length;
      this.currentPage = 1;
    },
    populateDropdown(tblName) {
      const obj = this.tblLoadingObject.relatedTables[tblName];
      const arr = Object.entries(obj).map(([k, v]) => {
        return v.name;
      });
      console.log("Task Type Drop Down Options", arr);
      return arr;
    },
    sortCompare(
      aRow,
      bRow,
      key,
      sortDesc,
      formatter,
      compareOptions,
      compareLocale
    ) {
      var a = aRow[key]; // or use Lodash `_.get()`
      var b = bRow[key];

      // if (key.includes("_id")) {
      //   a = config["tbl_client"][data.value]["client_name"];
      // }

      if (
        (typeof a === "number" && typeof b === "number") ||
        (a instanceof Date && b instanceof Date)
      ) {
        // If both compared fields are native numbers or both are native dates
        return a < b ? -1 : a > b ? 1 : 0;
      } else {
        // Otherwise stringify the field data and use String.prototype.localeCompare
        return this.toString(a).localeCompare(
          this.toString(b),
          compareLocale,
          compareOptions
        );
      }
    },
    // Helper function to stringify the values of an Object
    toString(value) {
      if (value === null || typeof value === "undefined") {
        return "";
      } else if (value instanceof Object) {
        return Object.keys(value)
          .sort()
          .map((key) => toString(value[key]))
          .join(" ");
      } else {
        return String(value);
      }
    },
  },
};
</script>
