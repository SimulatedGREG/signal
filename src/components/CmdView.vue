<template>
  <div id="wrapper">
    <div class="columns is-multiline">
      <div class="column is-6" v-for="signal in signals">
        <p
          class="title notification is-unselectable"
          :class="{
            'is-primary': signal.class === 'primary',
            'is-warning': signal.class === 'warning',
            'is-info': signal.class === 'info'
          }"
          @click="send(signal)">
            {{ signal.msg }}
        </p>
      </div>
    </div>
    <span class="tag is-large is-dark">
      {{ notificationsCount }} un-dismissed signals
    </span>
  </div>
</template>

<script>
  export default {
    created () {
      this.msgs.watch().subscribe(
        docs => {
          this.notificationsCount = docs.length
        }
      )
    },
    data () {
      return {
        msgs: this.$horizon('signals'),
        notificationsCount: 0,
        signals: require('src/signals').default
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
    height: 100%;
    font-size: 36px;
    padding: 40px;
    transition: all 100ms ease-in-out;

    &:active {
      opacity: .7;
      transform: scale(.92);
    }
  }
</style>
