<template>
  <div class="col-4 p-2">
    <div class="d-flex border border-muted rounded-lg p-2">
      <div class="col-4">
      <img src="../../assets/avatar.svg" class="img-fluid rounded-circle">
    </div>
    <div class="col-8">
      <h3>{{memberData.name}}</h3>
      <p class="m-0">{{memberData.position}}</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['memberData']
}
</script>