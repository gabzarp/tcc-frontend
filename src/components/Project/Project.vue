<template>
  <div class="container">
    <div class="row">
      <div v-if="isLoading" class="m-auto"><img src="../../assets/loading.svg" alt="loading" ></div>
    </div>
    <div class="row">

      <div class="col-12">
      <div v-if="!isLoading" class="row">
        <div class=" pt-3 justify-content-center text-center mb-5 col-12 px-0">
          <h2 v-if="project.isFinished" class="text-danger">Este projeto está finalizado</h2>
          <h2 v-if="!project.isFinished && new Date(project.dueDate) < new Date()" class="text-danger">Este projeto está atrasado.</h2>
          <h2>{{ project.name }}</h2>
          <h6>{{ "Dono" }}</h6>
        </div>
      </div>
      <div v-if="!isLoading" class="row">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Descrição:</h4>
          <p class="mb-1">{{project.description}}</p>
        </div>
        <div class="col-12 px-0 py-2 text-dark mt-1">
          <h4 class="font-weight-bold">Escopo:</h4>
          <p class="mb-1">{{project.scope}}</p>
        </div>
      </div> 
      <div v-if="!isLoading" class="row border-bottom pb-4">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Membros:</h4>
          <div class="col-12 px-0 d-flex">
            <memberCard v-for="(member, index) in project.members" :key="index" :member-data="member" :is-scrum-master="role == 'Scrum master'" :project-data="project"/>
          </div>
        </div>
      </div>
      <div v-if="!isLoading" class="row pt-3">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Entregas:</h4>
          <div class="col-12 px-0 d-flex"  v-if="deadLines.length > 0">
            <div class="col-3 pl-0" v-for="deadLine in deadLines" :key="deadLine._id">

            <div class="col-12 bg-primary rounded-lg d-flex align-items-center justify-content-center py-2">
              <h6 class="mb-0 font-weight-bold font-size-11">{{remainingDays(deadLine)}}</h6>
            </div>
            <div class="col-12 p-2 border bg-white border-muted rounded-lg p-2" >
              <div class="col-12 px-3">
                <h5 class="pt-2 pb-2">{{deadLine.name}}</h5>
                <p class="m-0 font-size-11">DESCRIÇÃO:</p>
                <p class="m-0 mb-2">{{deadLine.description}}</p>
                <p class="m-0 font-size-11">DATA:</p>
                <p class="m-0">{{new Date(deadLine.deadLine).toLocaleDateString()}}</p>
                <p v-if="deadLine.finished == true" class="text-sucess">Finalizado</p>
                <button v-if="user_type == 'company' && deadLine.finished == false" class="btn btn-primary" @click="finishDeadLine(deadLine)">Finalizar</button>
              </div>
            </div>
            </div>
          </div>
            <span v-else>Não há entregas neste projeto.</span>
        </div>
      </div>
      <div v-if="!isLoading" class="row pt-3">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Custos:</h4>
          <div class="col-12 px-0 d-flex" v-if="expenses.length > 0">
            <div class="col-3 p-2 bg-white border border-muted rounded-lg" v-for="expense in expenses" :key="expense._id">
              <div class="col-8">
                <h5 class="pt-2 pb-2">{{expense.name}}</h5>
                <p class="m-0 font-size-11">DESCRIÇÃO:</p>
                <p class="m-0 mb-2">{{expense.description}}</p>
                <p class="m-0 font-size-11">CUSTO:</p>
                <p class="m-0 mb-2">{{expense.cost}}</p>
                <p class="m-0 font-size-11">DATA:</p>
                <p class="m-0">{{new Date(expense.date).toLocaleDateString()}}</p>
              </div>
            </div>
          </div>
            <span v-else>Não há custos neste projeto.</span>
        </div>
      </div>
      <div v-if="!isLoading" class="row pt-3 border-bottom pb-4">
        <div class="col-12 px-0 py-2 text-dark">
          <h4>Riscos:</h4>
          <div class="col-12 px-0 d-flex" v-if="risks.length > 0">
            <div class="col-3 p-2 bg-white border border-muted rounded-lg p-2" v-for="risk in risks" :key="risk._id">
              <div class="col-8">
                <h5 class="pt-2 pb-2">{{risk.name}}</h5>
                <p class="m-0 font-size-11">DESCRIÇÃO:</p>
                <p class="m-0 mb-2">{{risk.description}}</p>
                <p class="m-0 font-size-11">DATA:</p>
                <p class="m-0">{{new Date(risk.date).toLocaleDateString()}}</p>
              </div>
            </div>
          </div>
            <span v-else>Não há custos neste projeto.</span>
        </div>
      </div>
      <div v-if="!isLoading" class="row mt-3">
        <div class="col-12 px-0 py-2 text-dark">
          <h4>Justificação:</h4>
          <p>{{project.justification}}</p>
        </div>
        <div class="col-12 px-0 py-2 text-dark mt-2">
          <h4>Finalidade:</h4>
          <p>{{project.goal}}</p>
        </div>
        <div class="col-12 px-0 py-2 text-dark mt-2">
          <h4>Objetivos:</h4>
          <p>{{project.objectives}}</p>
        </div>
      </div>
      </div>
      <div class="col-2">
        <div class="pt-0 px-5">
          <h4>Links externos:</h4>
          <a v-for="(external, index) of project.externalSources" :key="index" class="m-3 d-block px-2" :href="external.link" target="_blank">
            <img class="img-fluid w-100" :src="require(`@/assets/${external.name}.svg`)"/>
          </a>
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
        expenses: [],
        role: this.$session.get('role'),
        isLoading: true,
        user_type: typeof this.$session.get('userType') !== 'undefined' ? this.$session.get('userType') : false
      };
    }, 
    components:{
      memberCard
    },
    async mounted() {
      const deadLineRes = await this.axios.get(`dead-lines/${this.$route.params.id}`)
      const expensesRes = await this.axios.get(`expenses/${this.$route.params.id}`)
      const risksRes = await this.axios.get(`risks/${this.$route.params.id}`)
      const projectRes = await this.axios.get(`project/${this.$route.params.id}`);
      this.project = projectRes.data;
      this.deadLines = deadLineRes.data;
      this.risks = risksRes.data;
      this.expenses = expensesRes.data;
      this.isLoading = false
    },
    methods: {
      isOnTime(dueDate){
        if(dueDate.finished){
          return true;
        }
        return !(new Date(dueDate.dueDate) < new Date()) 
      },
      finishDeadLine(deadLine){
        deadLine.finished = true;
        this.axios.patch(`dead-line`, deadLine);
      },
      remainingDays(deadLine){
        let dt2 = new Date(deadLine.deadLine)
        let dt1 = new Date();
        let dateDiff = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        if(deadLine.finished){
          return "FINALIZADO"
        }
        else if(dateDiff > 0){
          return "FALTAM " + dateDiff + " DIAS"
        }
        else{
          return "ATRASADO FAZEM " + Math.abs(dateDiff) + " DIAS"
        }
      },
    }
  };
</script>
