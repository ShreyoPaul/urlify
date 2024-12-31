const { Router } = require('express');
const { generateShortURL, getAllURLInfo, handleRedirectUrl, handleUrlAnalytics } = require('../controllers/shorturlControllers');

const router = Router()

router.get('/', getAllURLInfo)

router.post('/get-url', generateShortURL);

router.get('/:uid', handleRedirectUrl);

router.get('/analytics/:uid', handleUrlAnalytics);


module.exports =  router;