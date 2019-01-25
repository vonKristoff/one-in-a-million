import template from '../../templates/app-navigation.html'
// app-navigation component acts as a top level nav bar to toggle the app-modal
export default {
    name: "app-navigation",
    template,
    computed: {
        styleActive() {
            return this.$store.state.ui.modal ? "is-active" : ""
        }
    },
    methods: {
        toggleModal() {
            this.$store.commit('ui/toggleModalView')
        }
    }
}
