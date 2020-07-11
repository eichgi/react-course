import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from './../../context/proyectos/proyectoContext';
import alertaContext from './../../context/alertas/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const Listado = () => {

  // Extraer proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const {mensaje, proyectos, obtenerProyectos} = proyectosContext;

  const AlertaContext = useContext(alertaContext);
  const {alerta, mostrarAlerta} = AlertaContext;

  useEffect(
    () => {

      //Si hay error
      if (mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria);
      }

      obtenerProyectos();
      // eslint-disable-next-line
    }, [mensaje]
  );

  if (!proyectos.length) return <p>No tienes ningún proyecto</p>;

  return (
    <div>
      <ul className="listado-proyectos">
        {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
        <TransitionGroup>
          {
            proyectos.map(proyecto => (
              <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
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
