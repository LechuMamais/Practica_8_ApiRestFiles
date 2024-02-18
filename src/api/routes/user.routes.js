const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth.middleware')
const { upload } = require('../../middlewares/uploadfiles.middleware.js')
const { isAdmin } = require('../../middlewares/isAdmin.middleware')
const { registerUser, loginUser, logoutUser, getUsers, getUsersById, getUsersByEmail, makeAdmin, changeRol, updateImg } = require('../controllers/user.controller')
const { checkDuplicated } = require('../../middlewares/user.isduplicated.middleware.js')
const { handleFormData } = require('../../utils/handleFormData.js')

UserRoutes.get('/', [isAuth, isAdmin] , getUsers)
UserRoutes.get('/:email', [isAuth, isAdmin] , getUsersByEmail)
UserRoutes.get('/id/:id', [isAuth, isAdmin] , getUsersById)
UserRoutes.post('/register', handleFormData, checkDuplicated, registerUser)
// Hasta ahora el único problema que tengo es con el handleFormData, que no logro hacer que funcione.
// La idea sería que sólo se pueda subir la imagen a cloudinary una vez chequeado que el usuario no se encuentre registrado ya.
// Pero lo ideal, sería que no se carguen en cloudinary muchas imagenes al darle muchas veces a send con el mismo formulario
// En clase Santi lo hizo con un handleFormData similar al que tengo acá, pero me salta un error que no logro arreglar.
// Finalmente el problema fue resuelto haciendo el upload de la img en el mismo controller, en Base64
UserRoutes.put('/login', loginUser)
UserRoutes.put('/logout', isAuth, logoutUser)
UserRoutes.put('/newadmin/:id', [isAuth, isAdmin] , makeAdmin)
UserRoutes.put('/changerol/:id', [isAuth, isAdmin] , changeRol)
UserRoutes.put('/updateimg', [isAuth] , upload.single('img') , updateImg)

module.exports = UserRoutes

/* Este error daba, ya está solucionado
Error: Unexpected end of form
    at Multipart._final (C:\Users\Lechu\Documents\Desarrollo-web\ThePower\Modulo_3\Practica_8_ApiRestFiles\node_modules\busboy\lib\types\multipart.js:588:17)
    at callFinal (node:internal/streams/writable:698:12)
    at prefinish (node:internal/streams/writable:710:7)
    at finishMaybe (node:internal/streams/writable:720:5)
    at Writable.end (node:internal/streams/writable:634:5)
    at onend (node:internal/streams/readable:705:10)
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
*/