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
          <input type="text" class="form-control" v-model="project.description">
        </div>
        <div class="col-12 px-0 py-2 text-dark mt-1">
          <h4 class="font-weight-bold">Escopo:</h4>
          <input type="text" class="form-control" v-model="project.scope">
        </div>
      </div> 
      <div v-if="!isLoading" class="row border-bottom pb-4">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Solicitações de entrada:</h4>
          <div class="col-12 px-0 d-flex" v-if="project.invites.length > 0">
            <MemberCard v-for="(invite, index) of project.invites"
            :key="index" isSolicitation="true" :memberData="invite" :projectData="project"></MemberCard>
          </div>
          <span v-else>Não há usuários aplicantes nesse projeto.</span>
        </div>
      </div>
      <div v-if="!isLoading" class="row pt-3">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Entregas:</h4>
          <div class="pb-3">
            <a href="javascript:void(0)" class="text-yellow h5 pb-3" v-on:click="$modal.show('entrega')"> Adicionar entrega</a>
          </div>
          <modal name="entrega" height="auto">
            <div class="col-12 pt-4">
              <h4 class="pb-2">Nova entrega</h4>
              <p class="m-0">Nome:</p>
              <input type="text" class="form-control mb-2" v-model="newDeadLine.name">
              <p class="m-0">Descrição:</p>
              <input type="text" class="form-control mb-2" v-model="newDeadLine.description">
              <p class="m-0">Data:</p>
              <input type="date" class="form-control mb-2" v-model="newDeadLine.deadLine">
              <a class="btn btn-primary px-4 py-2 mt-2 mb-3" v-on:click="addEntrega()">Adicionar</a>
            </div>
          </modal>
          <div class="col-12 px-0 d-flex"  v-if="deadLines.length > 0">
            <div class="col-3 pl-0 mb-3" v-for="(deadLine, index) in deadLines" :key="deadLine._id">

            <div class="col-12 bg-primary rounded-lg d-flex align-items-center justify-content-center py-2">
              <h6 class="mb-0 font-weight-bold font-size-11">{{remainingDays(deadLine)}}</h6>
            </div>
            <div class="col-12 p-2 border bg-white border-muted rounded-lg p-2" >
              <div class="col-12 px-3 pb-1">
                <h5 class="pt-2 pb-2">{{deadLine.name}}</h5>
                <p class="m-0 font-size-11">DESCRIÇÃO:</p>
                <p class="m-0 mb-2">{{deadLine.description}}</p>
                <p class="m-0 font-size-11">DATA:</p>
                <p class="m-0">{{new Date(deadLine.deadLine).toLocaleDateString()}}</p>
                <p v-if="deadLine.finished == true" class="text-sucess">Finalizado</p>
                <button v-if="user_type == 'company' && deadLine.finished == false" class="btn btn-primary" @click="finishDeadLine(deadLine)">Finalizar</button>
                <a href="javascript:void(0)" class="text-yellow" v-on:click="deleteEntrega(deadLine, index)"><b>X</b> Remover</a>
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
          <div class="pb-3">
            <a href="javascript:void(0)" class="text-yellow h5 pb-3" v-on:click="$modal.show('custo')"> Adicionar custo</a>
          </div>
           <modal name="custo" height="auto">
            <div class="col-12 pt-4">
              <h4 class="pb-2">Novo custo</h4>
              <p class="m-0">Nome:</p>
              <input type="text" class="form-control mb-2" v-model="newExpense.name">
              <p class="m-0">Descrição:</p>
              <input type="text" class="form-control mb-2" v-model="newExpense.description">
              <p class="m-0">Custo:</p>
              <input type="text" class="form-control mb-2" v-model="newExpense.cost">
              <p class="m-0">Data:</p>
              <input type="date" class="form-control mb-2" v-model="newExpense.date">
              <a class="btn btn-primary px-4 py-2 mt-2 mb-3" v-on:click="addExpense()">Adicionar</a>
            </div>
          </modal>
          <div class="col-12 px-0 d-flex" v-if="expenses.length > 0">
            <div class="col-3 pl-0 mb-3" v-for="(expense, index) in expenses" :key="expense._id">
              <div class="col-12 bg-white px-4 border border-muted rounded-lg pb-2">
                <h5 class="pt-3 pb-2">{{expense.name}}</h5>
                <p class="m-0 font-size-11">DESCRIÇÃO:</p>
                <p class="m-0 mb-2">{{expense.description}}</p>
                <p class="m-0 font-size-11">CUSTO:</p>
                <p class="m-0 mb-2">{{expense.cost}}</p>
                <p class="m-0 font-size-11">DATA:</p>
                <p class="m-0">{{new Date(expense.date).toLocaleDateString()}}</p>
                <a href="javascript:void(0)" class="text-yellow" v-on:click="deleteExpense(expense, index)"><b>X</b> Remover</a>
              </div>
            </div>
          </div>
            <span v-else>Não há custos neste projeto.</span>
        </div>
      </div>
      <div v-if="!isLoading" class="row pt-3 border-bottom pb-4">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Riscos:</h4>
          <div class="pb-3">
            <a href="javascript:void(0)" class="text-yellow h5 pb-3" v-on:click="$modal.show('risco')"> Adicionar risco</a>
          </div>
          <modal name="risco" height="auto">
            <div class="col-12 pt-4">
              <h4 class="pb-2">Novo risco</h4>
              <p class="m-0">Nome:</p>
              <input type="text" class="form-control mb-2" v-model="newRisk.name">
              <p class="m-0">Descrição:</p>
              <input type="text" class="form-control mb-2" v-model="newRisk.description">
              <p class="m-0">Data:</p>
              <input type="date" class="form-control mb-2" v-model="newRisk.date">
              <a class="btn btn-primary px-4 py-2 mt-2 mb-3" v-on:click="addRisk()">Adicionar</a>
            </div>
          </modal>
          <div class="col-12 px-0 d-flex" v-if="risks.length > 0">
            <div class="col-3 pl-0 mb-3" v-for="(risk, index) in risks" :key="risk._id">
              <div class="col-12 bg-white border border-muted rounded-lg px-3">
                <h5 class="pt-2 pb-2">{{risk.name}}</h5>
                <p class="m-0 font-size-11">DESCRIÇÃO:</p>
                <p class="m-0 mb-2">{{risk.description}}</p>
                <p class="m-0 font-size-11">DATA:</p>
                <p class="m-0">{{new Date(risk.date).toLocaleDateString()}}</p>
                <a href="javascript:void(0)" class="text-yellow" v-on:click="deleteRisk(risk, index)"><b>X</b> Remover</a>
              </div>
            </div>
          </div>
            <span v-else>Não há custos neste projeto.</span>
        </div>
      </div>
      <div v-if="!isLoading" class="row mt-3">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Justificação:</h4>
          <input type="text" class="form-control" v-model="project.justification">
        </div>
        <div class="col-12 px-0 py-2 text-dark mt-2">
          <h4 class="font-weight-bold">Finalidade:</h4>
          <input type="text" class="form-control" v-model="project.goal">
        </div>
        <div class="col-12 px-0 py-2 text-dark mt-2">
          <h4 class="font-weight-bold">Objetivos:</h4>
          <input type="text" class="form-control" v-model="project.objectives">
        </div>
      </div>
      </div>
      <div class="col-12 px-0 py-4 d-flex justify-content-end align-items-end">
        <router-link :to="{path: `/project/${this.$route.params.id}`}" class="btn btn-lg btn-info  py-2 mr-3">Cancelar</router-link>
        <a class="btn btn-lg btn-primary px-4 py-2" @click="save()">Salvar</a>
      </div>
    </div>
  </div>  
