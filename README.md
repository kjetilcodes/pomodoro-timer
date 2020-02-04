# pomodoro-timer

## My pomodoro-timer vue-component.

I wanted to detach from my pomodoro-timer on my phone, and any online ones.
And why not?
This will be my first project where i'll follow up and add more features as i need them.

## Standalone: 
  - Clone repository and:
    - yarn dev
    or
    - npm run dev

## Add to project:
  - Dependencies: 
    - Vue 
    - npm --save-dev sass-loader node-sass

### !! Vuex needs to run in module-mode, it's the same as running without, except the outermost store-object must have the prop "modules:".

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import pomodoro from './pomodoro'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ...pomodoro,
    moduleB: {
      state: {},
      mutations:{}
    }
  }
})

```
This makes sense if you look at the pomodoro.js store file and pomodoro.vue as it calls the store mutations and getters via state.pomodoro


## todo: 
 - Make an event that triggers when countdown is done, make it return an object with the information about the countdown
 - Add sessions?
