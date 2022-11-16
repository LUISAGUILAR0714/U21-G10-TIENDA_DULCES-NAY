const { Router } = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

let router = Router();

// Posts
router.get('/post/list/:search?', postController.listPosts );
router.get('/post/:id', postController.findPost );
router.post( '/post/save' , authController.verifyToken, postController.savePost );
router.put('/post/:id', authController.verifyToken, postController.updatePost );
router.delete('/post/:id', authController.verifyToken, postController.deletePost );

// Auth
router.post('/auth/login', authController.login);
router.post('/auth/verify', authController.verifyToken, authController.verify);

// Users
router.get('/user/list/:search?', userController.listUsers );
router.get('/user/:id', userController.findUser );
router.post( '/user/save' , userController.saveUser );
router.delete('/user/:id', authController.verifyToken, userController.deleteUser );

module.exports = router;
