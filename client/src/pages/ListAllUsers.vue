<template>
  <v-table :data="tasks" class="table table-striped table-hover">
    <thead slot="head">
        <th  v-for="fld in headers">{{fld.label}}</th>
    </thead>
    <tbody slot="body" slot-scope="{displayData}">
        <tr v-for="row in displayData" :key="row.id">      
          <td   v-for="fld in headers">{{ row[fld.model] }}</td>
        </tr>
    </tbody>  
  </v-table>
</template>


<script>

import taskSchema from "../forms/task" ;
import GASBackEnd from "../services/GASBackEnd";

export default {
  name: 'AllTasks',
  data() {
      return {
        bw: new GASBackEnd(),
        headers:taskSchema.fields,
  //       headers: [
  //               {
  //               type: "select",
  //               label: "Client",
  //               model: "client_id",
  //               values: [],
  //               required: true,
  //               },
  //               {
  //               type: "select",
  //               values: [],
  //               label: "Task Type",
  //               model: "task_type_id",
  //               required: true,
  //               },
  //               {
  //               type: "select",
  //               values: [],
  //               label: "Periodicity",
  //               model: "periodicity_id",
  //               required: true,
  //               },
  //               {
  //               type: "input",
  //               inputType: "date",
  //               label: "Reminder Date",
  //               placeholder: "Enter you would like to be reminded",
  //               model: "reminder_date",
  //               validator: ["required"],
  //               pikadayOptions: {
  //                   position: "top left",
  //               },
  //               },
  //               {
  //               type: "input",
  //               inputType: "date",
  //               label: "Deadline Date",
  //               placeholder: "Enter Dead line for the task",
  //               model: "deadline_date",
  //               validator: ["required"],
  //               pikadayOptions: {
  //                   position: "top left",
  //               },
  //               },
  //               {
  //               type: "select",
  //               label: "Assigned To",
  //               model: "user_id",
  //               values: [],
  //               required: true,
  //               },
  //               {
  //               type: "select",
  //               label: "Status",
  //               model: "status",
  //               required: true,
  //               values: function() {
  //                   return [];
  //               },
  //               default: "en-US",
  //               validator: ["required"],
  //               },
  // ],
        // headers:task.fields, 
        // taskSchema: task.fields,
        // headers:, 
        // taskSchema: task.fields,
      };
    },
    
     created() {
      this.fetchTasks();
      console.log(task);
      },
  methods: {
      fetchTasks() {
       
        this.bw.GetPopulatedTable('tbl_task').then(
          function(res) {
            this.tasks = res ;
            console.log("Fetched Table", res);
          }.bind(this),
          function(err) {
            console.log("Fetched ", res); //this.showError();
          }.bind(this)
        );
      },
    },
}
</script>