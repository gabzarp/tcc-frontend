<template>
  <div class="container">
    <div class="row justify-content-center">
      <div v-if="isLoading" class="m-auto"><img src="../../../assets/loading.svg" alt="loading" ></div>

      <div v-if="!isLoading" class="col-4 mt-3 text-light">
        <div class="py-3 px-3 bg-gray">  
          <h4>Comunicação</h4>
          <ul class="pl-0">
            <li :key="index" class="border-top py-2" v-for="(communication, index) of communications"><b>{{(index + 1)}}:</b> {{communication.name}}. Nota: {{communication.communication}}</li>
          </ul>
        </div>
      </div>
      <div v-if="!isLoading" class="col-4 mt-3 text-light">
        <div class="py-3 px-3 bg-gray">  
          <h4>Conhecimento técnico</h4>
          <ul class="pl-0">
            <li :key="index" class="border-top py-2" v-for="(technicalKnowledge, index) of technicalKnowledges"><b>{{(index + 1)}}:</b> {{technicalKnowledge.name}}. Nota: {{technicalKnowledge.technicalKnowledge}}</li>
          </ul>
        </div>
      </div>
      <div v-if="!isLoading" class="col-4 mt-3 text-light">
        <div class="py-3 px-3 bg-gray">  
          <h4>Entrega no prazo</h4>
          <ul class="pl-0">
            <li :key="index" class="border-top py-2" v-for="(dueDate, index) of dueDates"><b>{{(index + 1)}}:</b> {{dueDate.name}}. Nota: {{dueDate.dueDate}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>  
</template>
  
<script>
  export default {
    data() {
      return {
        members: [],
        communications : [],
        technicalKnowledges: [],
        dueDates: [],
        isLoading: true,

      };
    },
    async mounted() {
      const memberRes = await this.axios.get("/members");
      this.members = memberRes.data;
      this.members = this.members.map((member)=>{
        var dueDate = member.evaluations.map(evaluation=>{
          if(evaluation.type.name == 'dueDate')
            return evaluation.score
        })
        dueDate = dueDate.filter(evaluation=>{
          return typeof evaluation !== 'undefined'
        })
        var communication = member.evaluations.map(evaluation=>{
          if(evaluation.type.name == 'communication')
            return evaluation.score
        })
        communication = communication.filter(evaluation=>{
          return typeof evaluation !== 'undefined'
        })
        var technicalKnowledge = member.evaluations.map(evaluation=>{
          if(evaluation.type.name == 'technicalKnowledge')
            return evaluation.score
        })
        technicalKnowledge = technicalKnowledge.filter(evaluation=>{
          return typeof evaluation !== 'undefined'
        })
        dueDate = dueDate.reduce((a, b) => a + b, 0) / dueDate.length
        communication = communication.reduce((a, b) => a + b, 0) / communication.length
        technicalKnowledge = technicalKnowledge.reduce((a, b) => a + b, 0) / technicalKnowledge.length

        return{
          name: member.user.name,
          dueDate: dueDate,
          communication: communication,
          technicalKnowledge: technicalKnowledge
        }
      })
      var members = this.members.filter(member=>{
        return !isNaN(member.dueDate)
      })
      this.dueDates =  [...members].sort((a,b)=>{
        return b.dueDate - a.dueDate
      })
      this.communications = [...members].sort((a,b)=>{
        return b.communication - a.communication
      })
      this.technicalKnowledges = [...members].sort((a,b)=>{
        return b.technicalKnowledge - a.technicalKnowledge
      })
      this.isLoading = false
      console.log(this.members)
    }
  };
</script>