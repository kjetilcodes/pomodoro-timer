const store = {
  state: {
    active: false,
    activity: 'work',
    activities: ['work', 'pause', 'longPause'],
    defaults: {
      work: {
        time: 1500000, // 25 min
      },
      pause: {
        time: 300000 // 5 min
      },
      longPause: {
        time: 1800000 // 30 min
      },
    },
    time: 0,
  },
  mutations: {
    reset(state) {
      state.time = 0
    },
    start(state) {
      state.active = true
      state.time = state.time || state.defaults[state.activity].time
      state.timerObject = window.setInterval(() => {
        state.time -= 1000
        if (state.time <= 0) {
          const sound = new Audio('../static/alarm.mp3')
          state.active = false
          sound.play()
          window.clearInterval(state.timerObject)
        }
      }, 1000)
    },
    stop(state) {
      state.active = false
      window.clearInterval(state.timerObject)
    },
    setActivity(state, activity) {
      state.activity = activity
    }
  }
}

export default store