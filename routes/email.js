const {Router} = require('express')
const {sendEmailTo, sendEmailToKino} = require('../services/sendEmail')
const router = Router();

router.post('/send', sendEmailTo)
router.post('/notification', sendEmailToKino)

module.exports = router;