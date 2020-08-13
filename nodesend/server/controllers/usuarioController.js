const Usuario = require('./../models/Usuario');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

exports.nuevoUsuario = async (req, res) => {

  //Mostrar mensajes de error
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(422).json({errores: errores.array()});
  }

  const {email, password} = req.body;

  let usuario = await Usuario.findOne({email});

  if (usuario) {
    return res.status(400).json({msg: 'El usuario ya esta registrado'});
  }

  //Create new user
  usuario = new Usuario(req.body);
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  try {
    await usuario.save();
    res.json({msg: 'Usuario creado correctamente'});
  } catch (error) {
    console.log(error);
  }
};