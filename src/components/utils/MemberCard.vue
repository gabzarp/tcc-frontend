<template>
  <div class="col-4 pr-2 pl-0">
    <div class="d-flex bg-white border border-muted rounded-lg p-2 h-100">
      <div class="col-4 ">
        <img src="../../assets/avatar.svg" class="img-fluid rounded-circle">
      </div>
      <div class="col-8 text-dark pt-2">
        <h5>{{memberData.user.name}}</h5>
        <p class="mb-1">{{memberData.position}}</p>
          <div v-if="!isScrumMaster">Prazo: {{dueDate}}</div>
          <div v-if="!isScrumMaster">Comunicação: {{communication}}</div>
          <div v-if="!isScrumMaster">Conhecimento técnico: {{technicalKnowledge}}</div>
          <router-link class="text-yellow" v-if="isScrumMaster && memberData.position != 'Scrum master'" :to="{path: `/project/${projectData._id}/member-evaluation/${memberData._id}` }"> 
            Avaliar 
          </router-link>
          <a href="javascript:void(0)" v-if="isScrumMaster && memberData.position != 'Scrum master'" class="text-yellow pl-3" @click="downloadFile">
            Baixar currículo
          </a>
          <div v-if="isSolicitation" class="d-flex py-2">
            <a href="javascript:void(0)" class="btn btn-success text-decoration-none mr-2" v-on:click="accept(memberData.user._id)" >Aceitar</a>
            <a href="javascript:void(0)" class="btn btn-danger text-decoration-none">Ignorar</a>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      dueDate: '',
      communication: '',
      technicalKnowledge: ''
    }
  },
  props: ['isScrumMaster', 'projectData', 'memberData', 'isSolicitation'],
  async mounted() {
    var dueDate = this.memberData.evaluations.map(evaluation=>{
    if(evaluation.type == '5f8cc48101fca84044fccbe9')
        return evaluation.score
    })
    dueDate = dueDate.filter(evaluation=>{
      return typeof evaluation !== 'undefined'
    })
    var communication = this.memberData.evaluations.map(evaluation=>{
      if(evaluation.type == '5f8ce42b01fca84044fccbea')
        return evaluation.score
    })
    communication = communication.filter(evaluation=>{
      return typeof evaluation !== 'undefined'
    })
    var technicalKnowledge = this.memberData.evaluations.map(evaluation=>{
      if(evaluation.type == '5f8ce43e01fca84044fccbeb')
        return evaluation.score
    })
    technicalKnowledge = technicalKnowledge.filter(evaluation=>{
      return typeof evaluation !== 'undefined'
    })
    this.dueDate = dueDate.reduce((a, b) => a + b, 0) / dueDate.length
    this.communication = communication.reduce((a, b) => a + b, 0) / communication.length
    this.technicalKnowledge = technicalKnowledge.reduce((a, b) => a + b, 0) / technicalKnowledge.length
  },
  methods: {
      async accept(memberId) {
          try {
              await this.axios.post("/associate", {projectId: this.$route.params.id, userId: memberId});
             
              await this.axios.get("/associate", {projectId: this.$route.params.id, userId: memberId});
              this.$router.back();
          } catch (error) {
              this.$router.back();
              console.log(error);
          }
      },
      async downloadFile() {                          
          let res = await this.axios.get(`/member-file/${this.memberData._id}`, {responseType: 'blob'})
          let fileURL = window.URL.createObjectURL(new Blob([res.data]));                
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', `curriculo-${this.memberData.user.name}.pdf`);
          document.body.appendChild(fileLink);
          fileLink.click();
      }      
  }
}
</script>