<template>
  <div class="container mt-4">
    <div class="row bg-gray">
      <div class="col-12">
        <button class="btn btn-lg btn-primary my-2" @click="finishProject()">
          Finalizar projeto
        </button>
      </div>
      <div class="col-12 py-2">
        <label class="text-light" for="">Git</label><br>
        <input type="text" class="form-control mb-2" v-model="git.link">
        <button class="btn btn-primary" @click="saveGit()">Salvar</button>
      </div>
      <div class="col-12 py-2">
        <label class="text-light" for="">Slack</label><br>
        <input type="text" class="form-control mb-2" v-model="slack.link">
        <button class="btn btn-primary" @click="saveSlack()">Salvar</button>
      </div>
    </div>
    <div class="row bg-gray mt-2">
      <div class="col-12">
        <h4 class="text-light py-2 mb-0">Solicitações:</h4>
      </div>
      <div class="col-12 pb-2">
        <div v-if="project.invites.length > 0">
          <MemberCard v-for="(invite, index) of project.invites"
          :key="index" isSolicitation="true" :memberData="invite" :projectData="project"></MemberCard>
        </div>
        <span v-else>Não existem solicitações para este projeto</span>
      </div>
    </div>
    <div class="row py-3 bg-gray mt-2 mb-3">
      <div class="col-12">
        <h4 class="text-light">Entregas:</h4>
      </div>
      <div class="col-12">
        <DueDateList/>
      </div>
    </div>
    <div class="row py-3 bg-gray mt-2 mb-3">
      <div class="col-12">
        <h4 class="text-light">Custos:</h4>
      </div>
      <div class="col-12">
        <ExpensesList/>
      </div>
    </div>
    <div class="row py-3 bg-gray mt-2 mb-3">
      <div class="col-12">
        <h4 class="text-light">Riscos:</h4>
      </div>
      <div class="col-12">
        <RisksList/>
      </div>
    </div>
  </div>
</template>

<script>

import MemberCard from '../utils/MemberCard'
import ExpensesList from '../utils/ExpensesList'
import DueDateList from '../utils/DueDateList'
import RisksList from '../utils/RisksList'

export default {
  data(){
    return {
      project: {},
      slack: {
        name: 'slack',
        link: ''
      },
      git:{
        name: 'git',
        link: ''
      }
    };
  },
  components: {
    MemberCard,
    DueDateList,
    ExpensesList,
    RisksList
  },
  async mounted() {
    const projectRes = await this.axios.get(`project/${this.$route.params.id}`);
    this.project = projectRes.data;
    console.log(this.project)
    this.project.externalSources.forEach(external => {
      if (external.name == 'slack') {
        this.slack.link = external.link
      }
      else if (external.name == 'git'){
        this.git.link = external.link
      }
    });
  },
  methods: {
      async saveSlack(){
        await this.axios.patch("/external-source", this.slack);
        this.$router.back();
      },
      async saveGit(){
        await this.axios.patch("/external-source", this.git);
        this.$router.back();
      },
      async finishProject(){
        this.project.isFinished = true
        await this.axios.patch("/project", this.project)
        this.$router.push({ name: 'my-projects' });
      }
  }
}
</script>