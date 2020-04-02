import pomodoro from './pomodoro.js'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    pomodoro
  }
})
console.log(Store)
export default Store
