const { Router } = require('express');
const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');
const friendsController = require('../controllers/friendsController');
const notifController = require('../controllers/notifController');
const filesController = require('../controllers/filesController');
const statusController = require('../controllers/statusController');

const router = Router();

// @controller authController
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/', (req, res) => {
    res.redirect('/login');
});
router.get('/login', (req, res) => {
    res.send('index.html');
});

// @controller searchController
router.post('/search', searchController.search_user);
router.post('/getUser', searchController.get_user);

// @controller friendsController
router.post('/addFriend', friendsController.add_friend);
router.post('/getFriends', friendsController.get_friends);
router.post('/deleteFriend', friendsController.delete_friend);

// @controller notifController
router.post('/notifAdd', notifController.add_notif);
router.post('/notifRem', notifController.remove_notif);
router.post('/getNotif', notifController.get_notifs);

// @controller filesController
router.post('/files/upload', filesController.upload.single('file'), filesController.upload_single_file);
router.get('/files', filesController.get_files);
router.get('/files/:filename', filesController.get_single_file);
router.get('/files/img/:filename', filesController.get_single_image);
router.delete('/files/del/:id', filesController.delete_single_file);

// @controller statusController
router.post('/trial', statusController.trial_add_lastContacts);


module.exports = router;