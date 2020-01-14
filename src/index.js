import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import Store from './vuex/store.js'
Vue.use(Vuex)
const store = new Vuex.Store(Store)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
