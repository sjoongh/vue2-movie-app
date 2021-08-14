import 'regenerator-runtime'
import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/routes'
import loadImage from '@/plugins/loadImage'

// 플러그인 등록
Vue.use(loadImage)

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})