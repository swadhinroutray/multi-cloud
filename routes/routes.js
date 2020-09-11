const router = require('express').Router()
const controller = require('./controller.js')

router.post('/putddoc', controller.CreateDoc)
router.get('/getdocs',controller.GetDocs)

module.exports = router;