<template>
  <div class="col-4 p-2">
    <div class="d-flex border border-muted rounded-lg p-2">
      <div class="col-4">
      <img src="../../assets/avatar.svg" class="img-fluid rounded-circle">
    </div>
    <div class="col-8">
      <h5>{{"memberData.name"}}</h5>
      <p class="m-0">{{"memberData.position"}}</p>
      <router-link v-if="isScrumMaster" :to="{path: `/project/${projectData._id}/user-evaluation/${memberData._id}` }"> 
        Avaliar 
      </router-link>
        <div v-if="isSolicitation">
          <a class="text-primary text-decoration-none mr-2">Aceitar</a>
          <a class="text-danger text-decoration-none">Ignorar</a>
        </div>

    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['memberData', 'isScrumMaster', 'projectData', 'isSolicitation']
}
</script>