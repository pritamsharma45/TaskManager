<template>
  <div>
    <b-jumbotron
      jumbotron-fluid
      lead="Download Links"
      class="text-responsive-darkSpringGreen gradient-lightalgalgreen"
      style="width:100vw;"
    >
      <hr />

      <b-list-group style="max-width: 300px;">
        <b-list-group-item
          variant="success"
          class="d-flex align-items-center"
          action
          :href="item.downloadURL"
          v-for="item in downloadLinks"
          target="_blank"
        >
          <b-avatar variant="info" icon="download" class="mr-3"></b-avatar>
          <span class="mr-auto">{{ item.name }}</span>
        </b-list-group-item>
      </b-list-group>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  name: "Downloads",
  data() {
    return {
      downloadLinks: [],
    };
  },
  mounted() {
    google.script.run.withSuccessHandler(this.onSuccess).getDownloadLinks();
  },
  methods: {
    onSuccess(res) {
      this.downloadLinks = res;
      console.log("Download", res);
    },
  },
};
</script>
