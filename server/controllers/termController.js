const ApiError = require("../errors/apiError")
const { Term, VocabularyTerm, Vocabulary } = require("../models/models")

class TermController {
    async getAll(req, res, next) {
        let { vocabularyId } = req.query
        let terms
        if (!vocabularyId) {
            terms = await Term.findAll()
        } else {
            terms = await Term.findAll({ include: [{ model: Vocabulary, where: { id: vocabularyId }, through: { attributes: [] } }] })
        }
        if (terms.length > 0) {
            return res.json(terms)
        } else {
            return next(ApiError.badRequest('Записей не существует'))
        }
    }
    async getById(req, res, next) {
        let { id } = req.params
        let term = await Term.findByPk(id)
        if (term) {
            return res.json(term)
        } else {
            return next(ApiError.badRequest('Запись не найдена'))
        }
    }
    async add(req, res) {
        let { word, translation, description, descTranslation, vocabularyId } = req.body
        let term = await Term.create({ word, translation, description, descTranslation })
        let join = await VocabularyTerm.create({ termId: term.id, vocabularyId: vocabularyId })
        return res.json({ term })
    }
    async edit(req, res, next) {
        const { id, word, translation, description, descTranslation } = req.body
        let compareArray = [word, translation, description, descTranslation]
        let term = await Term.findByPk(id)
        let comparison = compareArray.filter(x => !Object.values(term.dataValues).includes(x))
        if (comparison.length > 0) {
            let updated = await Term.update({ word, translation, description, descTranslation }, { where: { id } })
            return res.json({ updated })
        } else {
            return next(ApiError.badRequest('Поля остались неизменны'))
        }
    }
    async delete(req, res, next) {
        const { id } = req.body
        let deleted = await Term.destroy({ where: { id } })
        if (deleted > 0) {
            return res.json({ deleted })
        } else {
            return next(ApiError.badRequest("Запись с указанным Id не была удалена"))
        }
    }
}

module.exports = new TermController()