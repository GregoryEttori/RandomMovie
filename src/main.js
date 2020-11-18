import Vue from 'vue'
import App from './App.vue'
import store from "./Store.js";
import Vuelidate from "vuelidate/src";
import VueRouter from 'vue-router';
import PerfectScrollbar from "vue2-perfect-scrollbar";
import VuejsDialog from 'vuejs-dialog';
import VModal from 'vue-js-modal';
import Toasted from 'vue-toasted';

import {routes} from "../routes";

import axios from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuelidate);
Vue.use(PerfectScrollbar);
Vue.use(VuejsDialog);
Vue.use(VModal);
Vue.use(Toasted);

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
