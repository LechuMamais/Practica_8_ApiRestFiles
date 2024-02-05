const isAdmin = async (req, res, next) => {
  console.log('isAdmin?');
  try {
    if (req.user.rol!== 'admin'){
        return res.status(403).json("You are not authorized")
    }else{
        console.log('Usuario autenticado como admin, permitida la petición');
        next()
    }
  } catch (error) {
    return res.status(403).json("Sólo puedes realizar esta peticion si eres admin.")
  }
}

module.exports = { isAdmin }