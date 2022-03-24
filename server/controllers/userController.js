const ApiError = require('../errors/apiError')
const bcrypt = require('bcrypt')
const { User } = require('../models/models')

class UserController {
    async register(req, res, next) {
        const { username, fullname, password } = req.body

        if (!username || !password) {
            return next(ApiError.badRequest('Некорректные данные'))
        }

        const candidate = await User.findOne({ where: { username } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким username уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
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