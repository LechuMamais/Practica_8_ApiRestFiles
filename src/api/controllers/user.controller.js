const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/token')
const { deleteImgCloudinary } = require('../../middlewares/ficherosfiles.middleware')

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
    const newUserCompleted = {...req.body, img:req.file.path}
    const user = new User(newUserCompleted);

    /*const userExist = await User.findOne({ email: user.email })
    if (userExist)  {
      deleteImgCloudinary(req?.file?.path)  // Esto para que borre la imagen ya subida
      return next(new Error('User already exists'))
    }*/

    const userDB = await user.save()
    return res.status(201).json(userDB)
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Mongoose validation error (e.g., required field missing)
      return res.status(400).json({ error: error.message });
    } else if (error.code === 11000) {
      // Duplicate key error (e.g., unique constraint violation)
      return res.status(409).json({ error: 'Duplicate key error. Email or username already exists.' });
    } else {
      // Generic error handling
      return next(error);
    }
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new Error())
    if (bcrypt.compareSync(req.body.contrasena, user.contrasena)) {
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

async function makeAdmin(req, res, next) {
  try {
    console.log(req.params.id);
    const { id } = req.params 
    //const user = await User.findById(req.user._id) // usuario realizando la peticion, viejo admin
    const newAdmin = await User.findById(id);// id del nuevo admin
    newAdmin.rol = "admin"; // Le damos el rol de admin
    const newAdminUpdated = await User.findByIdAndUpdate(id, newAdmin, { new: true })  // y lo updateamos
    return res.status(201).json(newAdminUpdated)
  } catch (error) {
    return res.status(403).json(
      "error: " + error.message
    )
  }
}

async function changeRol(req, res, next) {
  try {
    console.log(req.params.id);
    const { id } = req.params;
    const newRol = req.body.newRol;
    const UserToChange = await User.findById(id);// id del nuevo admin
    UserToChange.rol = newRol; // Le damos el nuevo rol, que llega por ewl body de la peticion
    const UserToChangeUpdated = await User.findByIdAndUpdate(id, UserToChange, { new: true });  // y lo updateamos
    return res.status(201).json(UserToChangeUpdated);
  } catch (error) {
    return res.status(403).json(
      "error: " + error.message
    )
  }
}

module.exports = { getUsers, getUsersByEmail, getUsersById, registerUser, loginUser, logoutUser, makeAdmin, changeRol }