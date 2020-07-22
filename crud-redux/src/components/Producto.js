import React from 'react';
import {Link, useHistory} from 'react-router-dom';

import {useDispatch} from "react-redux";
import {borrarProductoAction, obtenerProductoEditar} from "../actions/productoActions";

import Swal from 'sweetalert2';

const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();
    const history = useHistory(); //habilitar history para redireccion
    //Confirmar eliminacion
    const confirmarEliminarProducto = (id) => {
        //Solicitar confirmacion
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No se podrá recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                //Pasarlo al action
                dispatch(borrarProductoAction(id));
            }
        });
    };

    //función que redirige
    const redireccionarEdicion = (producto) => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`productos/editar/${producto.id}`);
    };

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button type="button" onClick={() => redireccionarEdicion(producto)}
                        className="btn btn-primary mr-2">Editar
                </button>
                <button type="button" className="btn btn-danger"
                        onClick={() => confirmarEliminarProducto(id)}>Eliminar
                </button>
            </td>
        </tr>
    );
};

export default Producto;