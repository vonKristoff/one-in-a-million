/**
 * Route Middleware
 */

// Wraps async Routes and evaluates if there is an error caught
exports.catchErrors = fn => {  
    return (req, res, next) => {
        const routePromise = fn(req, res, next)
        if(routePromise.catch) routePromise.catch(err => next(err))
    }
}
exports.cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}