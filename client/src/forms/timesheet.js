import VueFormGenerator from "vue-form-generator/dist/vfg";
import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";
var schema =   {

  table_name: "tbl_timesheet",
  formTitle: "Create New Timesheet",
  listTitle: "All Timesheets",
  defaultModelData: {
    
  },

  // _loopThroughFields: function(fields, dropdownItems) {
  //   fields.forEach((fld) => {
  //     if (fld.model.endsWith("_id")) {
  //       console.log("Fields :", fld.model);
  //       if (typeof fld.provider === "undefined") {
  //         console.log("Fields without provider populated", fld.model);
  //         fld.values = dropdownItems[fld.model];
  //       } else {
  //         console.log("Provider Called for", fld.model);
  //         fld.provider();
  //       }
  //     }
  //   });
  // },
  // _populateSelectOptions: function(dropdownItems) {
  //   if (this.groups) {
  //     var groups = this.groups;
  //     groups.forEach((group) => {
  //       var fields = group.fields;
  //       this._loopThroughFields(fields, dropdownItems);
  //     });
  //   } else {
  //     this._loopThroughFields(this.fields, dropdownItems);
  //   }
  // },
  // populateDropdown: function() {
  //   google.script.run
  //     .withSuccessHandler((res) => {
  //       console.log("Items Fetched from GS", res);
  //       this._populateSelectOptions(res);
  //     })
  //     .withFailureHandler((error) => {
  //       console.log(error);
  //     })
  //     .getRelatedTablesByModel(this.model());
  // },
  // model: function() {
  //   var obj = {};
  //   if (this.fields) {
  //     this.fields.forEach((fld) => {
  //       obj[fld.model] = "";
  //     });
  //   } else {
  //     var groups = this.groups;
  //     groups.forEach((group) => {
  //       group.fields.forEach((fld) => {
  //         obj[fld.model] = "";
  //       });
  //     });
  //   }
  //   return obj;
  // },
  groups: [
    {
      legend: "General Details",
      fields: [
        {
          type: "select",
          label: "Client",
          model: "client_id",
          values: [],
          required: true,
        },
        {
          type: "select",
          values: [],
          label: "Activity ",
          model: "activity_type_id",
          required: true,
          styleClasses: "col-md-6",
        },
        {
          type: "select",
          values: [],
          provider: function() {
            google.script.run
              .withSuccessHandler((res) => {
                // console.log(res);
                this.values = res.map((o) => {
                  let v = {};
                  v.id = o.id;
                  v.name = `Client : ${o.client_id} | Task : ${o.task_type_id}`;
                  return v;
                });
                // this.values = options;
                // console.log("Populated Option in Tasks",options);
              })
              .withFailureHandler((error) => {
                console.log(error);
              })
              .GetPopulatedMainTable("tbl_task");
          },
          label: "Task ",
          model: "task_id",
          required: true,
          styleClasses: "col-md-6",
        },

        {
          type: "select",
          values: [],
          label: "Team",
          model: "user_id",
          required: true,
        },
      ],
    },
    {
      legend: "Job Details",
      fields: [
        {
          type: "input",
          inputType: "date",
          label: "Date",
          placeholder: "",
          model: "date",
          validator: ["required"],
          pikadayOptions: {
            position: "top left",
          },
          styleClasses: "col-md-3",
        },
        {
          type: "input",
          inputType: "number",
          label: "Hours",
          placeholder: "Hours",
          model: "hours",
          validator: ["required"],
          styleClasses: "col-md-2",
        },
        {
          type: "input",
          inputType: "number",
          label: "Minutes",
          placeholder: "Minutes",
          model: "minutes",
          validator: ["required"],
          styleClasses: "col-md-2",
        },
        {
          type: "input",
          inputType: "number",
          label: "Rate",
          placeholder: "Rate",
          model: "rate",
          validator: ["required"],
          styleClasses: "col-md-2",
        },
        {
          type: "input",
          inputType: "number",
          label: "Charge",
          placeholder: "Charge",
          model: "rate",
          validator: ["required"],
          styleClasses: "col-md-2",
        },
      ],
    },
  ],
};
 

const mixed = mix({}, schema, schemaMixin) ;

export default mixed ;
