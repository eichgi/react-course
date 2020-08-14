import React, {useState, useReducer} from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
} from "../../types";
import clienteAxios from "../../config/axios";

const AuthState = ({children}) => {

  // State inicial
  const initialState = {
    token: '',
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  // create reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

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

  const usuarioAutenticado = (nombre) => {
    dispatch({
      type: USUARIO_AUTENTICADO,
      payload: nombre,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        usuarioAutenticado,
        registrarUsuario,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;