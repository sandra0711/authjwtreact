require('dotenv').config()
const UserService = require('../services/user-service')
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/error-api');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie('aaa', 'ssss')
      console.log(userData.refreshToken);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: false, domain: '/', });

      return res.json(userData)
    } catch (e) {
      next(e);
    }
  };

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { expires: new Date(Date.now() + 900000), httpOnly: false, domain: '/', });
      console.log(req.cookies)
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      console.log('это куки', req.cookies);
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activation(req, res, next) {
    try {
      const linkActivated = req.params.link;
      UserService.activate(linkActivated);
      res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await UserService.refresh(refreshToken);
      console.log(userData.refreshToken);
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
