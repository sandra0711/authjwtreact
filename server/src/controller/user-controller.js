require('dotenv').config()
const userService = require('../service/user-service')
const UserService = require('../service/user-service')
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const { email, password } = req.body
      const userData = await UserService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await UserService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await UserService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e);
    }
  }

  async activation(req, res, next) {
    try {
      const linkActivated = req.params.link
      userService.activate(linkActivated)
      res.redirect(CLIENT_URL)
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await UserService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers()
      return res.json(users)
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new UserController
