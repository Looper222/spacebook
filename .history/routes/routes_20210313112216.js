const { Router } = require('express');
const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');
const friendsController = require('../controllers/friendsController');
const notifController = require('../controllers/notifController');

const filesController = require('../controllers/filesController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/search', searchController.search_user);
router.post('/getUser', searchController.get_user);
router.post('/addFriend', friendsController.add_friend);
router.post('/getFriends', friendsController.get_friends);
router.post('/deleteFriend', friendsController.delete_friend);
router.post('/notifAdd', notifController.add_notif);
router.post('/notifRem', notifController.remove_notif);
router.post('/getNotif', notifController.get_notifs);


router.post('/files/upload', filesController.upload.single('file'), filesController.upload_single_file);
router.get('/files', filesController.get_files);
router.get('/files/:filename', filesController.get_single_file);
router.get('/files/img/:filename', filesController.get_single_image);


module.exports = router;