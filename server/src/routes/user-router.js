const { Router } = require('express')
const { body } = require('express-validator')
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/error-middleware');
const router = new Router()

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 8 }),
  userController.registration);

router.post('/login', userController.login);

router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activation)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers);
router.get('/users', userController.getUsers)

module.exports = router
