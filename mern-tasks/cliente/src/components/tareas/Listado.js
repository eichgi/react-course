import React, {Fragment, useContext} from 'react';
import Tarea from "./Tarea";
import proyectoContext from './../../context/proyectos/proyectoContext';

const Listado = () => {

  const proyectosContext = useContext(proyectoContext);
  const {proyecto, eliminarProyecto} = proyectosContext;

  if (!proyecto) {
    return <h2>Selecciona un proyecto</h2>;
  }

  const [proyectoActual] = proyecto;

  const tareasProyecto = [
    {nombre: 'Elegir plataforma', estado: true},
    {nombre: 'Elegir colores', estado: false},
    {nombre: 'Elegir pasarelas de pago', estado: false},
    {nombre: 'Elegir hosting', estado: true},
  ];

  let component = <li className="tarea"><p>No hay tareas</p></li>;

  if (tareasProyecto) {
    component = tareasProyecto.map(tarea => <Tarea tarea={tarea}/>);
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
