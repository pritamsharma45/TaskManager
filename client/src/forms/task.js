import VueFormGenerator from "vue-form-generator/dist/vfg";
import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";

const validators = VueFormGenerator.validators;

var schema = {
  table_name: "tbl_task",
  formTitle: "Create New Task",
  listTitle: "All Tasks",
  extraComponets: {
    showClientDetail: true,
  },
  defaultModelData: {
    status: "Pending",
  },

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
  fields: [
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
      },
      values: [],
      // buttons: [
      //   {
      //     classes: "btn btn-secondary btn-sm",
      //     label: "Show Client",
      //     onclick: () => {
      //       this.clickMe();
      //     },
      //   },
      // ],
      required: true,
      // validator: ["required"],
      validator: validators.required,
    },
    {
      type: "select",
      values: [],
      label: "Task Type",
      model: "task_type_id",
      fieldOptions: {
        noneSelectedText: "Select task type",
      },
      selectOptions: {
        noneSelectedText: "Select task type",
        name: "task_type",
      },
      required: true,
      validator: validators.required,
    },
    {
      type: "select",
      values: [],
      label: "Periodicity",
      model: "periodicity_id",
      fieldOptions: {
        noneSelectedText: "Select periodicity",
      },
      selectOptions: {
        noneSelectedText: "Select periodicity",
        name: "periodicity",
      },
      required: true,
      validator: validators.required,
    },
    {
      type: "input",
      inputType: "date",
      label: "Reminder Date",
      placeholder: "Enter you would like to be reminded",
      model: "reminder_date",
      required: true,
      validator: validators.required,
      pikadayOptions: {
        position: "top left",
      },
    },
    {
      type: "input",
      inputType: "date",
      label: "Deadline Date",
      placeholder: "Enter Dead line for the task",
      model: "deadline_date",
      required: true,
      validator: ["required"],
      pikadayOptions: {
        position: "top left",
      },
    },
    {
      type: "select",
      label: "Assigned To",
      model: "user_id",
      fieldOptions: {
        noneSelectedText: "Select employee",
      },
      selectOptions: {
        noneSelectedText: "Select assigned staff",
        name: "user",
      },
      values: [],
      required: true,
      validator: ["required"],
    },
    {
      type: "select",
      label: "Status",
      model: "status",
      required: false,
      values: ["Pending", "Completed"],
      default: "Pending",
      visible: false,
    },
    // {
    // 	type: "submit",
    // 	label: "",
    // 	disabled() {
    // 		// console.log("Disabled: ", this.errors.length > 0);
    // 		return this.errors.length > 0;
    // 	},
    // 	fieldClasses: "half-width",
    // 	fieldOptions: {
    // 		buttonText: "Submit form",
    // 		validateBeforeSubmit: true,
    // 		onSubmit() {
    // 			console.log("Form submitted!");
    // 			alert("Form submitted!");
    // 		}
    // 	}
    // },
  ],
};

const mixed = mix({}, schema, schemaMixin);

export default mixed;
