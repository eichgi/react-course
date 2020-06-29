import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

  const [idReceta, guardarIdReceta] = useState(null);
  const [receta, guardarReceta] = useState({});

  useEffect(
    () => {
      const obtenerReceta = async () => {
        if (!idReceta) return;

        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
        const respuesta = await axios.get(url);
        //console.log(respuesta);
        guardarReceta(respuesta.data.drinks[0]);
      };

      obtenerReceta();

    }, [idReceta]
  )

  return (
    <ModalContext.Provider
      value={{
        guardarReceta,
        guardarIdReceta,
        recetaData: receta,
      }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

