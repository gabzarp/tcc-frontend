<template>
  <div class="container">
    <div class="row justify-content-center py-5">
    </div>
    <div class="row ">
      <div class="col-6">
        <img class="img-fluid mb-3" src="../assets/logo.png" alt="">
        <h2 class="mt-0 mb-4">Apresente sua ideia ou seja um colaborador e faça ideias virarem solução</h2>
        <h5 class="pb-2 text-align-justify">Criamos um elo entre empresas que possuem ideias e colaboradores que desejam desenvolver as soluções de software utilizando nossa aplicação de auxílio na gestão de projetos.</h5>
        <div class="row pt-4">          
          <div class="col-12 d-flex">
            <router-link class="btn btn-primary mr-3" to="/signup-company">Quero apresentar minha ideia</router-link>
            <router-link class="btn btn-primary" to="/signup-member">Quero ser colaborador</router-link>
          </div>  
        </div>
      </div>
        <div class="col-6">
          <img class="img-fluid shadow pt-3" src="/images/home.jpg" alt="">
          <h4  class="mt-4">Uma nova experiência em gestão de projetos!</h4>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
