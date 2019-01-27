import template from '../../templates/location-submit.html'
/** 
* location-submit button component
* enables reusable behaviour for buttons in the app-modal that make submit calls
* (to the weather api)
**/
export default {
    name: "location-submit",
    template,
    props: ['model', 'async'],
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
            return `fa--${this.model.label}`
        },
        validationRequired() {
            return this.model.field === "" || this.model.field.length < 3 ? "is-disabled" : ""
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
            this.$emit('request', this.model.type)
        }
    }
}
    