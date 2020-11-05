<template>
  <div class="container">
    <div class="row">
      <div class=" pt-3 justify-content-center text-center mb-5 col-10">
        <h2>{{ project.name }}</h2>
        <h6 >{{ "Dono" }}</h6>
      </div>
      <div class="col-2" v-if="role == 'Scrum master'">
        <router-link :to="{path: `/project/${project._id}/settings`}" class="w-100">
          <img src="../../assets/settings.svg" alt="Configurações do projeto" class="m-5 img-fluid w-25">
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <h4>Descrição:</h4>
        <p>{{project.description}}</p>
      </div>
      <div class="pt-3 col-2 px-5">
      <a class="m-3 d-block px-2" :href="project.trello" target="_blank">
        <img class="img-fluid" src="../../assets/trello.svg"/>
      </a>
      <a class="m-3 d-block px-2" href="https://trello.com/b/gTkVjqiV/projeto-teste" target="_blank">
        <img class="img-fluid" src="../../assets/git.svg"/>
      </a>
      <a class="m-3 d-block px-2" href="https://trello.com/b/gTkVjqiV/projeto-teste" target="_blank">
        <img class="img-fluid" src="../../assets/slack.svg"/>
      </a>
    </div>
    </div>
    <div class="row">
      <div class="col-10">
        <h4>Membros:</h4>
        <div class="row">
          <memberCard v-for="(member, index) in project.members" :key="index" :member-data="member" :is-scrum-master="true" :project-data="project"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <h4>Entregas:</h4>
        <div class="row">
          <div class="col-4 p-2 border border-muted rounded-lg p-2 m-2" v-for="deadLine in deadLines" :key="deadLine._id">
            <div class="col-8">
              <h5>{{deadLine.name}}</h5>
              <p class="m-0">{{deadLine.description}}</p>
              <p class="font-weight-bold">{{new Date(deadLine.deadLine).toLocaleDateString()}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>


<script>
  import memberCard from '../utils/MemberCard'

  export default {

    data() {
      return {
        project: {},
        deadLines: [],
        role: this.$session.get('role'),

      };
    },
    components:{
      memberCard
    },
    async mounted() {
      const deadLineRes = await this.axios.get(`dead-lines/${this.$route.params.id}`)
      const projectRes = await this.axios.get(`project/${this.$route.params.id}`);
      this.project = projectRes.data;
      this.deadLines = deadLineRes.data;
    },
  };
</script>
