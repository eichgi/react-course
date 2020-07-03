import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from './../../context/proyectos/proyectoContext';

const Listado = () => {

  // Extraer proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const {proyectos, obtenerProyectos} = proyectosContext;

  useEffect(
    () => {
      obtenerProyectos();
    }, []
  );

  if (!proyectos.length) return <p>No tienes ningún proyecto</p>;

  return (
    <div>
      <ul className="listado-proyectos">
        {
          proyectos.map(proyecto => (<Proyecto key={proyecto.id} proyecto={proyecto}/>))
        }
      </ul>
    </div>
  );
};

export default Listado;
