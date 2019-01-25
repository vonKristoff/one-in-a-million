export default {
    styleGradient() {
        return { 
            background: `linear-gradient(${this.windDirection}, ${this.tempColour} 0%, ${this.windColour} 35%, ${this.timeColour} 100%)`
        }
    },
    styleHasResults() {
        return this.hasLocation ? "is-active" : ""
    },
    styleInactive() {
        return this.hasModalView ? "has-blur" : ""
    }
}
