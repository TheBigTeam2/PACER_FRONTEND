import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

// SweetAlert
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// Vue Mask
import VueMask from 'v-mask'

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
Vue.use(VueSweetalert2)

// Moment
Vue.use(require('vue-moment'))
Vue.use(VueMask)

// VueSelect
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
