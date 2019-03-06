import Vue from 'vue'
import App from './App.vue'
import router from './router'

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import 'popper.js';
import 'bootstrap';
import './assets/app.scss';

Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('Hero', require('./components/Hero.vue').default);
Vue.component('Products', require('./sections/Products.vue').default);
Vue.component('Jumbotron', require('./components/Jumbotron.vue').default);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
