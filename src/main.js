import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'

import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(VueMeta, {
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
})

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
