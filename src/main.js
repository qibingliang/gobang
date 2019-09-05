import Vue from 'vue'
import App from './App.vue'
import _ from 'lodash'

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$lodash', { value: _ })

new Vue({
    render: h => h(App),
}).$mount('#app')