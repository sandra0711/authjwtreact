require('dotenv').config()
const userService = require('../service/user-service')
const UserService = require('../service/user-service')

class UserController {

  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await UserService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      console.log(e);
    }

  }

  async login(req, res, next) {
    try {

    } catch (e) {
      console.log(e);
    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {
      console.log(e);
    }
  }

  async activation(req, res, next) {
    try {
      const linkActivated = req.params.link
      userService.activate(linkActivated)
      res.redirect(CLIENT_URL)
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      return res.json(['123', '456'])
    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = new UserController
