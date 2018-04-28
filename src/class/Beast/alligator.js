import { Beast } from '../race.js'

class Alligator extends Beast {
  constructor (obj) {
    super(obj)
    let proto = Object.getPrototypeOf(this)
    if (typeof proto.cardId === 'undefined') {
      proto.ATK = 3
      proto.DEF = 0
      proto.HP = 2
      proto.cost = 2
      proto.name = '淡水鳄'
      proto.cardId = 0
    }
  }
}

export default Alligator
