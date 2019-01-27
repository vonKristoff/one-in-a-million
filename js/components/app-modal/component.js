import axios from 'axios/dist/axios'
import template from '../../templates/app-modal.html'
import responseMessage from '../response-message/vm'
import locationSubmit from '../location-submit/vm'
const endpoint = "http://localhost:8080/forecast"
// app-modal component works as the request settings form
// where the HTTP request is made && handled
export default {
    name: "app-modal",
    template,
    components: { locationSubmit, responseMessage },
    data() {
        return {
            hasGeolocation: navigator.geolocation ? true : false, // check browser geo location capability
            location: "",                           // v-model for input
            async: false,                           // is app making a request
            status: 0,                              // request status
            options: [                              // request button collection
                { label: "submit", type: 'location', field: false }, 
                { label: "geo", type: 'geo', field: false }, 
                { label: "random", type: 'random', field: false }
            ]
        }
    },
    created() {
        this.options[0].field = this.location // quick hack to set val as observable data
    },
    watch: {
        location: function(now) {
            this.options[0].field = this.location
        }
    },
    computed: {
        show() {
            return this.$store.state.ui.modal
        },
        response() {
            // pass response type based on respose status
            return responseLookup[this.status]
        }
    },
    methods: {
        submit(type) {
            // handle the submit flow
            if(!this.async) {
                this.status = 0
                this.debounce()
                this.getRequestPayload(type)
                .then(this.getForecastData)
                .then(this.processData)
                .catch(this.debounce)
            }
        },
        getForecastData({type, payload}) {
            // perform HTTP request
            return new Promise((resolve, reject) => {
                axios.post(`${endpoint}/${type}`, payload)
                .then(response => {
                    this.debounce()
                    resolve(response.data)
                }).catch(reject)
            })            
        },
        processData(data) {
            // consume the data in the weather store so that it is usable by the app-results component
            this.$store.dispatch('weather/update', data)
            .then(this.autoCloseModal)
            .catch(this.failedRequest)
        },        
        autoCloseModal() {
            // notify response-message component
            // auto toggle
            this.status = 200
            setTimeout(() => {
                if(this.$store.state.ui.modal) this.$store.commit('ui/toggleModalView')
                this.status = 0
            }, 1500)
        },
        failedRequest() {
            // notify response-message component
            this.status = 404
            setTimeout(() => { this.status = 0 }, 2000)
        },
        getRequestPayload(type) {
            // accepts ['geo', 'location', 'random'] as api calls
            // defines the payload expected for the given api routes
            return new Promise((resolve, reject) => {
                switch(type) {
                    case 'geo':
                        getPosition().then(position => {
                            resolve({ type, payload: { geo: { lat: position.coords.latitude, lon: position.coords.longitude }}})
                        })
                    break
                    case 'location':
                        if(this.location.length > 2) resolve({ type, payload: { location: this.location }})
                        else reject()
                    break
                    default:
                        resolve({ type, payload: { random: { lat: randomDegree(85), lon: randomDegree(180) } }})
                    break
                }
            })
        },
        close() {
            this.$store.commit('ui/closeModalView')
            this.status = 0
        },
        debounce() {
            this.async = !this.async
        }
    }
}
// lookup for setting response message
const responseLookup = {
    0: false,
    200: { success: true, class: "fa--check", message: "it's a match"},
    404: { success: false, class: "fa--cross", message: "No random data found. Try again!" }
}
// get current geo location
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}
function randomDegree(max) {
    return ((Math.random() * (max * 2)) - max).toFixed(3)
}
function generateLatLong() {
    return {
        lat: randomDegree(85),
        lon: randomDegree(180)
    }
}