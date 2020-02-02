import { pomodoroState, pomodoroMutations } from '../components/Pomodoro.vue'
const store = {
  state: {
    pomodoro: { ...pomodoroState }
  },
  mutations: {
    ...pomodoroMutations
  }
}

export default store