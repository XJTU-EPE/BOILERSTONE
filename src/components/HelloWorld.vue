<template>
  <div class="hello">
    <div id="player1">
      <div>{{player1starUsable}}/{{player1star}}</div>
      <div @click="playerFn(1)" :class="{active: stepLock > 0}" class="HP">player1-HP:{{player1HP}}</div>
      <div @click="endFn(1)" class="end">结束回合</div>
      <div class="hand">
        <span
          v-for="(item, i) in player1HandList"
          @click="handCardFn(1, i)"
          :key="i">
          ({{item.aggressivity}}/{{item.HP}})⭐{{item.star}}
        </span>
      </div>
      <div class="table">
        <span
          v-for="(item, i) in player1TableList"
          :class="{active: activeIndex===i + 1 && side === 1, disable: !item.active}"
          @click="tableCardFn(1, i)"
          :key="i">
          ({{item.aggressivity}}/{{item.HP}})⭐{{item.star}}
        </span>
      </div>
    </div>
    <div id="player2">
      <div>{{player2starUsable}}/{{player2star}}</div>
      <div @click="playerFn(-1)" :class="{active: stepLock < 0}" class="HP">player2-HP:{{player2HP}}</div>
      <div @click="endFn(-1)" class="end">结束回合</div>
      <div class="hand">
        <span
          v-for="(item, i) in player2HandList"
          @click="handCardFn(-1, i)"
          :key="i">
          ({{item.aggressivity}}/{{item.HP}})⭐{{item.star}}
        </span>
      </div>
      <div class="table">
        <span
          :class="{active: activeIndex===i + 1 && side === -1, disable: !item.active}"
          v-for="(item, i) in player2TableList"
          @click="tableCardFn(-1, i)"
          :key="i">
          ({{item.aggressivity}}/{{item.HP}})⭐{{item.star}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      player1HP: 20,
      player2HP: 20,
      player1star: 1,
      player1starUsable: 1,
      player2star: 1,
      player2starUsable: 1,
      player1HandList: [],
      player2HandList: [],
      player1TableList: [],
      player2TableList: [],
      library: [
        {id: 0, aggressivity: 4, HP: 2, star: 2, active: true},
        {id: 1, aggressivity: 2, HP: 3, star: 1, active: true}
      ],
      targetType: false,
      activeRole: null,
      activeIndex: 0,
      side: 1,

      a: null,
      b: null,
      c: null,
      d: null,
      e: null
    }
  },
  computed: {
    stepLock () {
      return this.$store.state.stepLock
    },
    targetLock () {
      return this.$store.state.targetLock
    }
  },
  methods: {
    deal () {
      let result
      let tempCard = this.library[Math.floor(Math.random() * this.library.length)]
      result = {
        id: tempCard.id,
        aggressivity: tempCard.aggressivity,
        HP: tempCard.HP,
        star: tempCard.star,
        active: tempCard.active
      }
      if (this.stepLock === 1) {
        this.player1HandList.push(result)
      } else if (this.stepLock === -1) {
        this.player2HandList.push(result)
      }
      this.next()
    },
    playerFn (role) {
      if (role * this.stepLock < 0) {
        if (!this.targetType) return
        this.activeRole.active = false
        if (role > 0) {
          this.player1HP -= this.activeRole.aggressivity
          if (this.player1HP <= 0) {
            alert('GAME OVER')
            window.reload()
          }
        } else {
          this.player2HP -= this.activeRole.aggressivity
          if (this.player2HP <= 0) {
            alert('GAME OVER')
            window.reload()
          }
        }
        this.activeRole = null
        this.activeIndex = 0
      }
    },
    handCardFn (role, i) {
      if (role * this.stepLock < 0) return
      if (Math.abs(this.stepLock) === 1) return
      if (Math.abs(this.stepLock) === 2) {
        if (this.stepLock > 0) {
          if (this.player1starUsable >= this.player1HandList[i].star) {
            this.player1starUsable -= this.player1HandList[i].star
            this.player1TableList.push(this.player1HandList[i])
            this.player1HandList = this.player1HandList.filter((item, index) => {
              return index !== i
            })
          }
        } else {
          if (this.player2starUsable >= this.player2HandList[i].star) {
            this.player2starUsable -= this.player2HandList[i].star
            this.player2TableList.push(this.player2HandList[i])
            this.player2HandList = this.player2HandList.filter((item, index) => {
              return index !== i
            })
          }
        }
      }
    },
    tableCardFn (role, i) {
      if (role * this.stepLock < 0) {
        if (!this.targetType) return
        this.activeRole.active = false
        if (role > 0) {
          this.player1TableList[i].HP -= this.activeRole.aggressivity
          this.activeRole.HP -= this.player1TableList[i].aggressivity
          if (this.player1TableList[i].HP <= 0) {
            this.player1TableList = this.player1TableList.filter((item, index) => {
              return index !== i
            })
          }
          if (this.activeRole.HP <= 0) {
            this.player2TableList = this.player2TableList.filter((item, index) => {
              return index !== this.activeIndex - 1
            })
          }
        } else {
          this.player2TableList[i].HP -= this.activeRole.aggressivity
          this.activeRole.HP -= this.player2TableList[i].aggressivity
          if (this.player1TableList[i].HP <= 0) {
            this.player2TableList = this.player2TableList.filter((item, index) => {
              return index !== i
            })
          }
          if (this.activeRole.HP <= 0) {
            this.player1TableList = this.player1TableList.filter((item, index) => {
              return index !== this.activeIndex - 1
            })
          }
        }

        this.activeRole = null
        this.activeIndex = 0
      } else {
        if (role > 0) {
          if (!this.player1TableList[i].active) return
          this.side = 1
          this.activeIndex = i + 1
          this.activeRole = this.player1TableList[i]
        } else {
          if (!this.player2TableList[i].active) return
          this.side = -1
          this.activeIndex = i + 1
          this.activeRole = this.player2TableList[i]
        }
        this.targetType = true
      }
    },
    endFn (role) {
      if (role * this.stepLock < 0) return
      this.next()
      this.targetType = false
      this.activeRole = null
      this.activeIndex = 0
      this.player1TableList.forEach(item => {
        item.active = true
      })
      this.player2TableList.forEach(item => {
        item.active = true
      })
      this.deal()
    },
    next () {
      switch (this.stepLock) {
        case 1 :
          this.$store.commit('resetStepLock', 2)
          break
        case 2 :
          this.player1star++
          this.player1starUsable = this.player1star
          this.$store.commit('resetStepLock', -1)
          break
        case -1 :
          this.$store.commit('resetStepLock', -2)
          break
        case -2 :
          this.player2star++
          this.player2starUsable = this.player2star
          this.$store.commit('resetStepLock', 1)
          break
      }
    }
  },
  created () {
    this.deal()
    this.a = new this.$card['Alligator']({ state: 'library' })
    this.b = new this.$card['Alligator']({ state: 'library' })
    this.c = new this.$card['Alligator']({ state: 'library' })
    this.d = new this.$card['Alligator']({ state: 'library' })
    this.e = new this.$card['Alligator']({ state: 'library' })
  }
}
</script>

<style scoped lang="scss">
.hello {
  display: flex;
  justify-content: space-between;
  .HP,
  .end {
    height: 60px;
    width: 324px;
    background-color: #ccc;
    margin: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  .HP.active {
    background-color: red;
    color: #fff;
  }
  .table,
  .hand {
    display: flex;
    justify-content: flex-start;
    span {
      box-sizing: border-box;
      width: 100px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      margin: 3px;
      cursor: pointer;
      user-select: none;
    }
  }
  .hand span {
    background-color: #000;
    color: #fff;
  }
  .table .active {
    background: red;
  }
  .table .disable {
    background-color: #999;
  }
}
</style>
