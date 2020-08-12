import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const Formulario = ({crearCita}) => {

  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  });

  const [error, guardarError] = useState(false);

  const {mascota, propietario, fecha, hora, sintomas} = cita;

  const actualizarState = (e) => {
    const nuevaCita = {
      ...cita,
      [e.target.name]: e.target.value,
    }

    actualizarCita(nuevaCita);
  };

  const submitCita = (e) => {
    e.preventDefault();

    if (mascota.trim() === "" || propietario.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === "") {
      guardarError(true);
      return;
    }

    guardarError(false);
    cita.id = uuidv4();
    crearCita(cita);
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: '',
    })
  };

  return (
    <Fragment>
      <h2>Crear cita</h2>

      {error
        ? <p className="alerta-error">Todos los campos son obligatorios</p>
        : null
      }

      <form onSubmit={submitCita}>
        <label htmlFor="">Nombre Mascota</label>
        <input type="text"
               name="mascota"
               className="u-full-width"
               placeholder="Nombre de la mascota"
               onChange={actualizarState}
               value={mascota}
        />

        <label htmlFor="">Nombre Dueño</label>
        <input type="text"
               name="propietario"
               className="u-full-width"
               placeholder="Nombre del dueño"
               onChange={actualizarState}
               value={propietario}
        />

        <label htmlFor="">Fecha</label>
        <input type="date"
               name="fecha"
               className="u-full-width"
               onChange={actualizarState}
               value={fecha}
        />

        <label htmlFor="">Hora</label>
        <input type="time"
               name="hora"
               className="u-full-width"
               onChange={actualizarState}
               value={hora}
        />

        <label htmlFor="">Síntomas</label>
        <textarea className="u-full-width" name="sintomas" value={sintomas} onChange={actualizarState}></textarea>

        <button type="submit" className="u-full-width button-primary">Agregar cita</button>
      </form>
    </Fragment>
  );
};

export default Formulario;