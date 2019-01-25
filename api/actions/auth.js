const OAuth = require('oauth')
const config = require('./../config.js')
const header = { "Yahoo-App-Id": config.oauth.appId }
const params = [
    null,
    null,
    config.oauth.clientKey,
    config.oauth.clientSecret,
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
]

exports.getSigniture = function() { 
    return new OAuth.OAuth(...params) 
}