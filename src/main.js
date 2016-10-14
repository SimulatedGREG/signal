import Vue from 'vue'
import Router from 'vue-router'
import Horizon from '@horizon/client'
import 'bulma'

import App from './App'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

const horizon = new Horizon({ host: '192.168.1.251:8181' })
horizon.onReady(() => {
  Vue.prototype.$horizon = horizon

  /* eslint-disable no-new */
  new Vue({
    router,
    el: '#app',
    ...App
  })
})
horizon.connect()
