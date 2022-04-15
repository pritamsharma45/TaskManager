import VueFormGenerator from "vue-form-generator/dist/vfg";
import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";
const validators = VueFormGenerator.validators;
var schema = {
  table_name: "tbl_timesheet",
  formTitle: "Create New Timesheet Entry",
  listTitle: "All Timesheets",
  goBackTo: "/AllTimesheets",
  defaultModelData: {
    invoiced: "N",
  },
  compute: {
    fld: "charge",
    els: ["hours", "minutes", "rate"],
    methodName: "getCharge",
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
          type: "select",
          label: "Client",
          model: "client_id",
          fieldOptions: {
            noneSelectedText: "Select client",
          },
          selectOptions: {
            noneSelectedText: "Select client",
            name: "client_name",
            filterOption: { fld: "status", value: "A" },
          },
          values: [],
          required: true,
          validator: validators.required,
          styleClasses: "col-md-5",
        },
        {
          type: "select",
          label: "Employee",
          model: "user_id",
          fieldOptions: {
            noneSelectedText: "Select employee",
          },
          selectOptions: {
            noneSelectedText: "Select employee",
            name: "user",
          },
          values: [],
          required: true,
          validator: ["required"],
          styleClasses: "col-md-4",
        },
        {
          type: "select",
          values: [],
          label: "Activity ",
          model: "activity_type_id",
          fieldOptions: {
            noneSelectedText: "Select activity",
          },
          selectOptions: {
            noneSelectedText: "Select activity",
            name: "activity_type",
          },
          required: true,
          validator: validators.required,
          styleClasses: "col-md-6",
        },
        {
          type: "select",
          values: [],
          label: "Task Type",
          model: "task_type_id",
          fieldOptions: {
            noneSelectedText: "Select task",
          },
          selectOptions: {
            noneSelectedText: "Select task",
            name: "task_type",
          },
          required: true,
          validator: validators.required,
          styleClasses: "col-md-6",
        },
        {
          type: "input",
          inputType: "text",
          label: "",
          placeholder: "",
          model: "invoiced",
          validator: ["required"],
          styleClasses: "col-md-3",
          visible: false,
        },
        // {
        //   type: "select",
        //   values: [],
        //   fieldOptions: {
        //     noneSelectedText: "Select task",
        //   },
        //   selectOptions: {
        //     noneSelectedText: "Select task",
        //     name: "task_type_id",
        //     renderFld: { fld: "task_type_id", with: "task_type" },
        //   },
        //   // provider: function() {
        //   //   google.script.run
        //   //     .withSuccessHandler((res) => {
        //   //       // console.log(res);
        //   //       this.values = res.map((o) => {
        //   //         let v = {};
        //   //         v.id = o.id;
        //   //         v.name = `Client : ${o.client_id} | Task : ${o.task_type_id}`;
        //   //         return v;
        //   //       });
        //   //       // this.values = options;
        //   //       // console.log("Populated Option in Tasks",options);
        //   //     })
        //   //     .withFailureHandler((error) => {
        //   //       console.log(error);
        //   //     })
        //   //     .GetPopulatedMainTable("tbl_task");
        //   // },
        //   label: "Task ",
        //   model: "task_id",
        //   required: true,
        //   styleClasses: "col-md-6",
        // },

        {
          type: "select",
          label: "Invoiced",
          model: "invoiced",
          required: false,
          values: ["Yes", "No"],
          default: "No",
          visible: false,
        },
      ],
    },
    {
      legend: "Job Details",
      fields: [
        {
          type: "input",
          inputType: "number",
          label: "Hours",
          placeholder: "",
          model: "hours",
          validator: ["required"],
          styleClasses: "col-md-2",
        },
        {
          type: "input",
          inputType: "number",
          label: "Minutes",
          placeholder: "",
          model: "minutes",
          validator: ["required"],
          styleClasses: "col-md-2",
        },
        {
          type: "input",
          inputType: "number",
          label: "Rate",
          placeholder: "",
          model: "rate",
          validator: ["required"],
          styleClasses: "col-md-2",
        },
        {
          type: "input",
          inputType: "number",
          label: "Charge",
          placeholder: "",
          model: "charge",
          validator: ["required"],
          disabled: true,
          styleClasses: "col-md-2",
        },
        {
          type: "textArea",
          inputType: "textArea",
          rows: 1,
          label: "Comments",
          model: "comments",
          required: true,
          validator: ["string", "required"],
        },
      ],
    },
  ],
};

const mixed = mix({}, schema, schemaMixin);

export default mixed;
