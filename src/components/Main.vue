<template>
  <div class="main">
    <div class="player1">player1</div>
    <div class="player2">player2</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null
    }
  },
  created () {
    this.a = new this.$card['Alligator']({ state: 'library' })
    this.b = new this.$card['Alligator']({ state: 'library' })
    this.c = new this.$card['Alligator']({ state: 'library' })
    this.d = new this.$card['Alligator']({ state: 'library' })
    this.e = new this.$card['Alligator']({ state: 'library' })
  }
}
</script>

<style lang="scss">
.main {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .player1 {
    position: fixed;
    left: 50%;
    top: 0;
    transform: translate3d(-50%, 0, 0);
  }
  .player2 {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
