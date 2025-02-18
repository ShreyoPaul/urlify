const { Router } = require('express');
const { generateShortURL, getAllURLInfo, handleRedirectUrl, handleUrlAnalytics, getAllMyURL } = require('../controllers/shorturlControllers');
const { authenticate } = require('../utils/authenticate');

const router = Router()

router.get('/', getAllURLInfo)

router.get('/all', authenticate, getAllMyURL)

router.post('/get-url', authenticate, generateShortURL);

router.get('/:uid', handleRedirectUrl);

router.get('/analytics/:uid', handleUrlAnalytics);


module.exports =  router;