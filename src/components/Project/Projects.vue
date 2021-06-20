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
        class="col-4 pb-2 px-1"
        v-for="(project, index) of projects"
        :key="index"
      >
        <div class="col-12 p-2 bg-white border">
          <h4 class="text-left text-dark">{{ project.name }}</h4>
          <h6 class="text-left text-dark">Empresa: {{ project.owner.name }}</h6>
          <div class="d-flex flex-column py-2">            
            <router-link
              class=" text-yellow"
              :to="{ path: '/project/' + project._id }"
              >Ir ao projeto</router-link
            >
            <a 
              class=" text-yellow"
              href="#" @click="handleEnterProjectClick(project._id)" v-if="role != 'Scrum master'"
              >Entrar</a>
            <a 
              class=" text-yellow"
              href="#" @click="handleGetProjectClick(project._id)"  v-if="role == 'Scrum master'"
              >Pegar projeto</a>
          </div>
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
      user_type: this.$session.get('userType'),
      role: this.$session.get('role')
    };
  },
  async mounted() {
    const projectRes = await this.axios.get("/projects");
    this.projects = projectRes.data.filter(project =>{
      if (((this.role == 'Scrum master' && !project.taken) || (this.role != 'Scrum master')) && !project.isFinished) {
        return project;
      }
    })
    this.isLoading = false;
  },
  methods: {
    async handleEnterProjectClick(projectId){
      await this.axios.post("/invite", {projectId: projectId, userId: this.$session.get('expecificId')});
    },
    async handleGetProjectClick(projectId){
      await this.axios.post("/project-start", {projectId: projectId, userId: this.$session.get('userId')});
    },
  }
};
</script>
