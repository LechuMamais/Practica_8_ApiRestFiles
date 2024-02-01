const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator  = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true, validate: [validator.isEmail, 'Email is not valid'] },
    nombreUsuario: { type: String, trim: true, required: true, unique: true },
    contraseña: { type: String, trim: true, required: true, minlength: [8, 'Password 8 characters minimum'] },
    añoNacimiento: { type: Number, trim: true, required: true },
    rol: { type: String, trim: true, required: true, enum: ["admin", "user"], default: "user"},
    imagenPerfil: { type: String, trim: true, required: true }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  try {
    this.contraseña = await bcrypt.hash(this.contraseña, 10)
    next()
  } catch (error) {
    next(error)
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;