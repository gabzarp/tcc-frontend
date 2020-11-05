<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-12">
        <label for="">Git</label><br>
        <input type="text" class="form-control mb-2" v-model="git.link">
        <button class="btn btn-primary" v-on:click="saveGit()">Salvar</button>
      </div>
      <div class="col-12">
        <label for="">Slack</label><br>
        <input type="text" class="form-control mb-2" v-model="slack.link">
        <button class="btn btn-primary" v-on:click="saveSlack()">Salvar</button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <h4>Solicitações:</h4>
      </div>
      <div class="col-10">
        <div class="row">
          <MemberCard v-for="(invite, index) of project.invites"
          :key="index" isSolicitation="true" :memberData="invite" projectData="project"></MemberCard>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4>Entregas:</h4>
      </div>
      <div class="col-12">
        <DueDateList/>
      </div>
    </div>
  </div>
</template>

<script>

import MemberCard from '../utils/MemberCard'
import DueDateList from '../utils/DueDateList'

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
    DueDateList
  },
  async mounted() {
    const projectRes = await this.axios.get(`project/${this.$route.params.id}`);
    this.project = projectRes.data;
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
      },
      async saveGit(){
        await this.axios.patch("/external-source", this.git);
      },
  }
}
</script>