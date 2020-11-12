<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <img class="img-fluid" src="../assets/logo.png" alt="">
    </div>
    <div class="row">
      <div class="col-6">
        <img class="img-fluid" src="https://via.placeholder.com/800x320" alt="">
      </div>
      <div class="col-6"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet lacinia mi, sit amet faucibus nisi facilisis sed. Vivamus et pellentesque sem, a luctus quam. Proin tempus dolor efficitur dolor euismod tempus. Nulla facilisi. Curabitur varius placerat tortor eget elementum. Curabitur sodales dictum elit, sit amet commodo nunc sollicitudin sed. Nullam ut consequat erat, eget vehicula libero. Aliquam dapibus, lorem pretium tincidunt porta, lacus risus mattis urna, et dapibus lectus libero vitae augue. Praesent quis lorem eget mi accumsan sagittis nec nec tellus. Pellentesque sed cursus velit.</p></div>
    </div>
    <div class="row pt-2">
      <div class="col-6"><p>Suspendisse quis vestibulum tortor. Nulla elit eros, faucibus nec consequat ac, tempor vel justo. Cras dignissim ut nunc quis consequat. Sed ut bibendum erat. Pellentesque ut purus eu est bibendum malesuada. Nullam feugiat malesuada lacus, ac feugiat urna ullamcorper ac. Mauris faucibus ultricies ipsum, non finibus sem sagittis et. Vivamus dignissim mattis dui, sed dignissim quam lacinia ac. Morbi sit amet ipsum odio. Maecenas pretium lacinia posuere.</p></div>
        <div class="col-6">
          <img class="img-fluid" src="https://via.placeholder.com/800x250" alt="">
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
