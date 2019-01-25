import Vue from 'vue/dist/vue'
import Vuex from 'vuex/dist/vuex'
import ui from './store/ui'
import weather from './store/weather'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        ui,
        weather
    }
})  

export {store}