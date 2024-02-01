const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth.middleware')
const { isAdmin } = require('../../middlewares/isAdmin.middleware')
const { registerUser, loginUser, logoutUser, getUsers, getUsersById, getUsersByEmail } = require('../controllers/user.controller')

UserRoutes.get('/', isAdmin , getUsers)
UserRoutes.get('/:email', isAdmin , getUsersByEmail)
UserRoutes.get('/id/:id', isAdmin , getUsersById)
UserRoutes.post('/register', registerUser)
UserRoutes.put('/login', loginUser)
UserRoutes.put('/logout', isAuth, logoutUser)

module.exports = UserRoutes