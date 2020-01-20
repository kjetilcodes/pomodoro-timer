<template>
  <div class="pomodoro-timer">
    <div class="timer-display">{{ time }}</div>
    <div class="buttons">
      <button
        v-for="action in actions"
        @click="timerAction(action.type)"
        :disabled="action.whenActive"
        :key="action.type"
        class="style1"
      >{{ action.type }} Timer</button>
    </div>
    <div class="activities">
      <button
        v-for="activity in activities"
        @click="setActivity(activity.internal)"
        class="style1"
        :disabled="active"
        :key="activity.internal"
      >{{ activity.presentable }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pomodoro",
  props: ["styles"],
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
    activities() {
      return this.$store.state.pomodoro.activities;
    },
    actions() {
      return [
        { type: "Start", whenActive: this.active },
        { type: "Stop", whenActive: !this.active },
        { type: "Reset", whenActive: this.active }
      ];
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
.timer-display {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  font-size: 4rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

button.style1 {
  width: 100px;
  height: 50px;
}

.pomodoro-timer {
  display: flex;
  flex-direction: row;
  max-width: 500px;
  .buttons,
  .activities {
    display: flex;
    flex-direction: column;
  }
}
</style>
