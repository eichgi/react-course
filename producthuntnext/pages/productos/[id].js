import React, {useEffect, useContext, useState} from 'react';
import {useRouter} from "next/router";
import {FirebaseContext} from '../../firebase';
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";
import {css} from '@emotion/core';
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {es} from "date-fns/locale";
import {Campo, InputSubmit} from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";

const ContenedorProducto = styled.div`
  @media(min-width: 768px){
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreadorProducto = styled.p`
  padding: .5rem 2rem;
  background-color: #DA552F;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Producto = () => {
  const {firebase, usuario} = useContext(FirebaseContext);

  const router = useRouter();
  const {query: {id}} = router;

  const [producto, guardarProducto] = useState({});
  const [error, guardarError] = useState(false);
  const [comentario, guardarComentario] = useState({});
  const [consultarDB, guardarConsultarDB] = useState(true);

  useEffect(() => {
    if (id && consultarDB) {
      //console.log("ID: ", id, firebase);
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db
          .collection('productos')
          .doc(id);

        const producto = await productoQuery.get();
        if (producto.exists) {
          guardarProducto(producto.data());
          guardarConsultarDB(false);
        } else {
          guardarError(true);
          guardarConsultarDB(false);
        }
      };

      obtenerProducto();
    }
  }, [id, consultarDB]);

  if (Object.keys(producto).length === 0 && !error) return 'Cargando...';
  const {comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos, creador, haVotado} = producto;

  const votarProducto = () => {
    if (!usuario) {
      return router.push('/login');
    }
    const nuevoTotal = votos + 1;

    if (haVotado.includes(usuario.uid)) {
      return;
    }

    const nuevoHaVotado = [...haVotado, usuario.uid];

    firebase.db.collection('productos').doc(id).update({votos: nuevoTotal, haVotado: nuevoHaVotado});

    guardarProducto({
      ...producto,
      votos: nuevoTotal,
    });

    guardarConsultarDB(true);
  };

  const comentarioChange = (e) => {
    guardarComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    })
  };

  const esCreador = (id) => {
    if (creador.id === id) {
      return true;
    }
  }

  const agregarComentario = (e) => {
    e.preventDefault();

    if (!usuario) {
      return router.push('/login');
    }

    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    const nuevosComentarios = [...comentarios, comentario];

    firebase.db.collection('productos')
      .doc(id)
      .update({comentarios: nuevosComentarios});

    guardarProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });

    guardarConsultarDB(true);
  };

  const puedeBorrar = () => {
    if (!usuario) {
      return false;
    }

    if (creador.id === usuario.uid) {
      return true;
    }
  };

  const eliminarProducto = async () => {
    try {
      if (!usuario || creador.id !== usuario.uid) {
        return router.push('/login');
      }

      await firebase.db.collection('productos')
        .doc(id)
        .delete();

      router.push('/');

    } catch (error) {
      console.log('Ocurrio un error');
    }
  };

  return (
    <Layout>
      <>
        {error
          ? <Error404/>
          : (<div className="contenedor">
            <h1 css={css`text-align: center; margin-top: 5rem;`}>{nombre}</h1>

            <ContenedorProducto>
              <div>
                <p>Publicado hace {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                <p>Publicado por {creador.nombre} de {empresa}</p>

                <img src={urlImagen}/>

                <p>{descripcion}</p>

                {usuario && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={agregarComentario}>
                      <Campo>
                        <input type="text" name="mensaje" onChange={comentarioChange}/>
                      </Campo>
                      <InputSubmit type="submit" value="Agregar comentario"/>
                    </form>
                  </>
                )}

                <h2 css={css`margin: 2rem 0;`}>Comentarios</h2>
                <ul>
                  {comentarios.length === 0
                    ? 'Aún no hay comentarios'
                    : (comentarios.map((comentario, index) => (
                      <li key={index} css={css`border: 1px solid #e1e1e1; padding: 2rem;`}>
                        <p>{comentario.mensaje}</p>
                        <p>Escrito por <span css={css`font-weight: bold;`}>{comentario.usuarioNombre}</span></p>
                        {esCreador(comentario.usuarioId) && <CreadorProducto>Es creador</CreadorProducto>}
                      </li>
                    )))}
                </ul>
              </div>

              <aside>
                <Boton target="_blank" bgColor={true} href={url}>
                  Visitar URL
                </Boton>

                <div css={css`margin-top: 5rem;`}>
                  <p css={css`text-align: center;`}>{votos} Votos</p>
                  {usuario && (
                    <Boton onClick={votarProducto}>Votar</Boton>
                  )}
                </div>
              </aside>
            </ContenedorProducto>

            {puedeBorrar() &&
            <Boton onClick={eliminarProducto}>Eliminar producto</Boton>
            }
          </div>)
        }
      </>
    </Layout>
  );
};

export default Producto;