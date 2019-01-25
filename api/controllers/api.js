const action = require('../actions/api')

// Route Controller methods for /api 

exports.location = async (req, res) => {    
    const data = await action.getForecastByLocation(req.body.location)
    console.log("successful standard request made <- returning JSON to client")
    res.json(data)
}
exports.geo = async (req, res) => {   
    const data = await action.getForecastByGeoLocation(req.body.geo)
    console.log("successful geo request made <- returning JSON to client")
    res.json(data)
}
exports.random = async (req, res) => {
    console.log(req.body)
    const data = await action.getForecastByGeoLocation(req.body.random)
    console.log("successful random request made <- returning JSON to client")
    res.json(data)
}