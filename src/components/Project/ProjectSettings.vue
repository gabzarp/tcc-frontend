<template>
  <div class="container mt-2">
    <h4>Solicitações:</h4>
    <div class="row mt-2">
      <div class="col-10">
        <div class="row">
          <MemberCard isSolicitation="true"></MemberCard>
        </div>
      </div>
    </div>
    <div class="row">
      <h4>Entregas:</h4>
    </div>
    <div class="row">
      <div class="col-12">
        <DueDateList/>
      </div>
    </div>
  </div>
</template>

<script>

import MemberCard from '../utils/MemberCard'
import DueDateList from '../utils/DueDateList'

export default {
  components: {
    MemberCard,
    DueDateList
  }
}
</script>