import VueFormGenerator from "vue-form-generator/dist/vfg";
import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";
const validators = VueFormGenerator.validators;

var schema = {
  table_name: "tbl_client_notes",
  formTitle: "Update Client Notes",
  listTitle: "Client Notes",
  defaultModelData: {},

  groups: [
    {
      legend: "Client Notes",
      fields: [
        {
          type: "input",
          inputType: "date",
          label: "Date",
          placeholder: "",
          model: "note_date",
          validator: ["required"],
          pikadayOptions: {
            position: "top left",
          },
        },
        {
          type: "textArea",
          inputType: "textArea",
          rows: 2,
          label: "Notes",
          model: "notes",
          required: true,
          validator: ["string", "required"],
        },
      ],
    },
  ],
};

const mixed = mix({}, schema, schemaMixin);

export default mixed;
