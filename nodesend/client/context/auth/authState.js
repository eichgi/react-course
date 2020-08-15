import React, {useState, useReducer} from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({children}) => {

  // State inicial
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  // create reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  const iniciarSesion = async (datos) => {
    try {
      const response = await clienteAxios.post('/api/auth', datos);
      console.log(response);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: response.data.token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA
      });
    }, 3000);
  };

  const registrarUsuario = async (datos) => {
    //console.log(datos);
    try {
      const response = await clienteAxios.post('/api/usuarios', datos);
      console.log(response);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: response.data.msg,
      });
    } catch (error) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA
      });
    }, 3000);
  }

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      tokenAuth(token);
    }

    try {
      const response = await clienteAxios.get('/api/auth');

      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: response.data.usuario,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const cerrarSesion = async () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        iniciarSesion,
        usuarioAutenticado,
        registrarUsuario,
        cerrarSesion
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;