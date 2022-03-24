const { Vocabulary } = require('../models/models')
const ApiError = require('../errors/apiError')

class VocabularyController {
    async getAll(req, res) {
        let { id, creatorId } = req.query
        let vocabularies
        if (!id && !creatorId) {
            vocabularies = await Vocabulary.findAll()
        }
        if (!id && creatorId) {
            vocabularies = await Vocabulary.findAll({ where: { creatorId } })
        }
        if (id && !creatorId) {
            vocabularies = await Vocabulary.findByPk(id)
        }

        return res.json(vocabularies)
    }
    async add(req, res) {
        const { name, language, creatorId } = req.body
        const vocabulary = await Vocabulary.create({ name, language, creatorId })
        return res.json(vocabulary)
    }
    async edit(req, res) {
        Vocabulary.update()
    }
    async delete(req, res) {

    }
}

module.exports = new VocabularyController()