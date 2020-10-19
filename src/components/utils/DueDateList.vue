<template>
  <div>
    <ol class="list-group my-2">
      <form @submit.prevent="handleFormSubmit" class="p-2">
       <button type="submit" class="btn btn-primary my-2 btn-lg">Adicionar</button>
        <li v-for="(todo,index) in todos" :key="index" class="list-group-item">
          <div class="form-group">
            <label for="nome" class="sr-only">Nome</label>
            <input type="text" v-model="todo.name" class="form-control" placeholder="nome" id="nome">
          </div>
          <div class="form-group">
            <label for="date" class="sr-only">Data</label>
            <input type="date" id="date" class="form-control" v-model="todo.date">
          </div>
          <div class="form-group">
            <label for="description" class="sr-only">Descrição</label>
            <input type="text" id="description" class="form-control" placeholder="Descrição" v-model="todo.description">
          </div>
        </li>
      </form>
    </ol>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: "",
      date:"",
      description:"",
      todos: [{}]
    }
  },
  methods: {
    handleFormSubmit() {
      this.todos.push({
        name: this.name,
        date: this.date,
        description: this.description,
        isEditable : false
      });
    }
  }
}
</script>