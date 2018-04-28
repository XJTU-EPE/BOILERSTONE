<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  props: {
    initAggressivity: {
      type: Number,
      default: 0
    },
    initHP: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      aggressivity: this.initAggressivity,
      HP: this.initHP
    }
  }
}
</script>

<style>

</style>
