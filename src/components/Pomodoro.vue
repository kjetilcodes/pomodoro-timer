<template>
  <div class="pomodoro-timer">
    <div class="timer-display">{{ time }}</div>
    <div class="buttons">
      <button
        v-for="action in actions"
        @click="timerAction(action.type)"
        :key="action.type"
        :class="action.type"
        class="pomodoro pomodoroButton"
      >{{ action.type }} Timer</button>
    </div>
    <div class="activities">
      <button
        v-for="activity in activities"
        @click="setActivity(activity.internal)"
        class="pomodoro"
        :data-currentActivity="[activity.internal === currentActivity ? 'active' : 'inactive']"
        :disabled="active"
        :key="activity.internal"
      >{{ activity.presentable }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pomodoro",
  computed: {
    time() {
      const activity = this.$store.state.pomodoro.activity;
      const timeInMs =
        this.$store.state.pomodoro.time ||
        this.$store.state.pomodoro.defaults[activity].time;
      return this.convertTime(timeInMs);
    },
    active() {
      return this.$store.state.pomodoro.active;
    },
    paused() {
      return this.$store.state.pomodoro.paused;
    },
    activities() {
      return this.$store.state.pomodoro.activities.filter(e => {
        const isNotActive = !this.$store.state.pomodoro.active;
        const isNotPaused = !this.$store.state.pomodoro.paused;
        const isCurrentActivity =
          this.$store.state.pomodoro.activity == e.internal;
        return (isNotActive && isNotPaused) || isCurrentActivity;
      });
    },
    currentActivity() {
      return this.$store.state.pomodoro.activity;
    },
    actions() {
      return [
        { type: "Start", condition: !this.active },
        { type: "Stop", condition: this.active },
        { type: "Reset", condition: !this.active && this.paused }
      ].filter(e => {
        return e.condition;
      });
    }
  },
  methods: {
    convertTime(ms) {
      if (typeof ms !== "String") {
        let totalTime = ms;
        let minutes = Math.floor(totalTime / 1000 / 60);
        let seconds = Math.floor(totalTime / 1000 - minutes * 60);
        seconds = seconds.toString().length < 2 ? `0${seconds}` : seconds;
        minutes = minutes.toString().length < 2 ? `0${minutes}` : minutes;
        return `${minutes}:${seconds}`;
      } else {
        let timeString = [...ms];
        let min = timeString.splice(0, 2).join("");
        timeString.splice(0, 1);
        let sec = timeString.splice(0, 2).join("");
        return parseInt(min * 60 * 1000) + parseInt(sec * 1000);
      }
    },
    timerAction(action) {
      this.$store.commit(action.toLowerCase());
    },
    setActivity(activity) {
      this.$store.commit("setActivity", activity);
    }
  }
};
</script>

<style lang="scss">
button {
  background: none;
  border: none;
}

button.pomodoro {
  width: 100px;
  height: 50px;
}

.pomodoro-timer {
  display: flex;
  flex-direction: row;
  max-width: 500px;
  border: 1px solid black;
  padding: 20px;

  .timer-display {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
    margin: 5px;
    font-size: 4rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  .buttons,
  .activities {
    display: flex;
    flex-direction: column;
  }

  .buttons button.pomodoro,
  .activities button.pomodoro {
    border: 1px solid black;
    border-radius: 5px;
    margin: 2px;
  }

  .activities button.pomodoro {
    background-color: #3366bb;
    color: white;
  }

  .buttons button.pomodoro:disabled {
    background-color: #2222;
    color: black;
  }
}

.pomodoroButton.Stop {
  background-color: red;
}
.pomodoroButton.Start {
  background-color: green;
}

.pomodoroButton.Start,
.pomodoroButton.Stop {
  color: white;
}
button.pomodoro[data-currentActivity="active"] {
  background-color: #114499 !important;
}
</style>
