import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.use(VueRouter)

Vue.prototype.axios = axios

Vue.config.productionTip = false

import Home from './components/Home.vue'
import Projects from './components/Project/Projects.vue'
import Project from './components/Project/Project.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/project/:id', component: Project },
]
const router = new VueRouter({routes})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
