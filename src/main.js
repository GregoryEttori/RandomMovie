import Vue from 'vue'
import App from './App.vue'
import store from "./Store.js";
import Vuelidate from "vuelidate/src";
import VueRouter from 'vue-router';

import {routes} from "../routes";

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuelidate);

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
