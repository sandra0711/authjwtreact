const { Router } = require('express')
const userController = require('../controller/user-controller')
const router = new Router()

router.post('/register', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activation)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)

module.exports = router
