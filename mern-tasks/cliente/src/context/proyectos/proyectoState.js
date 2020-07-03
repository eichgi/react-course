import React, {useReducer} from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
} from './../../types';

import {v4 as uuidv4} from 'uuid';

const ProyectoState = (props) => {

  const proyectos = [
    {id: 1, nombre: 'Tienda Virtual'},
    {id: 2, nombre: 'Infranet'},
    {id: 3, nombre: 'Diseño sitio web'},
    {id: 4, nombre: 'MERN papa'},
  ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
  };

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //Obtener proyectos
  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos
    });
  };

  const agregarProyecto = (proyecto) => {
    console.log(proyecto);
    proyecto.id = uuidv4();
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto,
    });
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorFormulario: state.errorFormulario,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
      }}>
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
