const { Router } = require('express');
const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');
const newSearchController = require('../controllers/newSearchController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/search', newsearchController.new_search_user);
router.post('/oldSearch', SearchController.search_user);

module.exports = router;