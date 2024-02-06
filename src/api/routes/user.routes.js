const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth.middleware')
const { upload } = require('../../middlewares/uploadfiles.middleware.js')
const { isAdmin } = require('../../middlewares/isAdmin.middleware')
const { registerUser, loginUser, logoutUser, getUsers, getUsersById, getUsersByEmail, makeAdmin, changeRol, updateImg } = require('../controllers/user.controller')
//const { userDuplicated, handleFormData } = require('../../middlewares/user.Isduplicated.middleware')
const { checkDuplicated, uploadNone } = require('../../middlewares/user.isduplicated.middleware.js')

UserRoutes.get('/', [isAuth, isAdmin] , getUsers)
UserRoutes.get('/:email', [isAuth, isAdmin] , getUsersByEmail)
UserRoutes.get('/id/:id', [isAuth, isAdmin] , getUsersById)
UserRoutes.post('/register', uploadNone, checkDuplicated, upload.single('img'), registerUser)
UserRoutes.put('/login', loginUser)
UserRoutes.put('/logout', isAuth, logoutUser)
UserRoutes.put('/newadmin/:id', [isAuth, isAdmin] , makeAdmin)
UserRoutes.put('/changerol/:id', [isAuth, isAdmin] , changeRol)
UserRoutes.put('/updateimg', [isAuth] , upload.single('img') , updateImg)

module.exports = UserRoutes