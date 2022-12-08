import Vue from 'vue'
import App from './App.vue'
import './index.css'
import './assets/tailwind.css'
// import '.'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
