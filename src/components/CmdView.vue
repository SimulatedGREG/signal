<template>
  <div id="wrapper">
    <div class="columns is-multiline">
      <div class="column is-3" v-for="signal in signals">
        <p
          class="title notification is-unselectable"
          :class="{
            'is-primary': signal.class === 'primary',
            'is-warning': signal.class === 'warning'
          }"
          @click="send(signal)">
            {{ signal.msg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msgs: this.$horizon('signals'),
        signals: [
          {
            msg: 'Raise Speaker Volume',
            class: 'primary'
          },
          {
            msg: 'Lower Speaker Volume',
            class: 'primary'
          },
          {
            msg: 'Raise Vocals Volume',
            class: 'warning'
          },
          {
            msg: 'Lower Vocals Volume',
            class: 'warning'
          }
        ]
      }
    },
    methods: {
      send (signal) {
        this.msgs.store({
          ...signal,
          timestamp: new Date()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #wrapper { padding: 20px; }

  .notification {
    cursor: pointer;
    transition: all 100ms ease-in-out;

    &:active {
      opacity: .7;
      transform: scale(.92);
    }
  }
</style>
