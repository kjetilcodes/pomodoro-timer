import { pomodoroState, pomodoroMutations } from './pomodoro.js'

const store = {
  state: {
    pomodoro: { ...pomodoroState }
  },
  mutations: {
    ...pomodoroMutations
  }
}

export default store