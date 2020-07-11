import React, {useReducer} from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from './../../types';
import clienteAxios from './../../config/axios';

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
    proyecto: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //Obtener proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proyectos');
      console.log(resultado.data);

      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      const alerta = {msg: 'Hubo un error', categoria: 'alerta-error'};

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto);
      //console.log(resultado);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {msg: 'Hubo un error', categoria: 'alerta-error'};

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = async (proyectoId) => {
    try {
      const resultado = await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      console.log(resultado);

      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {msg: 'Hubo un error', categoria: 'alerta-error'};

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}>
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
