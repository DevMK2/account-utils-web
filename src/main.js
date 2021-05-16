import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import store from './plugins/vuex'
import vuetify from './plugins/vuetify'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
