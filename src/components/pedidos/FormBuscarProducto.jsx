

import React from 'react'

export const FormBuscarProducto = (props) => {
    return (
        <>
            <form onSubmit={ props.bucarProductos }>
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div className="campo">
                    <label>Productos:</label>
                    <input type="text" 
                        placeholder="Nombre Productos" 
                        name="productos" 
                        onChange={ props.leerDatosBusqueda }
                    />
                </div>
                <input type="submit" 
                    className='btn btn-azul btn-block'
                    value="Buscar Producto"
                />
            </form>
        </>    
    )
}
