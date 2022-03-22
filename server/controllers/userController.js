const ApiError = require('../errors/apiError')

class UserController {
    async register(req, res) {

    }
    async login(req, res) {

    }
    async check(req, res, next) {
        const { id } = req.query
        if (!id) {
            return next(ApiError.badRequest('Id is missing'))
        }
        res.json(id)
    }
}

module.exports = new UserController()