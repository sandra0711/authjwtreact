require('dotenv').config()
const jwt = require('jsonwebtoken')
const Token = require('../models/token-model');

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' })
    return {
      accessToken,
      refreshToken
    };
  };

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken })
    return token
  };


};

module.exports = new TokenService();
