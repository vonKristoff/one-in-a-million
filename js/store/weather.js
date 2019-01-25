export default {
    namespaced: true,
    state: {
        location: false,
        stats: false,
        forecast: []
    },
    getters: {
        hasLocation(state) {
            return state.location != false
        },
        hasWeather(state) {
            return state.stats != false
        },
        validYetHasNoData(state, getters) {
            return getters.hasLocation && state.stats === false && state.forecast.length === 0
        },
        location(state) {
            return state.location
        },
        condition(state) {
            return state.stats.condition
        },
        wind(state) {
            return state.stats.wind
        }
    },
    mutations: {
        update(state, payload) {
            state.location = Object.keys(payload.location).length > 0 ? payload.location : false
            state.stats = Object.keys(payload.current_observation).length > 0 ? payload.current_observation : false
            state.forecast = Object.keys(payload.forecasts).length > 0 ? payload.forecasts : []
        }
    },
    actions: {
        update({ commit }, payload) {
            return new Promise((resolve, reject) => {
                console.log(payload)
                commit('update', payload)
                if(Object.keys(payload.location).length > 0) resolve()
                else reject()    
            })
        }
    }
}