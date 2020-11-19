<template>
  <div class="container py-4">
    <h2>Criar projeto</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="projectName">Nome:</label>
        <input
          type="text"
          name="projectName"
          id="projectName"
          class="form-control"
          v-model="project.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Descrição:</label>
        <textarea
          name="description"
          id="description"
          class="form-control"
          v-model="project.description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="dueDate">Data de entrega:</label>
        <input type="date" class="form-control" id="dueDate" v-model="project.dueDate">
      </div>
      <div class="form-group">
        <button type="submit" class="btn-primary btn">Criar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        name: "",
        description: "",
        owner: this.$session.get('userId'),
        dueDate: ""
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const body = this.project;
        var project = await this.axios.post("/project", body);
        await this.axios.post("/add-project", {_id: this.$session.get('userId') , project: project.data._id});
        this.$router.push({ name: "my-projects" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
