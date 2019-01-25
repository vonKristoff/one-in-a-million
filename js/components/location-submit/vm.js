import template from '../../templates/location-submit.html'
import classes from './computed-classes'
/** 
* location-submit button component
* enables reusable behaviour for buttons in the app-modal that make submit calls
* (to the weather api)
**/
export default {
    name: "location-submit",
    template,
    props: ['type', 'async'],
    data() {
        return {
            pressed: false,
        }
    },
    computed: {
        isFetching() {
            return this.pressed && this.async ? "is-fetching" : ""
        },
        iconClass() {
            return `fa--${Lookup[this.type]}`
        },
        label() {
            return Lookup[this.type]
        }
    },
    watch: {
        async: function(now, old) {
            if(old && this.pressed) this.pressed = false
        }
    },
    methods: {
        submit() {
            this.pressed = true
            this.$emit('submit', this.type)
        }
    }
}
const Lookup = {
    location: "submit",
    geo: "geo",
    random: "random"
}