import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from './../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, guardarProyecto] = useState({
    nombre: '',
  });

  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const {nombre} = proyecto;

  const onSubmit = e => {
    e.preventDefault();

    if (nombre === '') {
      mostrarError();
      return;
    }

    agregarProyecto(proyecto);

    guardarProyecto({nombre: ''});
  };

  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario"
              onClick={mostrarFormulario}>Nuevo proyecto
      </button>


      {
        formulario
          ? <form className="formulario-nuevo-proyecto" onSubmit={onSubmit}>
            <input type="text" className="input-text" placeholder="Nombre del proyecto" name="nombre" value={nombre}
                   onChange={onChangeProyecto}/>

            <input type="submit" className="btn btn-primario btn-block" value="Agregar proyecto"/>
          </form>
          : null
      }

      {errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
    </Fragment>
  );
};

export default NuevoProyecto;
