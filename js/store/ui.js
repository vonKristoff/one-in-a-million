export default {
    namespaced: true,
    state: {
        modal: false
    },
    getters: {
        hasModalView(state) {
            return state.modal
        }
    },
    mutations: {
        toggleModalView(state) {
            state.modal = !state.modal
        },
        closeModalView(state) {
            state.modal = false
        }
    },
    actions: {}
}