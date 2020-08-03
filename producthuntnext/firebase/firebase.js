import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    // Initialize Firebase
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
      //app.analytics();
    }

    this.auth = app.auth();
  }

  async registrar(nombre, email, password) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

    return await nuevoUsuario.user.updateProfile({displayName: nombre});
  }

  async iniciarSesion(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async cerrarSesion() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;