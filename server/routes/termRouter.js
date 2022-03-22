const Router = require('express')
const router = new Router()
const termController = require('../controllers/termController')


router.get('/', termController.getAll)
router.get('/:id', termController.getById)
router.get('/:vocabularyId', termController.getByVocabularyId)
router.post('/', termController.add)
router.put('/', termController.edit)
router.delete('/', termController.delete)


module.exports = router