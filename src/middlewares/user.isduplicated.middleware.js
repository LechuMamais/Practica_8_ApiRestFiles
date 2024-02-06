// He hecho un middleware para comprobar si el usuario está registrado ya o no.
// El objetivo final era que no se enviasen muchas imagenes a cloudinary desde el registro si se le da muchas veces a send.
// Pero claro, no ha funcionado, porque pasa un tiempo entre el primer click y el registro del nuevo usuario en la bd
// Al final, este middleware funcionaría para indicar si hay un usuario ya registrado en la bd con ese nombre y ese email
// Pero, por algún misterio que no he podido develar, el req le llega vacío asique directamente opté por no usarla.

const multer = require('multer');
const uploadNone = multer().none();

const User = require("../api/models/user.model.js");

const checkDuplicated = async (req, res, next) => {
  console.log('checkDuplicated');
  try {
    console.log(req.body);
    const checkDuplicatedByNombreUsuario = await User.findOne({ nombreUsuario: req.body.nombreUsuario });
    if (checkDuplicatedByNombreUsuario) {
      console.log('Nombre de usuario ya existente');
      return res.status(400).json("Nombre de usuario ya existente");
    } else {
      const checkDuplicatedByEmail = await User.findOne({ email: req.body.email });
      if (checkDuplicatedByEmail) {
        console.log('Ya existe un usuario registrado con este email');
        return res.status(400).json("Ya existe un usuario registrado con este email");
      } else { next() }
    }

  } catch (error) {
    return res.status(500).json({ error: 'Error al procesar el formulario' });
  }
}


module.exports = { checkDuplicated, uploadNone };