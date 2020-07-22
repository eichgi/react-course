import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_ERROR,
    PRODUCTO_EDITADO_EXITO,
} from './../types';
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';
import productosReducer from "../reducers/productosReducer";

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

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            Swal.fire(
                'Eliminado',
                'El product ha sido elminado',
                'success'
            )
        } catch (error) {
            dispatch(eliminarProductoError());
        }
    };
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id,
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true,
});

//Colocar producto en edición
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoAction(producto));
    };
}

const obtenerProductoAction = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto,
});

//Edita un registro en la API
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto));

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {

        }
    };
}

const editarProducto = (producto) => ({
    type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto,
});