import template from '../../templates/response-message.html'
// HTTP response-message component
// executes in the app-modal once a HTTP request has been made
export default {
    name: "response-message",
    template,
    props: ['model'],
    computed: {
        classStatus() {
            return this.model.success ? "has-success" : ""
        }
    }
}
