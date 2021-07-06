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
          <h6>{{ project.owner.name }}</h6>
        </div>
      </div>
      <div class="row pb-4 d-flex align-items-center">
        <div class="col-1 pl-0" v-if="role == 'Scrum master'">
          <router-link :to="{path: `/project/${this.$route.params.id}/settings`}" class="w-100">
            <img src="../../assets/settings.svg" alt="Configurações do projeto" class="img-fluid w-50">
          </router-link>
        </div>
        <div class="col-1">
          <a class="w-100" href="javascript:void(0)" v-on:click="$modal.show('chat')">
            <img class="img-fluid w-50" :src="require(`@/assets/chat.png`)"/>
          </a>
        </div>
        <modal name="chat" height="auto" v-if="project.chat">
          <div class="" style="overflow-y: scroll;height: 600px;">
            <div class="d-flex flex-column">
              <div class="col-5 border bg-white py-2 m-2" v-for="message of messages" :key="message._id" v-bind:class="{ 'align-self-end border border-yellow': (message.user._id == userId) }">
                <p class="h6 mb-0" style="font-size:11px !important;">{{message.user.name}}</p>
                <p class="h6" style="font-size:16px !important;">{{message.message}}</p>
                <p class="h6 mb-0" style="font-size:11px !important;">{{new Date(message.date).toLocaleString()}}</p>
              </div>
            </div>
          </div>
          <div class="d-flex px-3 py-2">
              <input type="text" class="form-control mb-0 col-10 mr-2" v-model="newMessage.message">
              <a class="btn btn-primary py-1" href="javascript:void(0)" v-on:click="sendMessage()">Enviar</a>
          </div>
        </modal>
        <div v-if="user_type != 'company'" class="col-1">
          <a v-for="(external, index) of project.externalSources" :key="index" class="w-100" :href="external.link" target="_blank">
            <img class="img-fluid w-50" :src="require(`@/assets/${external.name}.svg`)"/>
          </a>
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
              <div class="col-12 px-3 mb-3">
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
            <div class="col-3 pl-0 mb-3" v-for="expense in expenses" :key="expense._id">
              <div class="col-12 px-3 bg-white border border-muted rounded-lg">
                <h5 class="pt-3 pb-2">{{expense.name}}</h5>
                <p class="m-0 font-size-11">DESCRIÇÃO:</p>
                <p class="m-0 mb-2">{{expense.description}}</p>
                <p class="m-0 font-size-11">CUSTO:</p>
                <p class="m-0 mb-2">R$ {{expense.cost}}</p>
                <p class="m-0 font-size-11">DATA:</p>
                <p class="m-0 pb-2">{{new Date(expense.date).toLocaleDateString()}}</p>
              </div>
            </div>
          </div>
            <span v-else>Não há custos neste projeto.</span>
        </div>
      </div>
      <div v-if="!isLoading" class="row pt-3 border-bottom pb-4">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Riscos:</h4>
          <div class="col-12 px-0 d-flex" v-if="risks.length > 0">
            <div class="col-3 pl-0 mb-3" v-for="risk in risks" :key="risk._id">
              <div class="col-12 px-3 bg-white border border-muted rounded-lg p-2">
                <h5 class="pt-3 pb-2">{{risk.name}}</h5>
                <p class="m-0 font-size-11">DESCRIÇÃO:</p>
                <p class="m-0 mb-2">{{risk.description}}</p>
                <p class="m-0 font-size-11">DATA:</p>
                <p class="m-0 pb-2">{{new Date(risk.date).toLocaleDateString()}}</p>
              </div>
            </div>
          </div>
            <span v-else>Não há custos neste projeto.</span>
        </div>
      </div>
      <div v-if="!isLoading" class="row mt-3">
        <div class="col-12 px-0 py-2 text-dark">
          <h4 class="font-weight-bold">Justificativa:</h4>
          <p>{{project.justification}}</p>
        </div>
        <div class="col-12 px-0 py-2 text-dark mt-2">
          <h4 class="font-weight-bold">Finalidade:</h4>
          <p>{{project.goal}}</p>
        </div>
        <div class="col-12 px-0 py-2 text-dark mt-2">
          <h4 class="font-weight-bold">Objetivos:</h4>
          <p>{{project.objectives}}</p>
        </div>
        <div v-if="user_type == 'company' && project.isFinished == false" class="col-12 px-0 py-4 d-flex justify-content-end align-items-end">
          <a class="btn btn-lg btn-primary px-4 py-2 mr-3" @click="finishProject()">Finalizar projeto</a>
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
        expenses: [],
        messages: [],
        newMessage: {
        },
        role: this.$session.get('role'),
        isLoading: true,
        user_type: typeof this.$session.get('userType') !== 'undefined' ? this.$session.get('userType') : false,
        userId:  typeof this.$session.get('userId') !== 'undefined' ? this.$session.get('userId') : false,
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
      const messagesRes = await this.axios.get("messages-by-chat/" + this.project.chat._id)
      this.messages = messagesRes.data;
      
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
      async sendMessage(){
        this.newMessage.chat = this.project.chat._id;
        this.newMessage.user = this.userId;
        this.newMessage.date = new Date();
        let message = await this.axios.post("message", this.newMessage);
        console.log(message)
        this.messages.push(message.data)
      },
      async finishProject(){
        this.project.isFinished = true
        await this.axios.patch("/project", this.project)
        this.$router.push({ name: 'my-projects' });
      },
    }
  };
</script>
