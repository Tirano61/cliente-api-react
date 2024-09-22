

import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

export const Cliente = ( {cliente} ) => {
    
    const eliminarCliente = (id) =>{
        Swal.fire({
            title: "¿Estas seguro?",
            text: "Un cliente eliminado nose puede recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar!"
          }).then((result) => {
            if (result.isConfirmed) {
                //! lLamado a axios
                clienteAxios.delete(`/clientes/${id}`)
                    .then(res =>{
                        Swal.fire({
                            title: "Borrado!",
                            text: res.data.mensaje,
                            icon: "success"
                        });
                    });
                
            }
        });
    }

  return (
    <li className="cliente">
        <div className="info-cliente">
            <p className="nombre">{cliente.nombre} {cliente.apellido}</p>
            <p className="empresa">{cliente.empresa}</p>
            <p>{cliente.email}</p>
            <p>{cliente.telefono}</p>
        </div>
        <div className="acciones">
            <Link to={`/clientes/editar/${cliente._id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Cliente
            </Link>
            <button type="button" 
                className="btn btn-rojo btn-eliminar"
                onClick={ () => eliminarCliente(cliente._id) }
            >
                <i className="fas fa-times"></i>
                Eliminar Cliente
            </button>
        </div>
    </li>
  )
}
