const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth.middleware')
const { upload } = require('../../middlewares/ficherosfiles.middleware')
const { isAdmin } = require('../../middlewares/isAdmin.middleware')
const { userDuplicated, handleFormData } = require('../../middlewares/user.Isduplicated.middleware')
const { registerUser, loginUser, logoutUser, getUsers, getUsersById, getUsersByEmail, makeAdmin, changeRol } = require('../controllers/user.controller')

UserRoutes.get('/', [isAuth, isAdmin] , getUsers)
UserRoutes.get('/:email', [isAuth, isAdmin] , getUsersByEmail)
UserRoutes.get('/id/:id', [isAuth, isAdmin] , getUsersById)
UserRoutes.post('/register', upload.single('img') , registerUser)
UserRoutes.put('/login', loginUser)
UserRoutes.put('/logout', isAuth, logoutUser)
UserRoutes.put('/newadmin/:id', [isAuth, isAdmin] , makeAdmin)
UserRoutes.put('/changerol/:id', [isAuth, isAdmin] , changeRol)


module.exports = UserRoutes