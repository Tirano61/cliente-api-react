
import React from 'react'

export const FormCantidadProducto = ({ 
    producto, 
    index, 
    restarProductos, 
    aumentarProductos, 
    eliminarProductoLista
}) => {
    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{ producto.nombre }</p>
                <p className="precio">{ producto.precio }</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus"
                        onClick={() => restarProductos(index) }
                    ></i>
                    <p>{ producto.cantidad }</p>
                    <i className="fas fa-plus"
                        onClick={ () => aumentarProductos(index) }
                    ></i>
                </div>
                <button type="button" 
                    className="btn btn-rojo"
                    onClick={ () => eliminarProductoLista(producto.producto) }
                >
                    <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
            </div>
        </li>
    )
}
