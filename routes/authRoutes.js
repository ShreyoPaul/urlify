const { Router } = require('express');
const { loginUser, registerUser } = require('../controllers/usersController');


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;