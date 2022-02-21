import VueFormGenerator from "vue-form-generator/dist/vfg";
import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";

var schema = {
  table_name: "tbl_client",
  formTitle: "Create New Client",
  listTitle: "All Clients",
  defaultModelData: {},
  groups: [
    {
      legend: "Personal Info",
      fields: [
        {
          type: "input",
          inputType: "text",
          label: "Client Name",
          model: "client_name",
          required: true,
          validator: ["string"],
          // buttons: [
          //   {
          //     classes: "btn btn-secondary btn-sm",
          //     label: "Show Client",
          //     onclick: () => {
          //       this.clickMe();
          //     },
          //   },
          // ],
        },

        {
          type: "textArea",
          inputType: "textArea",
          rows: 4,
          label: "Address 1",
          model: "address_1",
          required: true,
          validator: ["string"],
        },
        {
          type: "textArea",
          inputType: "textArea",
          rows: 4,
          label: "Address 2",
          model: "address_2",
          required: true,
          validator: ["string"],
        },
        {
          type: "input",
          inputType: "text",
          label: "City",
          model: "city",
          required: true,
          validator: ["string"],
        },
        {
          type: "input",
          inputType: "text",
          label: "Country",
          model: "country",
          required: true,
          validator: ["string"],
        },
        {
          type: "input",
          inputType: "text",
          label: "Post Code",
          model: "postcode",
          required: true,
          validator: ["string"],
        },
      ],
    },
    {
      legend: "Contact Details",
      fields: [
        {
          type: "input",
          inputType: "email",
          label: "Email",
          model: "email",
          required: true,
          validator: VueFormGenerator.validators.email,
        },
        {
          type: "input",
          inputType: "text",
          label: "Phone",
          model: "phone",
          required: true,
          validator: ["string", "required"],
        },
      ],
    },
    {
      legend: "Profile",
      fields: [
        // {
        //   type: "textArea",
        //   inputType: "textArea",
        //   rows: 4,
        //   label: "About",
        //   model: "about",
        //   required: true,
        //   validator: ["string", "required"],
        // },
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
        // {
        //   type: "checklist",
        //   label: "Type",
        //   model: "type",
        //   values: ["Self-Assessment", "Limited Co"],
        //   multiSelect: false,
        //   multi: true,
        //   required: true,
        //   validator: ["array", "required"],
        //   selectOptions: {
        //     noneSelectedText: "Choose One",
        //   },
        // },
      ],
    },
  ],
};

const mixed = mix({}, schema, schemaMixin);

export default mixed;
