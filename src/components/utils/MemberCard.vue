<template>
  <div class="col-4 p-2">
    <div class="d-flex shadow border border-muted rounded-lg p-2 h-100">
      <div class="col-4">
        <img src="../../assets/avatar.svg" class="img-fluid rounded-circle">
      </div>
      <div class="col-8 text-light">
        <h5>{{memberData.user.name}}</h5>
        <p class="mb-1">{{memberData.position}}</p>
        <router-link class="btn btn-primary" v-if="isScrumMaster && memberData.position != 'Scrum master'" :to="{path: `/project/${projectData._id}/member-evaluation/${memberData._id}` }"> 
          Avaliar 
        </router-link>
          <div v-if="isSolicitation" class="d-flex py-2">
            <a href="#" class="btn btn-success text-decoration-none mr-2" v-on:click="accept(memberData.user._id)" >Aceitar</a>
            <a href="#" class="btn btn-danger text-decoration-none">Ignorar</a>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isScrumMaster', 'projectData', 'memberData', 'isSolicitation'],
  methods: {
      async accept(memberId) {
          try {
              await this.axios.post("/associate", {projectId: this.$route.params.id, userId: memberId});
              this.$router.back();
          } catch (error) {
              this.$router.back();
              console.log(error);
          }
      },
  }
}
</script>