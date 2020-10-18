<template>
  <div class="container">
    <div class="row pt-3">
      <div v-if="isLoading" class="m-auto"><img src="../../assets/loading.svg" alt="loading" ></div>
      <div
        class="col-3 bg-info p-2 m-2"
        v-for="(project, index) of projects"
        :key="index"
      >
        <h4 class="text-left">{{ project.name }}</h4>
        <h6 class="text-left">{{ "Dono" }}</h6>
        <div class="d-flex pb-2">
          <a
            class=" btn-primary px-4 py-1 mx-1 rounded border border-dark"
            href="#"
            >Git</a
          >
          <a
            class=" btn-primary px-4 py-1 mx-1 rounded border border-dark"
            href="#"
            >Slack</a
          >
          <a
            class=" btn-primary px-4 py-1 mx-1 rounded border border-dark"
            href="#"
            >Trello</a
          >
        </div>
        <div class="d-flex pb-2">
          <router-link
            class=" btn-primary px-4 py-1 mx-1 rounded border border-dark"
            :to="{ path: '/project/' + project._id }"
            >Ir ao projeto</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: true,
      projects: {},
    };
  },
  async mounted() {
    const projectRes = await this.axios.get("/projects");
    this.projects = projectRes.data;
    this.isLoading = false;
  },
};
</script>
