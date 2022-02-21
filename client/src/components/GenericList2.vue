<template>
<h1>All clietns </h1>
</template>

<script>

import CreateEntity from "../pages/CreateEntity";
import { editDeleteMixin } from '../mixins/editDeleteHandlr.js'

export default {
  components: { CreateEntity },
  name: "GenericList2",
   mixins: [editDeleteMixin],
  props: {
    // schema: {
    //   type: Object,
    //   required: true,
    // },
    routerPath: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      items: "",
      title:"",
      fields: [],
      showingPlus: true,
    };
  },
  mounted() {
  console.log("GenericList2 Mounted");
    this.fields = ["client_name","address_1","address_2"];
    console.log("Display Fields in GenericList Component",this.fields);
    // this.fields = this.schema.displayFields().addFields('actions');
    this.title = "All clients";
      this.fetchTables();
  },
  methods: {
    fetchTables() {
      google.script.run
        .withSuccessHandler((res) => {
          console.log(res);
          this.items = res[this.schema.table_name];
        })
        .withFailureHandler((error) => {
          console.log(error);
        })
        .GetTables([this.schema.table_name]);
    },

    // deleteHandler(item, index, button) {
    //   // Call Delete Item Method of GAS  with table name  and id as props
    //   console.log("DeletedItem", item.name);
    // },
    // edit(item, index, button) {
    //   // Render Create Entity component with table name and ID as props

    //   console.log("Eidited", item.name);
    // },
  },
};
</script>
