import React from 'react'

export const Pedido = ({pedido}) => {
    return (
        <>
            <li className="pedido">
                <div className="info-pedido">
                    <p className="id">ID: {pedido._id}</p>
                    <p className="nombre">Cliente: {pedido.cliente.nombre} {pedido.cliente.apellido}</p>

                    <div className="articulos-pedido">
                        <p className="productos">Artículos Pedido: </p>
                        <ul>
                            
                                {
                                    pedido.pedido.map((art) =>(
                                        <li key={pedido._id+art.producto._id}>
                                            <p>{art.producto.nombre}</p>
                                            <p>Precio: ${art.producto.precio}</p>
                                            <p>Cantidad: {art.cantidad}</p>
                                        </li>
                                    ))
                                }
                                
                            
                        </ul>
                    </div>
                    <p className="total">Total: ${pedido.total} </p>
                </div>
                <div className="acciones">

                    <button type="button" className="btn btn-rojo btn-eliminar">
                        <i className="fas fa-times"></i>
                        Eliminar Pedido
                    </button>
                </div>
            </li>
        </>
    )
}
