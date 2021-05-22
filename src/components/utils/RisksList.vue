<template>
    <ol class="list-group my-2">
      <form class="pY-2">
       <button type="submit"  @click.prevent="handleFormSubmit" class="btn btn-primary mb-2 mr-2 btn-lg">Adicionar</button>
       <button type="button" class="btn btn-primary ml-2 mb-2 btn-lg" @click="handleSave">Salvar alterações</button>
        <div v-if="risks.length !== 0" class="" role="tablist">
          <li v-for="(risk,index) in risks" :key="index" class="list-group-item bg-gray">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">
                  {{risk.name || 'Nome'}}
                </h5>
              </div>
              <div> 
                <div class="form-group">
                  <label for="nome" class="sr-only">Nome</label>
                  <input type="text" v-model="risk.name" class="form-control" placeholder="nome">
                </div>
                <div class="form-group">
                  <label for="date" class="sr-only">Data</label>
                  <input type="date" class="form-control" v-model="risk.deadLine">
                </div>
                <div class="form-group">
                  <label for="description" class="sr-only">Descrição</label>
                  <input type="text" class="form-control" placeholder="Descrição" v-model="risk.description">
                </div>
              </div>
            </div>
          </li>
        </div>
        <div v-else>
          Não há entregas neste projeto.
        </div>
      </form>
    </ol>
</template>

<script>
export default {
  data(){
    return {
      name: "",
      deadLine:"",
      project: this.$route.params.id,
      description:"",
      id: "",
      risks: []
    }
  },
  methods: {
    handleFormSubmit() {
      this.risks.push({
        name: this.name,
        description: this.description,
        project: this.$route.params.id
      });
    },
    handleSave(){
      console.log(this.risks)
      this.risks.forEach(async risk => {
      try {
        const res = await this.axios.patch(`risk`, risk);
        if(!risk._id) risk._id = res.data._id;
      } catch (error) {
        console.log(error);
      }
      })
    }
  },
  async mounted() {
    const res = await this.axios.get(`risks/${this.$route.params.id}`)
    if(res.data) this.risks = res.data;
  },
}
</script>