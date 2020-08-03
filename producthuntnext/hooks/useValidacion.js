import React, {useState, useEffect} from 'react';

const UseValidacion = (stateInicial, validar, fn) => {
  const [valores, guardarValores] = useState(stateInicial);
  const [errores, guardarErrores] = useState({});
  const [submitForm, guardarSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;

      if (noErrores) {
        fn();
      }

      guardarSubmitForm(false);
    }
  }, [errores]);

  //Función que se ejecuta conforme el usuario escribe algo
  const handleChange = (e) => {
    guardarValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  //Función que se ejecuta al submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  };

  //Cuando se realizar el evento blur
  const handleBlur = () => {
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  };

  return {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  }
};

export default UseValidacion;