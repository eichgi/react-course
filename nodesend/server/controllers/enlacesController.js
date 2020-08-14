const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

exports.nuevoEnlace = async (req, res, next) => {
  //check for errors
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({errores: errores.array()});
  }

  //Store link
  const {nombre_original} = req.body;
  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;

  if (req.usuario) {
    const {password, descargas} = req.body;

    if (descargas) {
      enlace.descargas = descargas;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }

    enlace.autor = req.usuario.id;
  }

  try {
    await enlace.save();
    return res.json({msg: `${enlace.url}`});
  } catch (error) {
    console.log(error)
  }
};

//create link
exports.obtenerEnlace = async (req, res, next) => {
  const {url} = req.params;

  const enlace = await Enlaces.findOne({url});

  if (!enlace) {
    res.status(404).json({msg: 'Enlace inexistente'});
  }

  res.json({archivo: enlace.nombre});

  if (enlace.descargas === 1) {

    //Delete file & link
    req.archivo = enlace.nombre_original;
    await Enlaces.findOneAndRemove({url});

    next();

  } else {
    enlace.descargas--;
    await enlace.save();
  }
};