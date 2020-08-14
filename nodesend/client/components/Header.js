import React from 'react';
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <header className="py-8 flex flex-col md:flex-row items-center justify-between">
        <Link href="/">
          <img src="/logo.svg" className="w-64 mb-8 md:mb-0"/>
        </Link>

        <div>
          <Link href="/login"><a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Iniciar
            sesión</a></Link>
          <Link href="/crearcuenta"><a
            className="bg-black px-5 py-3 rounded text-white font-bold uppercase">Registrarse</a></Link>
        </div>
      </header>
    </div>
  );
};

export default Header;