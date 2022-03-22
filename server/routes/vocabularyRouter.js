const Router = require('express')
const router = new Router()
const vocabularyController = require('../controllers/vocabularyController')


router.get('/', vocabularyController.getAll)
router.get('/:id', vocabularyController.getById)
router.get('/:userId', vocabularyController.getByUser)
router.post('/', vocabularyController.add)
router.put('/', vocabularyController.edit)
router.delete('/', vocabularyController.delete)


module.exports = router