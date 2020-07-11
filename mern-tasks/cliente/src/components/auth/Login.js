import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from './../../context/alertas/alertaContext';
import AuthContext from './../../context/autenticacion/authContext';

const Login = (props) => {

  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertaContext;

  const authContext = useContext(AuthContext);
  const {mensaje, autenticado, iniciarSesion} = authContext;

  useEffect(
    () => {
      if (autenticado) {
        props.history.push('/proyectos');
      }

      if (mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria);
      }
    },
    [mensaje, autenticado, props.history],
  );

  const [usuario, guardarUsuario] = useState({
    email: '',
    password: '',
  });

  const {email, password} = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim === '') {
      mostrarAlerta('Los campos son obligatorios', 'alerta-error');
    }

    iniciarSesion({email, password});
  };

  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>

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
            <input type="submit" className="btn btn-primario btn-block" value="Iniciar sesión"/>
          </div>

        </form>

        <Link to={'/nueva-cuenta'} className="enlace-cuenta">Obtener cuenta</Link>
      </div>
    </div>
  );
};

export default Login;
