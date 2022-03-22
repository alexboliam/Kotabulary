const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const vocabularyRouter = require('./vocabularyRouter')
const termRouter = require('./termRouter')

router.use('/user', userRouter)
router.use('/vocabulary', vocabularyRouter)
router.use('/term', termRouter)


module.exports = router