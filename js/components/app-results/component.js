import vuex from 'vuex/dist/vuex'
import template from '../../templates/app-results.html'
import styles from './computed-styles'
// app-results component renders the background view and weather results
export default {
    name: "app-results",
    template,
    computed: {
        ...vuex.mapGetters('ui', ['hasModalView']),
        ...vuex.mapGetters('weather', ['hasLocation', 'hasWeather', 'location', 'condition', 'wind', 'validYetHasNoData']),
        windDirection() {
            return this.hasWeather ? `${this.wind.direction}deg` : "0deg"
        },
        tempColour() {
            return this.hasWeather ? getColourFromTemperature(this.condition.temperature) : `rgba(0,0,0,1)`
        },
        windColour() {
            return this.hasWeather ? getColourFromWind(this.wind.chill) : `rgba(0,0,0,1)`
        },
        timeColour() {
            return getColourFromTime()
        },
        ...styles // handle view logic based on good/insufficent data responses
    }
}
// perform some dynamic colour represention from the weather data
function getColourFromTemperature(temp) {
    let range = temp / 40 * 235
    if(range < 0) range = 235
    return `hsl(${range},100%,50%)`
}
function getColourFromWind(chill) {
    let score = 235 - chill
    return `hsl(${score},100%,50%)`
}
function getColourFromTime() {
    let hours = new Date().getHours()
    let pct = hours / 24
    let colour = Math.round(pct * 355)
    let brightness = Math.round(pct * 100)
    return `hsl(${colour}, 100%, ${brightness}%)`
}