const bcrypt = require('bcrypt')
const uuid = require('uuid')
const ApiError = require('../exceptions/api-error')

const User = require('../models/user-model')
const MailService = require('./mail-service')
const tokenService = require('./token-service')
const TokenService = require('./token-service')

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email })
    if (candidate) throw ApiError.BadRequest('Такой email уже зарегистрирован в системе')
    const hashPass = await bcrypt.hash(password, 7)
    const activatedLink = uuid.v4()
    const user = await User.create({ email, password: hashPass, activatedLink })
    await MailService.sendActivationMail(email, activatedLink)
    const tokens = TokenService.generateToken({ userId: user._id, email: user.email, activatedLink: user.activatedLink })
    await TokenService.saveToken(user._id, tokens.refreshToken)
    return { ...tokens, user }
  }

  async login(email, password) {
    const user = await User.findOne({ email })
    if (!user) throw ApiError.BadRequest('Пользователь с таким email не зарегистрирован')
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) throw ApiError.BadRequest('Неверный пароль')
    const tokens = TokenService.generateToken({ userId: user._id, email: user.email, activatedLink: user.activatedLink })
    await TokenService.saveToken(user._id, tokens.refreshToken)
    return { ...tokens, user }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async activate(activatedLink) {
    const user = await User.findOne({ activatedLink })
    if (!user) {
      throw ApiError.BadRequest('Неверная ссылка')
    }
    user.isActivated = true
    await user.save()
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = tokenService.findToken(refreshToken)
    if (!userData || tokenFromDb) throw ApiError.UnauthorizedError()

    const user = await User.findById(userData.userId)
    const tokens = TokenService.generateToken({ userId: user._id, email: user.email, activatedLink: user.activatedLink })
    await TokenService.saveToken(user._id, tokens.refreshToken)
    return { ...tokens, user }
  }

  async getAllUsers() {
    const users = User.find()
    return users
  }
}

module.exports = new UserService()
