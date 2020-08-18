import React, {useState, useContext} from 'react';
import appContext from "../context/app/appContext";

const Formulario = () => {

  const [tienePassword, setTienePassword] = useState(false);

  const AppContext = useContext(appContext);
  const {agregarPassword, agregarDescargas} = AppContext;

  const tienePasswordHandler = () => {
    setTienePassword(!tienePassword);
  };

  return (
    <div className="w-full mt-20">
      <div>
        <label htmlFor="" className="text-lg text-gray-800">Eliminar después de:</label>
        <select name="" id="" onChange={(e) => agregarDescargas(parseInt(e.target.value))}
                className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500">
          <option value="" disabled selected>Elige una opción</option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label htmlFor="" className="text-lg text-gray-800 mr-2">Contraseña para acceder:</label>
          <input type="checkbox" onChange={tienePasswordHandler}/>
        </div>
        {
          tienePassword
            ? (<input type="password" onChange={(e) => agregarPassword(e.target.value)}
                      className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"/>)
            : null
        }
      </div>
    </div>
  );
};

export default Formulario;