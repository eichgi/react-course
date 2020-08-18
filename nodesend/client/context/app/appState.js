import React, {useContext, useReducer} from 'react';
import {
  MOSTRAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO,
  LIMPIAR_STATE,
} from "../../types";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "../../config/axios";

const AppState = ({children}) => {

  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: false,
    descargas: 1,
    password: '',
    autor: null,
    url: '',
  };

  const [state, dispatch] = useReducer(appReducer, initialState);
  const {mensaje_archivo, nombre, nombre_original} = state;

  const mostrarAlerta = (mensaje) => {
    console.log(mensaje);
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: mensaje,
    });

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  }

  const subirArchivo = async (formData, nombreArchivo) => {

    dispatch({
      type: SUBIR_ARCHIVO,
    });

    try {
      const response = await clienteAxios.post('/api/archivos', formData);
      console.log(response);

      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: response.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };

    try {
      const response = await clienteAxios.post('/api/enlaces', data);
      //console.log(response);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: response.data.msg,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const limpiarState = () => {
    console.log("limpiando...")
    dispatch({
      type: LIMPIAR_STATE,
    });
  };

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;