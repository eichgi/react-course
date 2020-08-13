const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});
const {validationResult} = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {
  //Check for errors
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({errores: errores.array()});
  }

  //Search for user
  const {email, password} = req.body;
  const usuario = await Usuario.findOne({email});

  if (!usuario) {
    res.status(401).json({msg: 'El usuario no existe'});
    return next();
  }

  //Validate password and authenticate the user
  if (!bcrypt.compareSync(password, usuario.password)) {
    res.status(401).json({msg: 'Credenciales incorrectas'});
    return next();
  }

  //Create JWT
  const token = jwt.sign({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
    },
    process.env.SECRETA,
    {
      expiresIn: '8h',
    });
  //console.log(token);
  res.json({token});
};

exports.usuarioAutenticado = (req, res) => {
  return res.json({usuario: req.usuario});
};