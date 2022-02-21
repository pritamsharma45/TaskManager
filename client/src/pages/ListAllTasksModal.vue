<template>
  <div>
    <b-button
      size="sm"
      class="my-2 mx-4"
      variant="light"
      :to="{
        name: 'CreateEntity',
        params: { schema: schema, routerPath: 'createtask' },
      }"
    >
      <b-icon icon="plus" aria-hidden="true" class="text-success"></b-icon> Add
      New
    </b-button>
    <div>
      <strong>{{ errorMsg }}</strong>
    </div>

    <b-table
      select-mode="single"
      responsive="sm"
      class="table-condensed"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
      striped
      hover
      :items="tasks"
      :fields="fields"
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
      <template #cell(client_id)="data">
        {{ config["tbl_client"][data.value]["client_name"] }}
      </template>
      <template #cell(task_type_id)="data">
        {{ config["tbl_task_type"][data.value]["task_type"] }}
      </template>
      <template #cell(periodicity_id)="data">
        {{ config["tbl_periodicity"][data.value]["periodicity"] }}
      </template>

      <template #row-details="row">
        <b-button
          pill
          variant="info"
          size="sm"
          class="mr-1"
          @click="markComplete(row.item, row.index, false)"
        >
          Mark Complete
        </b-button>
        <b-button
          pill
          variant="info"
          size="sm"
          class="mr-1"
          @click="markComplete(row.item, row.index, true)"
        >
          Mark Complete And Recreate Task
        </b-button>

        <b-button
          pill
          variant="info"
          size="sm"
          @click="clientInfo(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Client Info
        </b-button>
        <b-button
          pill
          variant="info"
          size="sm"
          class="mr-1"
          @click="handleEdit(row.item, row.index, $event.target)"
        >
          Edit Task
        </b-button>
        <b-button
          pill
          variant="danger"
          size="sm"
          class="mr-1"
          v-b-modal.modal-delete-task
          @click="handleDelete(row.item, row.index, $event.target)"
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
      @ok="handleDelete"
    >
      {{ taskDeleteModal.content }}
    </b-modal>
  </div>
</template>

<script>
import taskSchema from "../forms/task";
import GASBackEnd from "../services/GASBackEnd";
import ConfirmDialogue from "../components/ConfirmDialogue.vue";
import configStore from "../store/configuration";
import store from "../store/task";

export default {
  props: ["clientId"],
  name: "AllTasks",
  components: { ConfirmDialogue },
  data() {
    return {
      bw: new GASBackEnd(),
      model: taskSchema.model,
      errorMsg: "",
      schema: taskSchema,
      prevSelected: null,
      editItem: {},
      fields: [
        { key: "selected", label: "" },
        {
          key: "client_id",
          label: "Client",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "task_type_id",
          label: "Task",
          sortable: true,
        },
        { key: "periodicity_id", label: "Periodicity" },
        { key: "deadline_date", label: "Deadline Date", sortable: true },
        { key: "reminder_date", label: "Reminder Date", sortable: true },
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
      tblLoadingObject: {},
      // tasks: [],

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

  mounted() {
    // store.getTasks();
    // this.fetchTasks();
    // console.log(taskSchema);
  },
  computed: {
    tasks() {
      let tasks = [];
      tasks = store.state.tasks;
      tasks = tasks.filter((task) => {
        return task.client_id === this.clientId;
      });

      this.totalRows = tasks.length;
      return tasks;
    },
    config() {
      return configStore.state.indexedDropdowns;
    },
    showSpinner() {
      return store.state.loading;
    },
  },

  methods: {
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
          if (reCreate) {
            item.status = "Completed";
            store.state.tasks.push(res);
          } else {
            item.status = "Completed";
          }
          store.state.tasks.push(res);
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
    handleDelete(index, row) {
      console.log("Task Item to delete", item);
      this.showSpinner = true;

      google.script.run
        .withSuccessHandler((res) => {
          this.$bvToast.toast("Selected Item Deleted Successfully", {
            title: `Deleted`,
            variant: "success",
            solid: true,
          });
          console.log("Delete Successfully", res);
          this.tasks.splice(
            this.tasks.findIndex((a) => a.id === item.id),
            1
          );
          this.showSpinner = false;
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        .deleteItem("tbl_task", item.id);
    },
  },
};
</script>
