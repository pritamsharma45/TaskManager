<template>
    <generic-list :listObject="listObject"></generic-list>
</template>

<script>
import GenericList from "../components/GenericList.vue";
export default {
    name:"Test",
     components: {
    GenericList,
  },
    data() {
    return {
        listObject:{
                title: "Client List",
      items: [
        { id: 1, name: "Pritam" },
        { id: 2, name: "Amrita" },
        { id: 3, name: "Jiwan" },
      ],
      header: ["id", "name","actions"],
        }
    }; 
    },
}
</script>
