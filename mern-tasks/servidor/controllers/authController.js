const Usuario = require('./../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.autenticarUsuario = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array()});
  }

  const {email, password} = req.body;

  try {
    let usuario = await Usuario.findOne({email});

    if (!usuario) {
      return res.status(404).json({msg: 'El usuario no existe'});
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(403).json({msg: 'Password incorrecto'});
    }

    const payload = {
      usuario: {
        id: usuario.id,

      }
    };

    jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600,
    }, (error, token) => {
      if (error) throw error;
      res.json({msg: 'Login exitoso', token});
    });

  } catch (error) {

  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');

    if (!usuario) {
      return res.status(500).json({msg: 'Usuario inexistente'});
    }

    return res.json({usuario});

  } catch (error) {
    console.log(error);

    return res.status(500).json({msg: 'Hubo un error'});
  }
};
