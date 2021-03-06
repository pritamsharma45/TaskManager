import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";

var schema = {
  table_name: "tbl_user",
  formTitle: "Add User",
  listTitle: "Users",
  defaultModelData: {},
  fields: [
    {
      type: "input",
      inputType: "text",
      label: "User",
      model: "user",
      required: true,
      validator: ["string", "required"],
    },

    // {
    //   type: "input",
    //   inputType: "text",
    //   label: "Status",
    //   model: "status",
    //   required: true,
    //   validator: ["string"],
    // },
  ],
};

const mixed = mix({}, schema, schemaMixin);

export default mixed;
