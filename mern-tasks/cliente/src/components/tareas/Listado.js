import React, {Fragment, useContext} from 'react';
import Tarea from "./Tarea";
import proyectoContext from './../../context/proyectos/proyectoContext';
import tareaContext from './../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const Listado = () => {

  const proyectosContext = useContext(proyectoContext);
  const {proyecto, eliminarProyecto} = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {tareasProyecto} = tareasContext;

  if (!proyecto) {
    return <h2>Selecciona un proyecto</h2>;
  }

  const [proyectoActual] = proyecto;

  let component = <li className="tarea"><p>No hay tareas</p></li>;

  if (tareasProyecto) {
    component = <TransitionGroup>
      {tareasProyecto.map(tarea => (
        <CSSTransition key={tarea.id} timeout={200} classNames="tarea">
          <Tarea tarea={tarea}/>
        </CSSTransition>
      ))}
    </TransitionGroup>;
  }

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="listado-tareas">
        {component}
      </ul>

      <button type="button" className="btn btn-eliminar" onClick={() => eliminarProyecto(proyectoActual.id)}>Eliminar
        proyecto &times;</button>
    </Fragment>
  );
};

export default Listado;
