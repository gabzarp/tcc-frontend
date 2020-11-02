import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import api from "./api/axios";
import VueSession from "vue-session";

Vue.use(VueSession);
Vue.use(VueRouter);

Vue.prototype.axios = api;

Vue.config.productionTip = false;

import Home from "./components/Home.vue";
import Project from "./components/Project/Project.vue";
import Projects from './components/Project/Projects.vue'
import CreateProject from "./components/Project/CreateProject.vue";
import UserEvaluation from "./components/Project/Evaluation/UserEvaluation.vue";
import Ranking from "./components/Project/Evaluation/Ranking.vue";
import ProjectSettings from './components/Project/ProjectSettings.vue'

import Login from './components/User/Login.vue'
import CompanySignup from './components/User/CompanySignup.vue'
import MemberSignup from './components/User/MemberSignup.vue'

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/projects", component: Projects, name: "projects" },
  { path: "/projects/create", component: CreateProject },
  { path: "/project/:id", component: Project },
  { path: "/project/:id/member-evaluation/:member", component: UserEvaluation },
  { path: "/project/:id/settings", component: ProjectSettings},
  { path: "/ranking", component: Ranking},
  { path: "/login", component: Login},
  { path: "/signup-company", component: CompanySignup},
  { path: "/signup-member", component: MemberSignup}
];
const router = new VueRouter({ routes });

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
