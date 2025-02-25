const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader  = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message:'Unauthorized Access'
    });
  }
  const token = authHeader.slice(7);

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded;

    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    if (currentTime > expirationTime) {
      return res.status(401).json({ message: 'Token expired' });
    }
    next()

  }catch(error){
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }  }
}

const verifyUser = (req, res, next) => {
  console.log("nomerinduk" + req.user.nomerInduk)
  if (req.user.nomerInduk == req.params.id || req.user.nomerInduk === req.query.uid) {
    next();
    console.log("user verified")

  } else {
    return res.status(403).json({ message: 'Forbidden User' });
  }
};

const requireRole = (...requiredRoles) => {//... => untuk nerima multiple argumen lebih dr 1
  return (req, res, next) => {
    if (requiredRoles.some(role => req.user.roles.includes(role))) {
      next();
      console.log("role verified")

    } else {
      return res.status(403).json({ message: 'Forbidden Role' });
    }
  };
};
module.exports = {
  verifyToken,
  verifyUser,
  requireRole
};
