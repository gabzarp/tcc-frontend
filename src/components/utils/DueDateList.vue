<template>
  <div>
    <ol class="list-group my-2">
      <form class="p-2">
       <button type="submit"  @click.prevent="handleFormSubmit" class="btn btn-primary my-2 btn-lg">Adicionar</button>
        <div id="accordion">
          <li v-for="(todo,index) in todos" :key="index" class="list-group-item">
            <div class="card">
              <div class="card-header" :id="'h' + index">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#c' + index" :aria-expanded="setAriaExpanded(index)" :aria-controls="'c' + index">
                    {{todo.name || 'nome'}}
                  </button>
                </h5>
              </div>
              <div :id="'c' + index" class="collapse" :class="setShowClass(index)" :aria-labelledby="'h' + index" data-parent="#accordion">
                <div class="form-group" :id="'c' + index">
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
              </div>
            </div>
          </li>
        </div>
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
    },
    setShowClass(index){
      return index === 0 ? "show" : ""
    },
    setAriaExpanded(index){
      return index === 0 ? "true" : "false"
    }
  }
}
</script>