const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1];
  try {
    req.usuario = jwt.verify(token, process.env.SECRETA);
    res.json({usuario: req.usuario});
  } catch (error) {
    res.status(401).json({msg: 'Token inválido'});
  }
};