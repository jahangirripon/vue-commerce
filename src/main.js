import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import App from './App.vue'
import router from './router'
import {fb} from './firebase'

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
})

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
Vue.use(VueFirestore)

import 'popper.js';
import 'bootstrap';
import './assets/app.scss';

import Swal from 'sweetalert2';
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;

Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('Hero', require('./components/Hero.vue').default);
Vue.component('Products', require('./sections/Products.vue').default);
Vue.component('Jumbotron', require('./components/Jumbotron.vue').default);

Vue.config.productionTip = false

let app = '';

fb.auth().onAuthStateChanged(function(user) {
  if(!app) 
  {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})


