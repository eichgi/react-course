import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios';
import ListadoNoticias from "./components/ListadoNoticias";

function App() {

  const [categoria, guardarCategoria] = useState('');
  const [noticias, guardarNoticias] = useState([]);

  useEffect(
    () => {
      const consultarAPI = async () => {
        const url = `http://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=2468d5415e4444f1a5ff52d78ae7d6ca`;
        const respuesta = await axios.get(url);
        const noticias = respuesta.data.articles;
        guardarNoticias(noticias);
      };

      consultarAPI();
    }, [categoria]
  )

  return (
    <Fragment>
      <Header titulo='Buscador de noticias'/>

      <div className="container white">
        <Formulario guardarCategoria={guardarCategoria}/>

        <ListadoNoticias noticias={noticias}/>
      </div>
    </Fragment>
  );
}

export default App;
