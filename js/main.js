import Vue from 'vue/dist/vue'
import {store} from './vx'
import appNavigation from './components/app-navigation/component'
import appResults from './components/app-results/component'
import appModal from './components/app-modal/component'

window.app = new Vue({
    el: "#root",
    store,
    components: { appNavigation, appResults, appModal }
})