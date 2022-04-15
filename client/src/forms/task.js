import VueFormGenerator from "vue-form-generator/dist/vfg";
import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";

const validators = VueFormGenerator.validators;

var schema = {
  table_name: "tbl_task",
  formTitle: "Create New Task",
  listTitle: "All Tasks",
  goBackTo: "/AllTasks",
  extraComponets: {
    showClientDetail: true,
  },
  defaultModelData: {
    status: "Pending",
  },
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
        filterOption: { fld: "status", value: "A" },
      },
      values: [],
      required: true,
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
      type: "input",
      inputType: "date",
      label: "Reminder Date",
      placeholder: "Enter you would like to be reminded",
      model: "reminder_date",
      required: false,
      validator: validators.required,
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
    //   type: "searchSelect",
    //   model: "library",
    //   label: "Libraries",
    //   placeholder: "Select your favorite library",
    //   renderFld: "name",
    //   options: [
    //     {
    //       name: "Vue.js",
    //       language: "JavaScript",
    //     },
    //     {
    //       name: "Rails",
    //       language: "Ruby",
    //     },
    //     {
    //       name: "Sinatra",
    //       language: "Ruby",
    //     },
    //   ],
    // },
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
