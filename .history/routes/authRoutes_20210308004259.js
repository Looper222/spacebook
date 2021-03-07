const { Router } = require('express');
const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');
// const newSearchController = require('../controllers/searchController');
const friendsController = require('../controllers/friendsController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/search', searchController.search_user);
router.post('/getUser', searchController.get_user);
router.post('/addFriend', friendsController.add_friend);
router.post('/getFriends', friendsController.get_friends);
router.post('/deleteFriend', friendsController.delete_friend);

module.exports = router;