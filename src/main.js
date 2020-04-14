import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import RegisterPage from "./pages/RegisterPage.vue";
import SuccessPage from "./pages/SuccessPage.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: "/", component: RegisterPage },
  { path: "/success", component: SuccessPage }
];

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
