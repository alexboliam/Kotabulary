const Router = require('express')
const router = new Router()
const vocabularyController = require('../controllers/vocabularyController')


router.get('/', vocabularyController.getAll)
router.post('/', vocabularyController.add)
router.put('/', vocabularyController.edit)
router.delete('/', vocabularyController.delete)


module.exports = router