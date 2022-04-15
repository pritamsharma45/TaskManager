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
          disabled: true,
        },
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
        {
          type: "input",
          inputType: "file",
          label: "Client Attachments",
          id: "client_attachments",
          placeholder: "Choose client attachments",
          multiple: true,
          model: "attachments",
          required: false,
          validator: ["string", "required"],
        },
      ],
    },
  ],
};

const mixed = mix({}, schema, schemaMixin);

export default mixed;
