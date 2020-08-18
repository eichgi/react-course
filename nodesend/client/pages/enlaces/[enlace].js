import React, {useState, useContext} from 'react';
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import appContext from "../../context/app/appContext";
import Alerta from "../../components/Alerta";

export async function getStaticProps({params}) {
  const {enlace} = params;
  const response = await clienteAxios(`/api/enlaces/${enlace}`);

  return {
    props: {
      enlace: response.data,
    }
  }
}

export async function getStaticPaths() {
  try {
    const response = await clienteAxios.get('/api/enlaces');

    return {
      paths: response.data.enlaces.map(enlace => ({
        params: {enlace: enlace.url}
      })),
      fallback: false,
    }
  } catch (error) {
    console.log(error)
  }
}

const Enlace = ({enlace}) => {
  const [tienePassword, setTienePassword] = useState(enlace.password);
  const [password, setPassword] = useState('');

  const AppContext = useContext(appContext);
  const {mensaje_archivo, mostrarAlerta} = AppContext;

  const verificarPassword = async (e) => {
    e.preventDefault();

    const data = {
      password,
    }

    try {
      const response = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
      console.log(response);
      setTienePassword(response.data.password);
    } catch (error) {
      mostrarAlerta(error.response.data.msg);
    }
  }

  return (
    <Layout>
      {
        tienePassword
          ? (
            <>
              <p className="text-center">Enlace protedigo por password</p>
              {mensaje_archivo && <Alerta/>}
              <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                  <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={e => verificarPassword(e)}>
                    <div className="mb-4">
                      <label className="block text-black text-sm font-bold mb-2" htmlFor="password">Password</label>
                      <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password}
                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>

                    <input type="submit"
                           className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                           value="Validar"/>
                  </form>
                </div>
              </div>
            </>
          )
          : (
            <>
              <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
              <div className="flex items-center justify-center mt-10">
                <a href={`${process.env.BACKEND_URL}/api/archivos/${enlace.archivo}`}
                   className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">AQUÍ</a>
              </div>
            </>
          )
      }

    </Layout>
  );
};

export default Enlace;