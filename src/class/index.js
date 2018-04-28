import Alligator from './Beast/alligator'

const CARD = {
  Alligator
}

const card = {
  install: function (Vue, Options) {
    Object.defineProperty(Vue.prototype, '$card', {value: CARD})
  }
}

export default card
