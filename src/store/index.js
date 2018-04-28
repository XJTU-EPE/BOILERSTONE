import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stepLock: 1,
    targetLock: [0, 1]
  },
  mutations: {
    resetScrollTop (state, data) {
      state.scrollTop = data
    },
    resetStepLock (state, data) {
      state.stepLock = data
    }
  }
})
