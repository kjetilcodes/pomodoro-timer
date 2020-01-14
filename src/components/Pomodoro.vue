<template>
  <div>
    <div class="timer-display">{{ time }}</div>
    <div class="buttons">
      <button @click="startTimer()" :disabled="active">Start timer</button>
      <button @click="stopTimer()" :disabled="!active">Stop timer</button>
      <button @click="resetTimer()" :disabled="active">Reset timer</button>
    </div>
    <div class="activitie">
      <button
        v-for="activity in activities"
        @click="setActivity(activity)"
        :disabled="active"
      >{{ activity }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pomodoro",
  computed: {
    time() {
      const activity = this.$store.state.activity;
      const timeInMs =
        this.$store.state.time || this.$store.state.defaults[activity].time;
      return this.convertTime(timeInMs);
    },
    active() {
      return this.$store.state.active;
    },
    activities() {
      return this.$store.state.activities;
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
    startTimer() {
      this.$store.commit("start");
    },
    stopTimer() {
      this.$store.commit("stop");
    },
    resetTimer() {
      this.$store.commit("reset");
    },
    setActivity(activity) {
      this.$store.commit("setActivity", activity);
    }
  }
};
</script>

<style>
.timer-display {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  font-size: 4rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
