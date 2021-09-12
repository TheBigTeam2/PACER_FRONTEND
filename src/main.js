import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

// AdminLTE JS
require('admin-lte/plugins/jquery/jquery.min.js')
require('admin-lte/plugins/popper/popper.min.js')
require('admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js')
require('admin-lte/plugins/overlayScrollbars/js/OverlayScrollbars.min.js')
require('admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')
require('admin-lte/dist/js/adminlte.min.js')

// AdminLTE CSS
require('admin-lte/plugins/fontawesome-free/css/all.min.css')
require('admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css')
require('admin-lte/dist/css/adminlte.min.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
