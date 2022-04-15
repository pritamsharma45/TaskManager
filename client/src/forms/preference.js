import VueFormGenerator from "vue-form-generator/dist/vfg";
import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";
const validators = VueFormGenerator.validators;
var schema = {
  table_name: "tbl_preference",
  formTitle: "Edit your preferneces",
  listTitle: "All Prefernces",
  goBackTo: "/AllTasks",
  defaultModelData: {},
  groups: [
    {
      legend: "General Details",
      fields: [
        {
          type: "input",
          inputType: "text",
          label: "Company Name",
          placeholder: "Your Company Name",
          model: "company_name",
          validator: ["required"],
          styleClasses: "col-md-6",
        },
        {
          type: "input",
          inputType: "textarea",
          label: "Company Name",
          placeholder: "Your Company Address",
          model: "company_address",
          validator: ["required"],
          styleClasses: "col-md-6",
        },
        {
          type: "input",
          inputType: "text",
          label: "LOGO URL",
          placeholder: "",
          info:
            "The logo should be stored in your Google Drive and it must be public. You can get the URL by clicking on Get Link.",
          model: "logo_url",
          validator: ["required"],
          styleClasses: "col-md-6",
        },
        {
          type: "select",
          label: "Locale",
          model: "locale",
          placeholder: "",
          required: true,
          values: function() {
            return ["en-GB", "en-US", "de-DE"];
          },
          default: "en-US",
          validator: ["required"],
          styleClasses: "col-md-6",
        },
        {
          type: "select",
          label: "Currency",
          model: "currency",
          placeholder: "",
          required: true,
          values: function() {
            return ["GBP", "USD", "EUR"];
          },
          default: "GBP",
          validator: ["required"],
          styleClasses: "col-md-6",
        },
      ],
    },

    {
      legend: "Account Details",
      fields: [
        {
          type: "input",
          inputType: "text",
          label: "Label for Registration No",
          placeholder: "eg. VAT Reg No",
          model: "label_reg_no",
          validator: ["required"],
          styleClasses: "col-md-6",
        },

        {
          type: "select",
          label: "Tax Type",
          model: "tax_type",
          required: false,
          values: ["Sales Tax", "VAT"],
          default: "No",
          visible: true,
        },
        {
          type: "input",
          inputType: "text",
          label: "Acc No",
          placeholder: "Acc No",
          model: "acc_no",
          validator: ["required"],
          styleClasses: "col-md-6",
        },
        {
          type: "input",
          inputType: "text",
          label: "Registration No",
          placeholder: "VAT Reg No",
          model: "reg_no",
          validator: ["required"],
          styleClasses: "col-md-6",
        },
      ],
    },
    {
      legend: "Invoice Preferences",
      fields: [
        {
          type: "input",
          inputType: "text",
          label: "Invoice Fotter Line 1",
          placeholder: "Invoice Footer Line 1",
          model: "line1",
          validator: ["required"],
          styleClasses: "col-md-12",
        },
        {
          type: "input",
          inputType: "text",
          label: "Invoice Fotter Line 2",
          placeholder: "Invoice Footer Line 2",
          model: "line2",
          validator: ["required"],
          styleClasses: "col-md-12",
        },
        {
          type: "input",
          inputType: "text",
          label: "Invoice Fotter Line 3",
          placeholder: "Invoice Footer Line 3",
          model: "line3",
          validator: ["required"],
          styleClasses: "col-md-12",
        },
      ],
    },
  ],
};

const mixed = mix({}, schema, schemaMixin);

export default mixed;
