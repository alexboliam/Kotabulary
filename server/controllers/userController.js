const ApiError = require('../errors/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJwt = (id, username, fullname) => {
    return jwt.sign({ id, username, fullname },
        process.env.SECRET_KEY, { expiresIn: '14d' }
    )
}
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
        const user = await User.create({ username, fullname: fullname, password: hashPassword })
        const token = generateJwt(user.id, user.username, user.fullname)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { username, password } = req.body
        const user = await User.findOne({ where: { username } })
        if (!user) {
            return next(ApiError.internal('Неверные имя пользователя или пароль'))
        }
        let comparedPassword = bcrypt.compareSync(password, user.password)
        if (!comparedPassword) {
            return next(ApiError.internal('Неверные имя пользователя или пароль'))
        }
        const token = generateJwt(user.id, user.username, user.fullname)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.username, req.user.fullname)
        return res.json({ token })
    }
}

module.exports = new UserController()