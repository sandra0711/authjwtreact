require('dotenv').config()
const jwt = require('jsonwebtoken')
const Token = require('../models/token-model')

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '5m' })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '1d' })
    return {
      accessToken,
      refreshToken
    }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await tokenData.save()
    }
    const token = await Token.create({
      user: userId,
      refreshToken
    })
    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken })
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken })
    return tokenData
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_SECRET)
      console.log(userData);
      return userData
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService()
