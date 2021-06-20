<template>
    <div class="container">
        <h1>Avaliações de {{member ? member.user.name : 'usuário'}}</h1>
        <form @submit.prevent="handleSubmit" class="py-3 text-dark border">
            <div class="col-12">
                <div class="d-flex flex-column">
                    <h3>Entregas no prazo:</h3>
                    <div class="form-group">
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 1 <= dueDate.score, 'text-dark': 1 > dueDate.score }"></i>
                            <input type="radio" value="1" class="d-none" v-model="dueDate.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 2 <= dueDate.score, 'text-dark': 2 > dueDate.score }"></i>
                            <input type="radio" value="2" class="d-none" v-model="dueDate.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 3 <= dueDate.score, 'text-dark': 3 > dueDate.score }"></i>
                            <input type="radio" value="3" class="d-none" v-model="dueDate.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 4 <= dueDate.score, 'text-dark': 4 > dueDate.score }"></i>
                            <input type="radio" value="4" class="d-none" v-model="dueDate.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 5 <= dueDate.score, 'text-dark': 5 > dueDate.score }"></i>
                            <input type="radio" value="5" class="d-none" v-model="dueDate.score" />
                        </label> 
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="d-flex flex-column">
                    <h3>Comunicação:</h3>
                    <div class="form-group">
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 1 <= communication.score, 'text-dark': 1 > communication.score }"></i>
                            <input type="radio" value="1" class="d-none" v-model="communication.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 2 <= communication.score, 'text-dark': 2 > communication.score }"></i>
                            <input type="radio" value="2" class="d-none" v-model="communication.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 3 <= communication.score, 'text-dark': 3 > communication.score }"></i>
                            <input type="radio" value="3" class="d-none" v-model="communication.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 4 <= communication.score, 'text-dark': 4 > communication.score }"></i>
                            <input type="radio" value="4" class="d-none" v-model="communication.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 5 <= communication.score, 'text-dark': 5 > communication.score }"></i>
                            <input type="radio" value="5" class="d-none" v-model="communication.score" />
                        </label> 
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="d-flex flex-column">
                    <h3>Conhecimento técnico:</h3>
                    <div class="form-group">
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 1 <= technicalKnowledge.score, 'text-dark': 1 > technicalKnowledge.score }"></i>
                            <input type="radio" value="1" class="d-none" v-model="technicalKnowledge.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 2 <= technicalKnowledge.score, 'text-dark': 2 > technicalKnowledge.score }"></i>
                            <input type="radio" value="2" class="d-none" v-model="technicalKnowledge.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 3 <= technicalKnowledge.score, 'text-dark': 3 > technicalKnowledge.score }"></i>
                            <input type="radio" value="3" class="d-none" v-model="technicalKnowledge.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 4 <= technicalKnowledge.score, 'text-dark': 4 > technicalKnowledge.score }"></i>
                            <input type="radio" value="4" class="d-none" v-model="technicalKnowledge.score" />
                        </label>
                        <label> 
                            <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': 5 <= technicalKnowledge.score, 'text-dark': 5 > technicalKnowledge.score }"></i>
                            <input type="radio" value="5" class="d-none" v-model="technicalKnowledge.score" />
                        </label> 
                    </div>
                </div>
            </div>

            <div class="form-group col-12">
                <button type="submit" class="btn-primary btn">Avaliar</button>
            </div>
        </form>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      return {
        project: {_id: '0'},
        member: { _id: '0'},
        dueDate: {type: "60ceb8341fb00c0f161a9ef4", score: 0, project: this.$route.params.id, member: this.$route.params.member},
        technicalKnowledge: {type: "60ceb8411fb00c0f161a9ef5", score: 0, project: this.$route.params.id, member: this.$route.params.member},
        communication: {type:"60ceb8481fb00c0f161a9ef6", score: 0, project: this.$route.params.id, member: this.$route.params.member},
      };
    },
    methods: {
        async handleSubmit() {
            try {
                var dueDate = await this.axios.patch("/evaluation", this.dueDate);
                var technicalKnowledge = await this.axios.patch("/evaluation", this.technicalKnowledge);
                var communication = await this.axios.patch("/evaluation", this.communication);
                console.log(dueDate )
                await this.axios.post("/add-evaluation", {memberId: this.$route.params.member, evaluationId: dueDate.data._id });
                await this.axios.post("/add-evaluation", {memberId: this.$route.params.member, evaluationId: technicalKnowledge.data._id });
                await this.axios.post("/add-evaluation", {memberId: this.$route.params.member, evaluationId: communication.data._id});
                this.$router.back();
            } catch (error) {
                console.log(error);
            }
        },
    },
    async mounted() {
        const projectRes = await this.axios.get(`/project/${this.$route.params.id}`);
        this.project = projectRes.data;
        const memberRes = await this.axios.get(`/member/${this.$route.params.member}`);
        this.member = memberRes.data;

        const evaluations = await this.axios.post(`/evaluation-by-member-and-project`, {project: this.project._id, member: this.member._id});
        console.log(evaluations)
        if(evaluations.data !== [] && typeof evaluations.data !== 'undefined'){
            evaluations.data.forEach(evaluation => {
                this[evaluation.type.name] = evaluation
            });
        }
        else{
            console.log(this.dueDate)
            Object.assign(this.dueDate, {project: this.project._id, member: this.member._id})
            Object.assign(this.technicalKnowledge, {project: this.project._id, member: this.member._id})
            Object.assign(this.communication, {project: this.project._id, member: this.member._id})
        }
        
    },
    
  };
  </script>
  