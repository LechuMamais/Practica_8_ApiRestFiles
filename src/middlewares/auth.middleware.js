const User = require('../api/models/user.model')
const { verifyToken } = require('../utils/token')

const isAuth = async (req, res, next) => {
  console.log('isAuth?');
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return next(new Error('Unauthorized, you have no token'));
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.id);
    req.user = user;
    console.log("Usuario autenticado como registrado");
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { isAuth };