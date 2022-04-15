import VueFormGenerator from "vue-form-generator/dist/vfg";
import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";

var schema = {
  table_name: "tbl_client",
  formTitle: "Create New Client",
  listTitle: "All Clients",
  goBackTo: "/AllClients",
  defaultModelData: {
    status: "A",
  },

  fields: [
    {
      type: "input",
      inputType: "text",
      label: "Client Name",
      model: "client_name",
      required: true,
      validator: ["string"],
    },
    {
      type: "input",
      inputType: "email",
      label: "Email",
      model: "email",
      required: true,
      validator: VueFormGenerator.validators.email,
    },
    {
      type: "select",
      label: "Client Type",
      fieldOptions: {
        noneSelectedText: "Select client type",
      },
      selectOptions: {
        noneSelectedText: "Select client type",
        name: "company_type",
      },
      model: "company_type_id",
      values: [],
      required: true,
      validator: ["required"],
      name: "company_type",
    },
    {
      type: "input",
      inputType: "text",
      label: "Phone",
      model: "phone",
      required: false,
      validator: ["string", "required"],
    },

    {
      type: "textArea",
      inputType: "textArea",
      rows: 2,
      label: "Address",
      model: "address_1",
      required: false,
      validator: ["string"],
    },
    {
      type: "input",
      inputType: "text",
      label: "City",
      model: "city",
      required: false,
      validator: ["string"],
    },
    {
      type: "input",
      inputType: "text",
      label: "Post Code",
      model: "postcode",
      required: false,
      validator: ["string"],
    },
    {
      type: "select",
      label: "Status",
      model: "status",
      required: false,
      values: ["A", "D"],
      default: "A",
      visible: false,
    },

    // {
    //   type: "textArea",
    //   inputType: "textArea",
    //   rows: 4,
    //   label: "Address 2",
    //   model: "address_2",
    //   required: true,
    //   validator: ["string"],
    // },

    // {
    //   type: "input",
    //   inputType: "text",
    //   label: "Country",
    //   model: "country",
    //   required: true,
    //   validator: ["string"],
    // },
  ],

  // {
  //   legend: "Profile",
  //   fields: [
  //     // {
  //     //   type: "textArea",
  //     //   inputType: "textArea",
  //     //   rows: 4,
  //     //   label: "About",
  //     //   model: "about",
  //     //   required: true,
  //     //   validator: ["string", "required"],
  //     // },
  //     // {
  //     //   type: "checklist",
  //     //   label: "Type",
  //     //   model: "type",
  //     //   values: ["Self-Assessment", "Limited Co"],
  //     //   multiSelect: false,
  //     //   multi: true,
  //     //   required: true,
  //     //   validator: ["array", "required"],
  //     //   selectOptions: {
  //     //     noneSelectedText: "Choose One",
  //     //   },
  //     // },
  //   ],
  // },
};

const mixed = mix({}, schema, schemaMixin);

export default mixed;
