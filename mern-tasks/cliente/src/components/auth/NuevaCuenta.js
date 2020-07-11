import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from './../../context/alertas/alertaContext';
import AuthContext from './../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertaContext;

  const authContext = useContext(AuthContext);
  const {mensaje, autenticado, registrarUsuario} = authContext;

  useEffect(
    () => {
      if (autenticado) {
        props.history.push('/proyectos');
      }

      if (mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria);
      }

      // eslint-disable-next-line
    }, [mensaje, autenticado, props.history],
  );

  const [usuario, guardarUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: '',
  });

  const {nombre, email, password, confirmar} = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    if (password.length < 6) {
      mostrarAlerta('El password debe contener al menos 6 caracteres', 'alerta-error');
      return;
    }

    if (password !== confirmar) {
      mostrarAlerta('El password y la confirmación deben ser iguales', 'alerta-error');
      return;
    }

    registrarUsuario({nombre, email, password});
  };

  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      {/*{alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}*/}
      <div className="contenedor-form sombra-dark">
        <h1>Registro</h1>

        <form onSubmit={onSubmit}>

          <div className="campo-form">
            <label htmlFor="nombre">Nombre:</label>
            <input id="nombre" type="text" name="nombre" value={nombre} placeholder="Tu nombre" onChange={onChange}/>
          </div>

          <div className="campo-form">
            <label htmlFor="email">Correo:</label>
            <input id="email" type="email" name="email" value={email} placeholder="Tu email" onChange={onChange}/>
          </div>

          <div className="campo-form">
            <label htmlFor="password">Contraseña:</label>
            <input id="password" type="password" name="password" value={password} placeholder="Tu contraseña"
                   onChange={onChange}/>
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Repetir contraseña:</label>
            <input id="confirmar" type="password" name="confirmar" value={confirmar} placeholder="Tu contraseña"
                   onChange={onChange}/>
          </div>

          <div className="campo-form">
            <input type="submit" className="btn btn-primario btn-block" value="Iniciar sesión"/>
          </div>

        </form>

        <Link to={'/'} className="enlace-cuenta">Iniciar sesión</Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
