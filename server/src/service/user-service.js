const bcrypt = require('bcrypt')
const uuid = require('uuid')

const User = require('../models/user-model')
const MailService = require('./mail-service')
const TokenService = require('./token-service')

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email })
    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже есть в системе`)
    }
    const hashPass = await bcrypt.hash(password, 7)
    const activatedLink = uuid.v4()
    const user = await User.create({ email, password: hashPass, activatedLink })
    await MailService.sendActivationMail(email, activatedLink)
    const tokens = TokenService.generateToken({ userId: user._id, email: user.email, activatedLink: user.activatedLink })
    await TokenService.saveToken(user._id, tokens.refreshToken)
    return { ...tokens, user }
  }

  async activate(activatedLink) {
    const user = await User.findOne({ activatedLink })
    if (!user) {
      throw new Error('Неверная ссылка')
    }
    user.isActivated = true
    await user.save()
  }
}

module.exports = new UserService()
