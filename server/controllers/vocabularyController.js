const { Vocabulary } = require('../models/models')
const ApiError = require('../errors/apiError')

class VocabularyController {
    async getAll(req, res) {
        let { creatorId } = req.query
        let vocabularies
        if (!creatorId) {
            vocabularies = await Vocabulary.findAll()
        } else {
            vocabularies = await Vocabulary.findAll({ where: { creatorId } })
        }

        return res.json(vocabularies)
    }
    async getById(req, res) {
        let { id } = req.params
        let vocabulary = await Vocabulary.findByPk(id)
        return res.json(vocabulary)
    }
    async add(req, res) {
        const { name, language, creatorId } = req.body
        const vocabulary = await Vocabulary.create({ name, language, creatorId })
        return res.json(vocabulary)
    }
    async edit(req, res, next) {
        const { id, name, language } = req.body
        let compareArray = [name, language]
        let vocabulary = await Vocabulary.findByPk(id)
        let comparison = compareArray.filter(x => !Object.values(vocabulary.dataValues).includes(x))
        if (comparison.length > 0) {
            let updated = await Vocabulary.update({ name, language }, { where: { id } })
            return res.json({ updated })
        } else {
            return next(ApiError.badRequest('Поля остались неизменны'))
        }

    }
    async delete(req, res, next) {
        const { id } = req.body
        let deleted = await Vocabulary.destroy({ where: { id } })
        if (deleted > 0) {
            return res.json({ deleted })
        } else {
            return next(ApiError.badRequest("Словарь с указанным Id не был удален"))
        }
    }
}

module.exports = new VocabularyController()