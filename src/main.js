import Vue from 'vue'
import App from './App.vue'
import i18n from '@/plugins/i18n'
import './index.css'
import './assets/tailwind.css'
// import '.'

Vue.config.productionTip = false



new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
