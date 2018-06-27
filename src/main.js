// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './assets/v.js'

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,//通过根组件的注入方式，我们在子组件中只需要用this.$store就可以访问了State单一状态树了
  router,
  components: { App },
  template: '<App/>'
})
