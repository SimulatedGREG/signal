<template>
  <div id="wrapper">
    <div
      class="notification"
      v-for="msg in msgs"
      :class="{
        'is-primary': msg.class === 'primary',
        'is-warning': msg.class === 'warning',
        'is-info': msg.class === 'info'
      }">
        <button class="delete" @click="dismiss(msg.id)"></button>
        <p class="title">{{ msg.msg }}</p>
        <p class="subtitle">{{ msg.timestamp | localeString }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        controller: this.$horizon('signals'),
        msgs: []
      }
    },
    created () {
      const msgs = this.$horizon('signals')

      msgs
        .watch()
        .subscribe(docs => {
          this.msgs = docs
        })
    },
    filters: {
      localeString (d) {
        return new Date(d).toLocaleString()
      }
    },
    methods: {
      dismiss (id) {
        this.controller.remove(id)
      }
    }
  }
</script>

<style scoped>
  #wrapper { padding: 20px; }
</style>
