<template>
  <div class="container">
    <div class="row">
      <div class=" pt-3 justify-content-center text-center mb-5 col-12">
        <h2>{{ project.name }}</h2>
        <h6 >{{ "Dono" }}</h6>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <h4>Descrição:</h4>
        <p>{{project.description}}</p>
      </div>
      <div class="pt-3 col-2 px-5">
      <a class="m-3 d-block px-2" href="#">
        <img class="img-fluid" src="../../assets/trello.svg"/>
      </a>
      <a class="m-3 d-block px-2" href="#">
        <img class="img-fluid" src="../../assets/git.svg"/>
      </a>
      <a class="m-3 d-block px-2" href="#">
        <img class="img-fluid" src="../../assets/slack.svg"/>
      </a>
    </div>
    </div>
    <div class="row">
      <div class="col-10">
        <h4>Membros:</h4>
        <div class="row">
          <memberCard v-for="(index,member) in project.members" :key="index" :member-data="member"></memberCard>
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
        project: {}
      };
    },
    components:{
      memberCard
    },
    async mounted() {
      const projectRes = await this.axios.get(`project/${this.$route.params.id}`);
      this.project = projectRes.data;
    },
  };
</script>
