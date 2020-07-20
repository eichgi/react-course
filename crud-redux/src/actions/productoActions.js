import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
} from './../types';
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';

// crear nuevo producto
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);

            //Si OK
            dispatch(agregarProductoExito(producto));
            //Alerta
            Swal.fire('Éxito', 'El producto se agrego correctamente', 'success');
        } catch (error) {
            console.log(error);
            //Si error cambiar state
            dispatch(agregarProductoError(true));
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error, favor de volver a intentar'
            });
        }
    };
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true,
});

//Si producto se guarde en BD
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto,
});

//Si hubo error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado,
});

//function que descarga productos desde la BD
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            console.log(respuesta);
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch(descargaProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true,
});

const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos,
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true,
});