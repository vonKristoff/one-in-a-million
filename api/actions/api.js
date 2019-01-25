const auth = require('./auth')
const endpoint = "https://weather-ydn-yql.media.yahoo.com/forecastrss"

exports.getForecastByLocation = location => {
    let signedRequest = auth.getSigniture()
    return new Promise((resolve, reject) => {
        signedRequest.get(`${endpoint}?location=${location}&format=json&u=c`, null, null, 
        (err, data, result) => {
            if(err) reject(err)
            else resolve(JSON.parse(data))
        })
    })
}

exports.getForecastByGeoLocation = geo => {
    // console.log(geo)
    let signedRequest = auth.getSigniture()
    return new Promise((resolve, reject) => {
        signedRequest.get(`${endpoint}?lat=${geo.lat}&lon=${geo.lon}&format=json&u=c`, null, null, 
        (err, data, result) => {
            if(err) reject(err)
            else resolve(JSON.parse(data))
        })
    })
}