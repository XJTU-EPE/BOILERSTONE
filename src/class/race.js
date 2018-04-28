import { Card } from './card.js'

class Beast extends Card {
  constructor (obj) {
    super(obj.state)
  }
}

class Dragon extends Card {
  constructor (obj) {
    super(obj.state)
  }
}

class Human extends Card {
  constructor (obj) {
    super(obj.state)
  }
}

export {
  Beast,
  Dragon,
  Human
}
