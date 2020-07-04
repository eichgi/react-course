import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from './../../context/proyectos/proyectoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const Listado = () => {

  // Extraer proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const {proyectos, obtenerProyectos} = proyectosContext;

  useEffect(
    () => {
      obtenerProyectos();
      // eslint-disable-next-line
    }, []
  );

  if (!proyectos.length) return <p>No tienes ningún proyecto</p>;

  return (
    <div>
      <ul className="listado-proyectos">
        <TransitionGroup>
          {
            proyectos.map(proyecto => (
              <CSSTransition key={proyecto.id} timeout={200} classNames="proyecto">
                <Proyecto proyecto={proyecto}/>
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      </ul>
    </div>
  );
};

export default Listado;
