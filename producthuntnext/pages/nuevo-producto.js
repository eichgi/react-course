import React, {useState, useContext} from 'react';
import {css} from '@emotion/core';
import Router, {useRouter} from "next/router";
import Layout from "../components/layout/Layout";
import {Formulario, Campo, InputSubmit, Error} from "../components/ui/Formulario";
import FileUploader from "react-firebase-file-uploader";

//import firebase from "../firebase/firebase";
import {FirebaseContext} from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from "../validacion/validarCrearProducto";

const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: '',
};

const NuevoProducto = () => {

  const [nombreImagen, guardarNombreImagen] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlImagen, guardarUrlImagen] = useState('');

  const [error, guardarError] = useState(false);

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const {nombre, empresa, imagen, descripcion, url} = valores;

  const router = useRouter();

  const {usuario, firebase} = useContext(FirebaseContext);

  async function crearProducto() {
    try {

      if (!usuario) {
        return router.push('/login');
      }

      const producto = {
        nombre,
        empresa,
        url,
        urlImagen,
        descripcion,
        votos: 0,
        comentarios: [],
        creado: Date.now(),
      };

      await firebase.db.collection('productos').add(producto);

      return router.push('/');
    } catch (error) {
      console.error("Hubo un error al crear el usuario", error.message);
      //guardarError(error.message);
    }

  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleProgress = (progreso) => guardarProgreso({progreso});

  const handleUploadError = (error) => {
    guardarSubiendo(error);
    console.log(error);
  }

  const handleUploadSuccess = (nombre) => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombreImagen(nombre);

    firebase
      .storage
      .ref('productos')
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        guardarUrlImagen(url)
      });
  };

  return (
    <div>
      <Layout>
        <>
          <h1 css={css`text-align:center; margin-top: 5rem;`}>Nuevo producto</h1>

          <Formulario onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Informacion general</legend>

              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Tu nombre" name="nombre" value={nombre}
                       onChange={handleChange}/>
              </Campo>
              {errores.nombre && <Error>{errores.nombre}</Error>}

              <Campo>
                <label htmlFor="empresa">Empresa</label>
                <input type="text" id="empresa" placeholder="Nombre empresa" name="empresa" value={empresa}
                       onChange={handleChange}/>
              </Campo>
              {errores.empresa && <Error>{errores.empresa}</Error>}

              <Campo>
                <label htmlFor="imagen">Imagen</label>
                <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref('productos')}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Campo>
              {errores.imagen && <Error>{errores.imagen}</Error>}

              <Campo>
                <label htmlFor="url">URL</label>
                <input type="url" id="url" placeholder="URL" name="url" value={url}
                       onChange={handleChange}/>
              </Campo>
              {errores.url && <Error>{errores.url}</Error>}

            </fieldset>
            <fieldset>
              <legend>Sobre tu producto</legend>

              <Campo>
                <label htmlFor="descripcion">Descripción</label>
                <textarea id="descripcion" placeholder="Tu nombre" name="descripcion" value={descripcion}
                          onChange={handleChange}></textarea>
              </Campo>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>
            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Crear producto"/>


          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default NuevoProducto;