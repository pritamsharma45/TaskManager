<template>
  <div class="us">
  <h3>Configuration</h3>
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
