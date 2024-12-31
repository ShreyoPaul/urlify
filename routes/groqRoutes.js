const { Router } = require('express');
const { handlerGroq } = require('../controllers/groqControllers');
const { authenticate } = require('../utils/authenticate');

const router = Router();

router.get('/', authenticate, handlerGroq);

module.exports =  router;