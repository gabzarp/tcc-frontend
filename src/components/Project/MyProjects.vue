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
        class="col-4 px-1 pb-2"
        v-for="(project, index) of projects"
        :key="index"
      >
        <div class="col-12 p-2 bg-white border">
          <h4 class="text-left text-dark">{{ project.name }}</h4>
          <h6 class="text-left text-dark mb-0">{{ project.owner.name }}</h6>
          <div class="d-flex flex-column py-2">            
            <div v-for="(external, index) of project.externalSources" :key="index">
              <a v-if="user_type != 'company'" class=" text-yellow" :href="external.link" target="_blank">
                {{external.name}}
              </a>
            </div>
            <router-link
              class=" text-yellow"
              :to="{ path: '/project/' + project._id }"
              >Ir ao projeto</router-link
            >
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
      userId: this.$session.get('userId'),
      user_type: typeof this.$session.get('userType') !== 'undefined' ? this.$session.get('userType') : false
    };
  },
  async mounted() {
    const user = await this.axios.get("/user/"+this.userId);
    this.projects = user.data.projects
    this.isLoading = false;
  },
  methods: {
    handleEnterProjectClick(){

      this.showMessage = true;
    }
  }
};
</script>
