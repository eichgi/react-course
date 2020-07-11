const Tarea = require('./../models/Tarea');
const Proyecto = require('./../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearTarea = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array()});
  }

  const {proyecto: proyectoID} = req.body;

  try {
    const proyecto = await Proyecto.findById(proyectoID);

    if (!proyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'});
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'});
    }

    const tarea = new Tarea(req.body);
    await tarea.save();

    return res.json({tarea});

  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

exports.obtenerTareas = async (req, res) => {

  //const {proyecto: proyectoID} = req.body;
  const {proyecto: proyectoID} = req.query;

  try {
    const proyecto = await Proyecto.findById(proyectoID);

    if (!proyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'});
    }

    const tareas = await Tarea.find({proyecto: proyectoID}).sort({creado: -1});
    return res.json({tareas});

  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const {proyecto: proyectoID, nombre, estado} = req.body;

    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(494).json({msg: 'No existe la tarea'});
    }

    const proyecto = await Proyecto.findById(proyectoID);

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'});
    }


    const nuevaTarea = {};
    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});

    return res.json({tarea});

  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const {proyecto: proyectoID} = req.query;

    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(494).json({msg: 'No existe la tarea'});
    }

    const proyecto = await Proyecto.findById(proyectoID);

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'});
    }

    await Tarea.findOneAndRemove({_id: req.params.id});

    res.json({msg: 'Tarea eliminada'});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};
