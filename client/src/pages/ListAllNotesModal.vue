<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(note_date)="data">
        <p>{{ data.value | formatAsDate }}</p>
      </template>
      <!-- Render S.No -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
import clientStore from "../store/client";
export default {
  props: ["clientId"],
  name: "ClineNoteListModal",
  data() {
    return {
      items: [],
      fields: [
        { key: "index", label: "" },
        //  { key: "selected", label: "" },
        {
          key: "notes",
          label: "Client Note",
        },
        { key: "note_date", label: "Note Date", sortable: true },
      ],
    };
  },
  mounted() {
    // this.model = schema.model();
    // this.fetchItems();
    this.items = clientStore.getClientNotes(this.clientId);
  },
  methods: {
    fetchItems() {
      // console.log("Client Id", this.clientId);
      // const o = {
      //   key: "client_id",
      //   value: this.clientId,
      // };
      // google.script.run
      //   .withSuccessHandler((res) => {
      //     this.items = res;
      //     console.log("Client Notes", res);
      //   })
      //   .withFailureHandler((error) => {
      //     console.log(error);
      //   })
      //   .GetItemsWhere2("tbl_client_notes", o);
    },
  },
};
</script>
