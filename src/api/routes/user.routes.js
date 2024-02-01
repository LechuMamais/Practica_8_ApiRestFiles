const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth.middleware')
const { isAdmin } = require('../../middlewares/isadmin.middleware')
const { registerUser, loginUser, logoutUser, getUsers, getUsersById, getUsersByEmail, makeAdmin, changeRol } = require('../controllers/user.controller')

UserRoutes.get('/', [isAuth, isAdmin] , getUsers)
UserRoutes.get('/:email', [isAuth, isAdmin] , getUsersByEmail)
UserRoutes.get('/id/:id', [isAuth, isAdmin] , getUsersById)
UserRoutes.post('/register', registerUser)
UserRoutes.put('/login', loginUser)
UserRoutes.put('/logout', isAuth, logoutUser)
UserRoutes.put('/newadmin/:id', [isAuth, isAdmin] , makeAdmin)
UserRoutes.put('/changerol/:id', [isAuth, isAdmin] , changeRol)


module.exports = UserRoutes