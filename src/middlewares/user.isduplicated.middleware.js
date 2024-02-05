const User = require("../api/models/user.model.js");
const multer = require("multer");

const upload = multer();

const userDuplicated = async (req, res, next) => {
  const user = await User.findOne({ nombreUsuario: req.body.nombreUsuario });
  
  if (user) {
    return res.status(400).json("Usuario ya existente");
  }
  next();
};

const handleFormData = upload.fields([
  { name: "email" },
  { name: "nombreUsuario" },
  { name: "contraseña" },
  { name: "añoNacimiento" },
  { name: "rol" },
  { name: "imagenPerfil" }
]);

module.exports = { userDuplicated, handleFormData };