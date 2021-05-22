<template>
    <ol class="list-group my-2">
      <form class="pY-2">
       <button type="submit"  @click.prevent="handleFormSubmit" class="btn btn-primary mb-2 mr-2 btn-lg">Adicionar</button>
       <button type="button" class="btn btn-primary ml-2 mb-2 btn-lg" @click="handleSave">Salvar alterações</button>
        <div v-if="expenses.length !== 0" class="" role="tablist">
          <li v-for="(expense,index) in expenses" :key="index" class="list-group-item bg-gray">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">
                  {{expense.name || 'Nome'}}
                </h5>
              </div>
              <div> 
                <div class="form-group">
                  <label for="nome" class="sr-only">Nome</label>
                  <input type="text" v-model="expense.name" class="form-control" placeholder="nome">
                </div>
                <div class="form-group">
                  <label for="description" class="sr-only">Descrição</label>
                  <input type="text" class="form-control" placeholder="Descrição" v-model="expense.description">
                </div>
                <div class="form-group">
                  <label for="cost" class="sr-only">Custo</label>
                  <input type="text" class="form-control" placeholder="Custo" v-model="expense.cost">
                </div>
                <div class="form-group">
                  <label for="date" class="sr-only">Data</label>
                  <input type="date" class="form-control" v-model="expense.date">
                </div>
              </div>
            </div>
          </li>
        </div>
        <div v-else>
          Não há custos neste projeto.
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
      expenses: []
    }
  },
  methods: {
    handleFormSubmit() {
      this.expenses.push({
        name: this.name,
        deadLine: this.deadLine,
        description: this.description,
        project: this.$route.params.id
      });
    },
    handleSave(){
      console.log(this.expenses)
      this.expenses.forEach(async expense => {
      try {
        const res = await this.axios.patch(`expenses`, expense);
        if(!expense._id) expense._id = res.data._id;
      } catch (error) {
        console.log(error);
      }
      })
    }
  },
  async mounted() {
    const res = await this.axios.get(`expenses/${this.$route.params.id}`)
    if(res.data) this.expenses = res.data;
  },
}
</script>