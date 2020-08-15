import React, {useContext, useEffect} from 'react';
import Link from "next/link";
import authContext from "../context/auth/authContext";

const Header = () => {

  const AuthContext = useContext(authContext);
  const {usuario, usuarioAutenticado, cerrarSesion} = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <div>
      <header className="py-8 flex flex-col md:flex-row items-center justify-between">
        <Link href="/">
          <img src="/logo.svg" className="w-64 mb-8 md:mb-0"/>
        </Link>

        <div>
          {
            usuario
              ? (
                <div className="flex items-center">
                  <p className="mr-2">Hola {usuario.nombre}</p>
                  <button type="button" className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
                  onClick={() => cerrarSesion()}>Cerrar
                    sesión
                  </button>
                </div>
              )
              : (
                <>
                  <Link href="/login"><a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Iniciar
                    sesión</a></Link>
                  <Link href="/crearcuenta"><a
                    className="bg-black px-5 py-3 rounded text-white font-bold uppercase">Registrarse</a></Link>
                </>
              )
          }
        </div>
      </header>
    </div>
  );
};

export default Header;