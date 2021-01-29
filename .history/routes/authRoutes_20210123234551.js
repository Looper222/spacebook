const { Router } = require('express');
const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/search', )

module.exports = router;