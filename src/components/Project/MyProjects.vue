<template>
  <div class="container">
    <div class="alert alert-success alert-dismissible fade show mt-2" role="alert" v-if="showMessage">
      Uma solicitação foi enviada para entrar no projeto.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="showMessage = false">
      <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="row pt-3">
      <div v-if="isLoading" class="m-auto"><img src="../../assets/loading.svg" alt="loading" ></div>
      <div
        class="col-4 bg-gray p-2 m-2"
        v-for="(project, index) of projects"
        :key="index"
      >
      
        <h4 class="text-left text-light">{{ project.name }}</h4>
        <!-- <h6 class="text-left">{{ project.owner.name }}</h6> -->
        <div class="d-flex pb-2">
          <a v-for="(external, index) of project.externalSources" :key="index"
            class=" btn-primary px-4 py-1 mx-1 rounded border border-dark" :href="external.link"
             target="_blank"
            >{{external.name}}</a
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
      showMessage: false,
      userId: this.$session.get('userId')
    };
  },
  async mounted() {
    const user = await this.axios.get("/user/"+this.userId);
    this.projects = user.data.projects.filter(project=>{
      if(project.isFinished == false){
        return project
      }
    })
    this.isLoading = false;
  },
  methods: {
    handleEnterProjectClick(){

      this.showMessage = true;
    }
  }
};
</script>
