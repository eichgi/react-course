import React, {useContext} from 'react';
import tareaContext from './../../context/tareas/tareaContext';
import proyectoContext from './../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {

  const proyectosContext = useContext(proyectoContext);
  const {proyecto} = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {obtenerTareas, eliminarTarea, actualizarTarea, guardarTareaActual} = tareasContext;

  const [proyectoActual] = proyecto;

  const handleEliminarTarea = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual.id);
  };

  const cambiarEstado = (tarea) => {
    tarea.estado = !tarea.estado;
    actualizarTarea(tarea);
    obtenerTareas(proyectoActual.id);
  };

  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {
          tarea.estado
            ? (<button type="button" className="completo" onClick={() => cambiarEstado(tarea)}>Completo</button>)
            : (<button type="button" className="incompleto" onClick={() => cambiarEstado(tarea)}>Incompleto</button>)
        }
      </div>

      <div className="acciones">
        <button className="btn btn-primario" type="button" onClick={() => seleccionarTarea(tarea)}>Editar</button>
        <button className="btn btn-secundario" onClick={() => handleEliminarTarea(tarea._id)}>Eliminar</button>
      </div>
    </li>
  );
};

export default Tarea;
