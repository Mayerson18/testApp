import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faChevronDown, 
  faBackspace, 
  faPercentage, 
  faCaretRight, 
  faCaretLeft, 
  faTimesCircle, 
  faChevronLeft,
  faCreditCard, 
  faMoneyBill, 
  faSearch, 
  faPlusCircle,
  faMinusCircle,
  faMinus,
  faPlus,
  faPercent,
  faPrint,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VModal from 'vue-js-modal'
import VueCarousel from 'vue-carousel';
import vSelect from 'vue-select'
//import VueNativeSock from 'vue-native-websocket'
import SweetModal from 'sweet-modal-vue/src/plugin'
// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'

import 'vue-select/dist/vue-select.css';
// import 'materialize-css/dist/css/materialize';
//import helperConfig from './helpers/config'

library.add(faTimesCircle)
library.add(faPlusCircle)
library.add(faChevronLeft)
library.add(faCreditCard)
library.add(faMoneyBill)
library.add(faSearch)
library.add(faPercent)
library.add(faCaretRight)
library.add(faCaretLeft)
library.add(faPercentage)
library.add(faBackspace)
library.add(faChevronDown)
library.add(faMinusCircle)
library.add(faMinus)
library.add(faPlus)
library.add(faTimes)
library.add(faPrint)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)
Vue.use(VModal)
Vue.use(VueCarousel)
Vue.use(SweetModal)
//Vue.use(Buefy)
//Vue.use(VueNativeSock, helperConfig.getUrlSocketPrinter());

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
