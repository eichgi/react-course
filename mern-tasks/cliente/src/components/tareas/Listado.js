import React, {Fragment} from 'react';
import Tarea from "./Tarea";

const Listado = () => {

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
      <h2>Proyecto: Tienda Virtual</h2>

      <ul className="listado-tareas">
        {component}
      </ul>

      <button type="button" className="btn btn-eliminar">Eliminar proyecto &times;</button>
    </Fragment>
  );
};

export default Listado;
