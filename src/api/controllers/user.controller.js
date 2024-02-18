const User = require('../models/user.model')
const cloudinary = require('cloudinary')
const bcrypt = require('bcrypt')
const { generateToken, verifyToken } = require('../../utils/token')
const { deleteImgCloudinary } = require('../../utils/deletefile.cloudinary')
//const { deleteImgCloudinary } = require('../../utils/deleteImgCloudinary')

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
    // Primero Subir la imagen a cloudinary

    const dataUri = `data:${req.files.img[0].mimetype};base64,${req.files.img[0].buffer.toString('base64')}`;
    const response = await cloudinary.uploader.upload(dataUri, {
      folder: "Proyectos_8_ApiRestFiles",
      allowedFormats: ["jpg", "png", "jpeg", "gif", "webp", "svg", "pdf"],
    });

    // Después, con la url de la imagen guardada, creamos el usuario en la BD

    const newUserCompleted = {...req.body, img:response.url}
    const user = new User(newUserCompleted);
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

async function updateImg(req, res, next) {
  // Sólo se puede modificar la imagen del usuario propio, con el que se haya logueado
  // Por lo tanto para updatear la img solo necesitamos el token y la imagen nueva.
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {return res.status(401).json('Necesitas estar logueado para hacer esta petición')}
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    const newImg = req.file.path;
    const userToUpdate = await User.findById(decoded.id);
    deleteImgCloudinary(userToUpdate.img);
    userToUpdate.img = newImg;
    userUpdated = await User.findByIdAndUpdate(decoded.id, userToUpdate, {new:true})
    return res.status(201).json(userToUpdate);
  } catch (error) {
    return res.status(403).json("error: " + error.message)
  }
}

module.exports = { getUsers, getUsersByEmail, getUsersById, registerUser, loginUser, logoutUser, makeAdmin, changeRol, updateImg }