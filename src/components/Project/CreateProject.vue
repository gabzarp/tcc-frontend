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
        owner: this.$session.get('userId')
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const body = this.project;
        var project = await this.axios.post("/project", body);
        console.log(project)
        await this.axios.patch("/user", {_id: this.$session.get('userId') , projects: [project.data._id]});
        this.$router.push({ name: "projects" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