</template>



<script>

import MemberCard from '../utils/MemberCard'
// import ExpensesList from '../utils/ExpensesList'
// import DueDateList from '../utils/DueDateList'
// import RisksList from '../utils/RisksList'

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
      },
      newDeadLine: {
        project: this.$route.params.id
      },
      deadLines: [],
      deletedDeadLines: [],
      newExpense: {
        project: this.$route.params.id
      },
      deletedexpenses: [],
      expenses: [],
      newRisk: {
        project: this.$route.params.id
      },
      risks: [],
      deletedrisks: [],
      role: this.$session.get('role'),
      isLoading: true,
      user_type: typeof this.$session.get('userType') !== 'undefined' ? this.$session.get('userType') : false
    };
  },
  components: {
    MemberCard,
    // DueDateList,
    // ExpensesList,
    // RisksList
  },
  async mounted() {
    const projectRes = await this.axios.get(`project/${this.$route.params.id}`);
    console.log(projectRes.data)
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
    const deadLineRes = await this.axios.get(`dead-lines/${this.$route.params.id}`)
    this.deadLines = deadLineRes.data;
    const expensesRes = await this.axios.get(`expenses/${this.$route.params.id}`)
    this.expenses = expensesRes.data;
    const risksRes = await this.axios.get(`risks/${this.$route.params.id}`)
    this.risks = risksRes.data;
    this.isLoading = false

    console.log(this.risks)
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
      addEntrega(){
        this.deadLines.push(this.newDeadLine);
        this.$modal.hide('entrega')
        this.newDeadLine = {
          project: this.$route.params.id
        };
      },
      addExpense(){
        this.expenses.push(this.newExpense);
        this.$modal.hide('custo')
        this.newExpense = {
          project: this.$route.params.id
        };
      },
      addRisk(){
        this.risks.push(this.newRisk);
        this.$modal.hide('risco')
        this.newRisk = {
          project: this.$route.params.id
        };
      },
      deleteEntrega(deadLine, index){
        this.deadLines.splice(index, 1)
        this.deletedDeadLines.push(deadLine)
      },
      deleteExpense(expense, index){
        this.expenses.splice(index, 1)
        this.deletedexpenses.push(expense)
      },
      deleteRisk(risk, index){
        this.risks.splice(index, 1)
        this.deletedrisks.push(risk)
      },
      save(){
        this.deadLines.forEach(async deadLine => {
            const res = await this.axios.patch(`dead-line`, deadLine);
            if(!deadLine._id) deadLine._id = res.data._id;
        })
        this.expenses.forEach(async expense => {
            const res = await this.axios.patch(`expenses`, expense);
            if(!expense._id) expense._id = res.data._id;
        })
        this.risks.forEach(async risk => {
            const res = await this.axios.patch(`risks`, risk);
            if(!risk._id) risk._id = res.data._id;
        })
        this.deletedDeadLines.forEach(async deadLine => {
            await this.axios.delete(`dead-line/`+deadLine._id);
        })
        this.deletedexpenses.forEach(async expense => {
            await this.axios.delete(`expenses/`+expense._id);
        })
        this.deletedrisks.forEach(async risk => {
            await this.axios.delete(`risks/`+risk._id);
        })

        this.axios.patch('project', this.project);
        this.$router.back();
      }
  }
}
</script>