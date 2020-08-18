import React from 'react';
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";

export async function getStaticProps({params}) {
  const {enlace} = params;
  console.log(enlace)
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
  console.log(enlace);
  return (
    <Layout>
      <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
      <div className="flex items-center justify-center mt-10">
        <a href={`${process.env.BACKEND_URL}/api/archivos/${enlace.archivo}`}
           className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">AQUÍ</a>
      </div>
    </Layout>
  );
};

export default Enlace;