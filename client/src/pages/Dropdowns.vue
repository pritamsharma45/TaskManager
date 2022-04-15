<template>
  <div class="us">
  <h6>Configuration</h6>
    <ManageDropDownNav/>
    <!-- <router-view></router-view> -->
</div>
</template>

<script>
import ManageDropDownNav from "./ManageDropDownNav.vue";
export default {
    name:'Dropdowns',
     components: { ManageDropDownNav }
}
</script>
