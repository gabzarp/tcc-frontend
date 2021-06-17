<template>
  <div class="container-lg">
    <div class="row justify-content-center py-5">
    </div>
    <div class="row ">
      <div class="col-6 d-flex flex-column justify-content-center">
        <h1 class="mt-4">Uma nova experiência em gestão de projetos!</h1>
        <p class="mt-3 mb-1">Apresente sua ideia ou seja um prestador de serviços e faça ideias virarem solução</p>
        <p class="pb-2 text-align-justify">Criamos um elo entre empresas que possuem ideias e prestadores de serviço que desejam desenvolver as soluções de software utilizando nossa aplicação de auxílio na gestão de projetos.</p>
    
        <div class="row pt-4">          
          <div class="col-12 d-flex flex-column align-items-center">
            <router-link class="btn btn-primary mb-3" style="width: 340px" to="/signup-company">Quero apresentar minha ideia</router-link>
            <router-link class="btn btn-primary" style="width: 340px" to="/signup-member">Quero ser um prestador de serviços</router-link>
          </div>  
        </div>
      </div>
      <div class="col-6">
        <img class="img-fluid shadow pt-3" src="/images/tcc-home.png" alt="">
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
