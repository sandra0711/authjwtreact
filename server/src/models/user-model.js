const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activatedLink: { type: String }
})

module.exports = model('User', UserSchema)
