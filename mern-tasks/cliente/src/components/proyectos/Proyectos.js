import React from 'react';
import Barra from './../layout/Barra';
import Sidebar from './../layout/Sidebar';
import FormTarea from './../tareas/FormTarea';
import Listado from './../tareas/Listado';

const Proyectos = () => {
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
