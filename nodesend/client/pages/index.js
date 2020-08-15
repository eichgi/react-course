import {useContext, useEffect} from 'react';
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";

export default function Home() {

  //Extraer usuario auth de storage
  const AuthContext = useContext(authContext);
  const {usuarioAutenticado} = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, [])

  return (
    <Layout>
      <h1>INDEX</h1>
    </Layout>
  )
}