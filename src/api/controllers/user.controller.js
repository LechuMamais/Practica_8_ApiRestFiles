const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/token')

async function getUsers(req, res, next) {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return next(error)
  }
}

async function getUsersByEmail(req, res, next) {
  try {
    const user = await User.findOne({ email: req.params.email })
    return res.status(200).json(user)
  } catch (error) {
    return next(error)
  }
}
async function getUsersById(req, res, next) {
  try {
    const user = await User.findOne({ id: req.params.id })
    return res.status(200).json(user)
  } catch (error) {
    return next(error)
  }
}
async function registerUser(req, res, next) {
  try {
    const user = new User(req.body)
    const userExist = await User.findOne({ email: user.email })
    if (userExist) return next(new Error('User already exists'))

    const userDB = await user.save()
    return res.status(201).json(userDB)
  } catch (error) {
    return next(error)
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new Error())
    if (bcrypt.compareSync(req.body.contraseña, user.contraseña)) {
      const token = generateToken(user._id, user.email)
      return res.status(200).json(token)
    }
  } catch (error) {
    return next(error)
  }
}

function logoutUser(req, res, next) {
  try {
    const token = null
    return res.status(201).json(token)
  } catch (error) {
    return next(error)
  }
}

module.exports = { getUsers, getUsersByEmail, getUsersById , registerUser, loginUser, logoutUser }