class DailyObject {
  constructor({ dateObject }) {
    this.date = {
      JSON: dateObject.getJSON(),
      day: dateobject.getDate(),
      month: dateobject.getMonth(),
      year: dateObject.getFullYear()
    }
    this.activities = {
      work: [],
      pause: [],
      longPause: []
    }
  }
}

class SessionObject {
  constructor({ start, end, activity, duration }) {
    this.start = start
    this.end = end
    this.activity = activity
    this.duration = duration
    this.completed = false
  }
}

export default {
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
      time: 0,
      sessionObject: {}
    },

    mutations: {
      reset(state) {
        state.time = 0;
        state.paused = false;
      },
      start(state) {
        state.active = true;
        state.paused = false;
        state.sessionObject = new SessionObject({
          start: Date.now(),
          activity: state.activity
        })
        state.time = state.time || state.defaults[state.activity].time;
        state.timerObject = window.setInterval(() => {
          state.time -= 1000;
          if (state.time <= 0) {
            const sound = new Audio("../static/alarm.mp3");
            state.active = false;
            state.sessionObject.completed = true
            sound.play();
            window.clearInterval(state.timerObject);
          }
        }, 1000);
      },

      stop(state) {
        state.active = false;
        state.paused = true;
        window.clearInterval(state.timerObject);
      },
      
      setActivity(state, activity) {
        state.activity = activity;
        state.paused = false;
      }
    }
  
}
