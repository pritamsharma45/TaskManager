<template>
 <div>
    <input
      type="text"
      class="form-control"
      v-model="value"
      :disabled="disabled"
      :maxlength="schema.max"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      style="maxWidth:20rem"
      aria-label="Amount (to the nearest dollar)"
    />
    <!-- <b-button v-b-modal.modal-1>{{(selected[0])?selected[0]:'Select Task'}}</b-button>
     <b-modal id="modal-1" title="BootstrapVue">
      <b-table
      :items="items"
      :fields="fields"
      select-mode="single"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span class="text-primary" aria-hidden="true">&check;</span>
        </template>
        <template v-else>
          <span class="text-primary" aria-hidden="true">&square;</span> 
        </template>
      </template>
    </b-table>
    <p>
      Selected Rows:<br>
      {{ selected }}
    </p>
  </b-modal> -->
   
   
    </div>
   

</template>

<script>
import { abstractField } from "vue-form-generator";
export default {
  props:{
 preText:{
       type: String,
      required: false
    },
     endText:{
       type: String,
      required: false
    },
  },
  mixins: [abstractField],
    data() {
    return {
      fields: [
        { key: "selected", label: "" },
        "isActive",
        "age",
        "first_name",
        "last_name",
      ],
      selected: [],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      
    };
  },
  
  methods: {
   onRowSelected(items) {
      this.selected = items;
    },
    fetchTableItems() {
    
    },
  },
};
</script>
