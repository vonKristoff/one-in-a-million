// Handle Errors -> next use stauts lookup
module.exports = (err, req, res, next) => {
    // handling server error
    res.json(err)
}