export default {
  pomodoro: {
    namespaced: true,
    state: {
      active: false,
      activity: "work",
      paused: false,
      activities: [
        { internal: "work", presentable: "Work" },
        { internal: "pause", presentable: "Pause" },
        { internal: "longPause", presentable: "Long Pause" }
      ],
      defaults: {
        work: {
          time: 1500000 // 25 min
        },
        pause: {
          time: 300000 // 5 min
        },
        longPause: {
          time: 1800000 // 30 min
        }
      },
      time: 0
    },

    mutations: {
      reset(stateObject) {
        const state = stateObject
        state.time = 0;
        state.paused = false;
      },
      start(stateObject) {
        const state = stateObject
        state.active = true;
        state.paused = false;
        state.time = state.time || state.defaults[state.activity].time;
        state.timerObject = window.setInterval(() => {
          state.time -= 1000;
          if (state.time <= 0) {
            const sound = new Audio("../static/alarm.mp3");
            state.active = false;
            sound.play();
            window.clearInterval(state.timerObject);
          }
        }, 1000);
      },
      stop(stateObject) {
        const state = stateObject
        state.active = false;
        state.paused = true;
        window.clearInterval(state.timerObject);
      },
      setActivity(stateObject, activity) {
        const state = stateObject
        state.activity = activity;
        state.paused = false;
      }
    },
    actions: {},
    getters: {}
  }
}