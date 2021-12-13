<template>
  <div class="countdown">
    <div>noch</div>
    <div class="countdown__block">
      <div class="countdown__digit">{{ minutes | twoDigits }}</div>
    </div>
    <span class="dot">:</span>
    <div class="countdown__block">
      <div class="countdown__digit">{{ seconds | twoDigits }}</div>
    </div>
    <div>
      <div>bis Tipp</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'countdown',
  props: {
    date: null
  },
  data () {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      event: this.date,
      finish: false
    }
  },
  mounted () {
    const _self = this
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
      if (!this.finish && this.calculatedDate - this.now <= 0) {
        _self.finish = true
        _self.$emit('onFinish')
      }
    }, 1000)
  },
  computed: {
    secondCount () {
      return this.calculatedDate - this.now
    },
    calculatedDate () {
      return Math.trunc(Date.parse(this.event) / 1000)
    },
    seconds () {
      if (this.secondCount < 0) return 0
      return this.secondCount % 60
    },
    minutes () {
      if (this.secondCount < 0) return 0
      return Math.trunc(this.secondCount / 60) % 60
    },
  },
  filters: {
    twoDigits (value) {
      if (value.toString().length <= 1) {
        return '0' + value.toString()
      }
      return value.toString()
    }
  }
}
</script>
<style lang="scss">
.countdown{
  display: flex;
  justify-content: center;
  align-items: center;
  .dot {
    font-weight:bold;
    line-height:1;
    padding-bottom: 2px;
  }
  &__block {
    text-align: center;
    padding:0 5px;
    position: relative;
    &:first-child{
      padding-left: 0;
    }
    &:last-child{
      padding-right: 0;
    }
  }
  &__text {
    text-transform: uppercase;
  }
  &__digit {
    font-weight: bold;
    line-height: 1;
  }
}
</style>
