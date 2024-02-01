const User = require('../api/models/user.model')
const { verifyToken } = require('../utils/token')

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return next(new Error('Unauthorized, you have no token'));
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    if (req.user.rol!== 'admin'){
        return res.status(403).json("You are not authorized")
    }else{
        console.log('Usuario authenticado como admin, permitida la petición');
        next()
    }

  } catch (error) {
    next(error)
  }
}

module.exports = { isAdmin }