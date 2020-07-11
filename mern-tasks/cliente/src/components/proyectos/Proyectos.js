import React, {useContext, useEffect} from 'react';
import Barra from './../layout/Barra';
import Sidebar from './../layout/Sidebar';
import FormTarea from './../tareas/FormTarea';
import Listado from './../tareas/Listado';

import AuthContext from './../../context/autenticacion/authContext';

const Proyectos = () => {

  const authContext = useContext(AuthContext);
  const {usuarioAutenticado} = authContext;

  useEffect(
    () => {
      usuarioAutenticado();
      // eslint-disable-next-line
    }, []
  );

  return (
    <div>
      <div className="contenedor-app">
        <Sidebar/>

        <div className="seccion-principal">
          <Barra/>

          <main>
            <FormTarea/>

            <div className="contenedor-tareas">
              <Listado/>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
