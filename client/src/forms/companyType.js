import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";
var schema = {
  table_name: "tbl_company_type",
  formTitle: "",
  listTitle: "All Companies",
  defaultModelData: {},

  fields: [
    {
      type: "input",
      inputType: "text",
      label: "Company Type",
      model: "company_type",
      required: true,
      validator: ["string", "required"],
    },

    // {
    //   type: 'input',
    //   inputType: 'text',
    //   label: 'Status',
    //   model: 'status',
    //   required: true,
    //   validator: ['string']
    // },
  ],
};

const mixed = mix({}, schema, schemaMixin);

export default mixed;
