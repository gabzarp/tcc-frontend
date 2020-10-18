<template>
    <div class="container">
        <h1>Avaliações de {{}}</h1>
        <form @submit.prevent="handleSubmit">
            <div class="d-flex flex-column">
                <h3>Entregas no prazo:</h3>
                <div class="form-group">
                    <label> 
                        <i class="fa fa-star fa-2x" v-bind:class="{ 'text-warning': dueDate <= 1, 'text-dark': dueDate > 1 }"></i>
                        <input
                        type="radio"
                        name="dueDate"
                        value="1"
                        class="d-none"
                        v-model="dueDate"
                        />
                    </label>
                    <label>
                        <i class="fa fa-star fa-2x" v-bind:class="{ active: isActive }"></i>
                        <input
                        type="radio"
                        name="dueDate"
                        value="2"
                        class="d-none"
                        v-model="dueDate"
                        />

                    </label>            <label>
                        <i class="fa fa-star fa-2x" v-bind:class="{ active: isActive }"></i>
                        <input
                        type="radio"
                        name="dueDate"
                        value="3"
                        class="d-none"
                        v-model="dueDate"
                        />

                    </label>            <label>
                        <i class="fa fa-star fa-2x" v-bind:class="{ active: isActive }"></i>
                        <input
                        type="radio"
                        name="dueDate"
                        value="4"
                        class="d-none"
                        v-model="dueDate"
                        />

                    </label>            <label>
                        <i class="fa fa-star fa-2x" v-bind:class="{ active: isActive }"></i>
                        <input
                        type="radio"
                        name="dueDate"
                        value="5"
                        class="d-none"
                        v-model="dueDate"
                        />

                    </label>
                </div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn-primary btn">Submit</button>
            </div>
        </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dueDate: 0,

      };
    },
    methods: {

    },
  };
  </script>
  