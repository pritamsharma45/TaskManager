import schemaMixin from "../mixins/schemaMixin";
import mix from "../mixins/mix";
var schema =   { 
    table_name: "tbl_company_type",
    formTitle:"Add Company Type",
    listTitle:"All Companies",
    defaultModelData: {
    
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
          type: 'input',
          inputType: 'text',
          label: 'Company Type',
          model: 'company_type',
          required: true,
          validator: ['string', 'required'],
         
        },
      
        // {
        //   type: 'input',
        //   inputType: 'text',
        //   label: 'Status',
        //   model: 'status',
        //   required: true,
        //   validator: ['string']
        // },
    ]
  
}


const mixed = mix({}, schema, schemaMixin) ;

export default mixed ;
