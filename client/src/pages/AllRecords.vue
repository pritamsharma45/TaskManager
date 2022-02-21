<template>

<nav class="card">
   <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="true"></b-loading>
      <div class="card-content">
         <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="true"></b-loading>
         <p class="title is-4">All Records</p>
              <section>
                  <!-- <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="true"></b-loading> -->
                  <b-tabs v-model="activeTab">
                    <template  v-for="(tbl,tblName,index) in tbls" >
                      <b-tab-item :id="tblName" :value="tblName" :key="index" :label="tblName | capitalize">
                       <div class="content">
                           <b-table class="myTable is-size-7" style="width:100% ;"  :data="tbl.items" :columns="tbl.columns"  :selected.sync="selected" @click="rowClicked" scrollable focusable>
                           
                          </b-table>
                        </div>
                         
                      </b-tab-item>
                    </template>
                  </b-tabs>
              </section>
             
            </div>

 </nav>

</template>

<script>

import GASBackEnd from "../services/GASBackEnd";

export default {
    name:"AllRecords",
    data: function (){
            return{
                bw: new GASBackEnd(),
                activeTab: "PRF_Records",
                tbls:{}, 
                selected : null,
                isLoading: false,      
            }
        },
  computed: {
            selectedObject: function() {

                return JSON.stringify(this.selected);

            },
        },
        mounted: function(){
             this.openLoading();
          this.bw.
            GetTables()
          .then(
            function (res) {
               this.isLoading = false;
                console.log(res);
                 this.tbls = res ;
            }.bind(this),
            function (err) {
              console.log("Updated", res); //this.showError();
            }.bind(this)
          );
        },
        methods:{
           openLoading() {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 10 * 1000);
            },
          rowClicked(row){
            // console.log("Clicked",row);
            let f_num = row.Form_number ;
            let record_type = '' ;
            if (this.activeTab === "PRF_Records") {
              record_type = 'PRF' 
            }else{record_type = 'SRF'}

            this.$router.push({ name: 'GeneralDetail', params: { req: row ,record_type:record_type,form_number:f_num} });
          }
          
        },
         filters: {
                capitalize: function(value) {
                    if (!value) return ''
                    value = value.toString()
                    value = _.startCase(value)
                    return value.toString()
                }
            }

}
</script>