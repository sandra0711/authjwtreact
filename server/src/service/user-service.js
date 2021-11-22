const bcrypt = require('bcrypt')
const uuid = require('uuid')

const User = require('../models/user-model')

class UserService {

  async registration(email, password) {
    const candidate = User.findOne({ email })
    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже есть в системе`)
    }
    const hashPass = bcrypt.hash(password, 7)
    const activatedLink = uuid.v4()
    const user = await User.create({ email, password: hashPass, activatedLink })
  }


}

module.exports = new UserService
