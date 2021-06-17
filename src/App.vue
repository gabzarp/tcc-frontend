<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent container-lg">
      <router-link class="navbar-brand img-fluid" to="/"><img class="img-fluid" src="./assets/logo.png" alt=""></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto justify-content-end align-items-end d-flex w-100">
          <li v-if="user_type" class="nav-item active">
            <router-link class="nav-link px-3" to="/my-projects">Seus projetos</router-link>
          </li>
          <li v-if="user_type == 'company'" class="nav-item active">
            <router-link class="nav-link px-3" to="/projects/create">Criar projeto</router-link>
          </li>
          <li v-if="user_type == 'member'" class="nav-item active">
            <router-link class="nav-link px-3" to="/projects">Buscar novos projetos</router-link>
          </li>
          <li v-if="user_type == 'member'" class="nav-item active">
            <router-link class="nav-link px-3" to="/perfil">Perfil</router-link>
          </li>
          <li v-if="user_type" class="nav-item active">
            <router-link class="nav-link px-3" to="/ranking">Ranking</router-link>
          </li>
          <li v-if="user_type" class="nav-item active">
            <a href="#" class="nav-link px-3" v-on:click="logout()">Logout</a>
          </li>
          <li v-if="!user_type" class="nav-item active">
            <router-link class="nav-link px-3" to="/login">Login</router-link>
          </li>
          <li v-if="!user_type" class="nav-item active">
            <router-link class="nav-link px-3" to="/signup-company">Quero realizar meu projeto</router-link>
          </li>
          <li v-if="!user_type" class="nav-item active">
            <router-link class="nav-link px-3" to="/signup-member">Quero ser prestador de serviços</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

<script>
  export default {
    name: 'App',
    data (){
      return{
        user_type: typeof this.$session.get('userType') !== 'undefined' ? this.$session.get('userType') : false
      }
    },
    updated () {
      this.user_type = typeof this.$session.get('userType') !== 'undefined' ? this.$session.get('userType') : false
    },
    methods: {
      logout(){
        this.$session.destroy();
        this.$router.push({ name: "home" });
      }
    }
  }
</script>


<style>
  @font-face{
    font-family: Montserrat;
    src: url(./assets/fonts/MontserratAlternates-Regular.ttf);
  }
  @font-face{
    font-family: Overpass;
    src: url(./assets/fonts/Overpass-Regular.ttf);
  }

  html, body {
    color: #2c3e50;
  }
  #app {
    color: #2c3e50;
    height: 100%;
    /* background-image: url('/images/background.png'); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
    background-color: #FAF9FA !important;
    font-family: Overpass;
  }
  h1{
    font-family: Montserrat;
  }
  h1{
    font-size: 58px !important;

  }
  .bg-gray{
    background-color: #7e7e7e !important;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15)!important;
  }
  .btn-primary{
    background-color: #e78200 !important;
    border-color: #343a40!important;
    color: #000 !important;
    font-weight: 700!important;
    border-radius: 12px !important;
    padding-top: 14px !important;
    padding-bottom: 14px !important;  
    box-shadow: 0px 3px 6px #00000029 !important;
    border: none !important;
  }
  .btn-primary:hover {
      color: #fff !important;
      background-color: #a96104 !important;
      border-color: #a96104 !important;
  }
  .text-primary {
      color: #e78200 !important;
  }
  div .bg-primary {
      background: #e78200 !important;
      background-color: #e78200 !important;
  }
  ul{
    list-style-type: none;
  }
  .container-lg{
    max-width: 1440px !important;
  }
  .font-color-gray{
    color: #707070 !important;
  }
  .nav-item{
    font-weight: 700!important;
  }
  p{
    font-size:20px !important;
  }
  div .border-bottom{
    border-bottom: 1px solid #9D91A3!important;
  }
  .font-size-11{
     font-size: 11px !important;
  }
  
</style>
