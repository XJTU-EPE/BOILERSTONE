<template>
  <div class="main">
    <button class="player1">player1</button>
    <button class="player2">player2</button>
    <button class="end-round">结束回合</button>
    <button class="ground"></button>
    <div class="opponent-table">
      <button class="card-in-table"></button>
      <button class="card-in-table"></button>
      <button class="card-in-table"></button>
    </div>
    <div class="self-table">
      <button class="card-in-table"></button>
      <button class="card-in-table"></button>
      <button class="card-in-table"></button>
      <button class="card-in-table"></button>
      <button class="card-in-table"></button>
      <button class="card-in-table"></button>
    </div>
    <div class="opponent-hand">
      <button class="card-in-hand"></button>
    </div>
    <div class="self-hand">
      <button class="card-in-hand"></button>
      <button class="card-in-hand"></button>
      <button class="card-in-hand"></button>
      <button class="card-in-hand"></button>
      <button class="card-in-hand"></button>
    </div>
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
button {
  outline: none;
  // border: none;
  box-shadow: 3px 5px 15px rgba(0, 0, 0, .5);
}
.main {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .player1 {
    position: fixed;
    height: 20%;
    left: 50%;
    top: 0;
    transform: translate3d(-50%, 0, 0);
    z-index: 100;
  }
  .player2 {
    position: fixed;
    height: 20%;
    left: 50%;
    bottom: 0;
    transform: translate3d(-50%, 0, 0);
    z-index: 100;
  }
  .end-round {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    z-index: 100;
  }
  .ground {
    position: fixed;
    height: 70%;
    width: 100%;
    left: 0;
    top: 15%;
    z-index: 50;
  }

  .opponent-table {
    display: flex;
    justify-content: center;
    height: 0;
    .card-in-table {
      top: 23vh;
    }
  }
  .self-table {
    display: flex;
    justify-content: center;
    height: 0;
    .card-in-table {
      top: 52vh;
    }
  }
  .card-in-table {
    position: relative;
    width: 10%;
    height: 25vh;
    border-radius: 50%;
    z-index: 100;
    margin: 0 2px;
  }

  .opponent-hand {
    display: flex;
    justify-content: flex-start;
    height: 0;
    .card-in-hand {
      top: 0;
    }
  }
  .self-hand {
    display: flex;
    justify-content: flex-end;
    transition: all 1s;
    height: 0;
    .card-in-hand {
      top: 82vh;
    }
  }
  .card-in-hand {
    position: relative;
    width: 5%;
    height: 15vh;
    z-index: 200;
    margin: 1vh;
  }
}
</style>
