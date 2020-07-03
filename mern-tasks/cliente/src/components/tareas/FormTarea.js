import React, {useContext} from 'react';
import proyectoContext from './../../context/proyectos/proyectoContext';

const FormTarea = () => {

  const proyectosContext = useContext(proyectoContext);
  const {proyecto} = proyectosContext;


  if (!proyecto) {
    return null;
  }

  const [proyectoActual] = proyecto;

  return (
    <div className="formulario">
      <form>
        <div className="contenedor-input">
          <input type="text" name="nombre" className="input-text" placeholder="Nombre tarea"/>
        </div>

        <div className="contenedor-input">
          <input type="submit" className="btn btn-block btn-primario btn-submit" value="Agregar tarea"/>
        </div>
      </form>
    </div>
  );
};

export default FormTarea;
