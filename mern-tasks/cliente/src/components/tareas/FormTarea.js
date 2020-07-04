import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from './../../context/proyectos/proyectoContext';
import tareaContext from './../../context/tareas/tareaContext';

const FormTarea = () => {

  const proyectosContext = useContext(proyectoContext);
  const {proyecto} = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea} = tareasContext;

  useEffect(
    () => {
      if (tareaSeleccionada !== null) {
        guardarTarea(tareaSeleccionada);
      } else {
        guardarTarea({nombre: ''});
      }
    }, [tareaSeleccionada],
  );

  const [tarea, guardarTarea] = useState({
    nombre: '',
  });

  const {nombre} = tarea;

  if (!proyecto) {
    return null;
  }

  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!nombre) {
      validarTarea();
      return;
    }

    if (tareaSeleccionada === null) {
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
    }

    obtenerTareas(proyectoActual.id);

    guardarTarea({
      nombre: '',
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input type="text" name="nombre" className="input-text" placeholder="Nombre tarea" value={nombre}
                 onChange={handleChange}/>
        </div>

        <div className="contenedor-input">
          <input type="submit" className="btn btn-block btn-primario btn-submit"
                 value={tareaSeleccionada ? 'Editar tarea' : 'Agregar tarea'}/>
        </div>
      </form>

      {errorTarea
        ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
        : null
      }
    </div>
  );
};

export default FormTarea;
