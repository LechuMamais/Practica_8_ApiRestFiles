const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator  = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true, validate: [validator.isEmail, 'Email is not valid'] },
    nombreUsuario: { type: String, trim: true, required: true, unique: true },
    contrasena: { type: String, trim: true, required: true, minlength: [8, 'Password 8 characters minimum'] },
    anoNacimiento: { type: Number, trim: true, required: true },
    rol: { type: String, trim: true, required: true, enum: ["admin", "user"], default: "user"},
    img: { type: String, trim: true, required: true }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  try {
    this.contrasena = await bcrypt.hash(this.contrasena, 10)
    next()
  } catch (error) {
    next(error)
  }
});

const User = mongoose.model('users', userSchema, 'users');
module.exports = User;