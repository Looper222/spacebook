const { Router } = require('express');
const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');
const newSearchController = require('../controllers/newSearchController');
const addFriendsController = require('../controllers/addFriendsController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/search', newSearchController.new_search_user);
router.post('/oldSearch', searchController.search_user);
router.post('/getUser', newSearchController.get_user);
router.post('/addFriend', addFriendsController.add_friend);

module.exports = router;