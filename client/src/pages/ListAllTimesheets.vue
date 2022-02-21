<template>
  <div>
    <b-table striped hover :items="timesheets" :fields="fields">
      <template #cell(date)="data">
        <p>{{ data.value | formatAsDate }}</p>
      </template>
      <template #cell(time)="data">
        <p>{{ data.value | formatAsTime }}</p>
      </template>

      <template #cell(actions)="row">
        <b-button
         pill variant="info"
          size="sm"
          @click="clientInfo(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Client Info
        </b-button>
        <b-button
         pill variant="info"
          size="sm"
          @click="clientInfo(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Activity Info
        </b-button>
        <b-button
         pill variant="info"
          size="sm"
          @click="clientInfo(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Task Info
        </b-button>
        <b-button
         pill variant="info"
          size="sm"
          class="mr-1"
          @click="handleEdit(row.item, row.index, $event.target)"
        >
          Edit Task
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
      <b-card no-body style="max-width: 40rem;">
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
  </div>
</template>

<script>
import tsSchema from "../forms/timesheet";
import GASBackEnd from "../services/GASBackEnd";

export default {
  name: "AllTasks",
  data() {
    return {
      bw: new GASBackEnd(),
      model: tsSchema.model,
      editItem:{},
      fields: [
        {
          key: "client_id",
          label: "Client",
          sortable: true,
          sortDirection: "desc",
        },
         {
          key: "activity_id",
          label: "Activity",
          sortable: true,
          class: "text-center",
        },
        {
          key: "task_id",
          label: "Task ",
          sortable: true,
          class: "text-center",
        },
        {
          key: "user_id",
          label: "Team ",
          sortable: true,
          class: "text-center",
        },
        { key: "date", label: "Date" },
        { key: "time", label: "Time"},
        { key: "hours", label: "Hours", sortable: true },
        {
          key: "status",
          label: "Is Pending",
          formatter: (value, key, item) => {
            return value ? "Yes" : "No";
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: "actions", label: "Actions" },
      ],
      tblLoadingObject: {},
      timesheets: [],

      headers: tsSchema.fields,
      infoModal: {
        id: "info-modal",
        title: "",
        client: {},
        content: "",
      },
    };
  },

  mounted() {
    this.fetchTimesheets();
  },

  methods: {
    fetchTimesheets() {
      this.bw.GetPopulatedTable("tbl_timesheet").then(
        function(res) {
          this.tblLoadingObject = res;
             console.log("Table Loading Objects", res);
          this.timesheets = res.mainTable;
          // Fetch related Tables : tbl_client
         
          console.log("Table Loading Objects", res);
          console.log("Client Table", res.relatedTables.tbl_client);
        }.bind(this),
        function(err) {
          console.log("Fetched ", res); //this.showError();
        }.bind(this)
      );
    },
    clientInfo(item, index, button) {
      console.log("Index:", index);
      let client_id = this.tblLoadingObject.keyedTable[index]["client_id"];
      console.log("client ID:", client_id);
      console.log("Client Table:",this.tblLoadingObject.relatedTables_normal)
      this.infoModal.client = this.tblLoadingObject.relatedTables_normal["tbl_client"][
        client_id
      ];
      this.infoModal.title = "Client Info";
        this.infoModal.content = JSON.stringify(
          this.infoModal.client,
          null,
          2
        );
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },

    handleEdit(item,index) {
      let timesheetItem = this.tblLoadingObject.keyedTable[index];
      console.log("Index", index);
      console.log(timesheetItem);
    //  this.$router.push({ name: 'EditTimesheet', params: { timesheet: timesheetItem } })
      this.$router.push({ name: 'CreateEntity', params: { schema:tsSchema,formData: timesheetItem } });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
