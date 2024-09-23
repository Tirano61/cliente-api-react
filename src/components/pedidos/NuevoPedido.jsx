


import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { Spinner } from '../layouts/Spinner';
import { FormBuscarProducto } from './FormBuscarProducto';

export const NuevoPedido = () => {

    const { id } = useParams();
    
    const [cliente, setcliente] = useState();
    const [busqueda, guardarBusqueda] = useState("");

    const buscarCliente = async()=>{
        const consulta = await clienteAxios.get(`/clientes/${id}`);
        console.log(consulta.data.cliente);
        setcliente(consulta.data.cliente);
    }


    useEffect(() => {
        buscarCliente()
    }, []);

    const buscarProducto = (e) =>{
        e.preventDefault();
        //! Obtener los priductos de la busqueda
    }
    //! Almacenar busqueda en el state
    const leerDatosBusqueda = (e) =>{
        guardarBusqueda( e.target.value);
    }

    if(!cliente) return <Spinner/>
    
    return (
        <>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}</p>
            </div>

            <FormBuscarProducto 
                buscarProducto={ buscarProducto }
                leerDatosBusqueda= { leerDatosBusqueda }
            />

            

                <ul className="resumen">
                    <li>
                        <div className="texto-producto">
                            <p className="nombre">Macbook Pro</p>
                            <p className="precio">$250</p>
                        </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i className="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i className="fas fa-plus"></i>
                            </div>
                            <button type="button" className="btn btn-rojo">
                                <i className="fas fa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="texto-producto">
                            <p className="nombre">Macbook Pro</p>
                            <p className="precio">$250</p>
                        </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i className="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i className="fas fa-plus"></i>
                            </div>
                            <button type="button" className="btn btn-rojo">
                                <i className="fas fa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="texto-producto">
                            <p className="nombre">Macbook Pro</p>
                            <p className="precio">$250</p>
                        </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i className="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i className="fas fa-plus"></i>
                            </div>
                            <button type="button" className="btn btn-rojo">
                                <i className="fas fa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                        </div>
                    </li>
                </ul>
                <div className="campo">
                    <label>Total:</label>
                    <input type="number" name="precio" placeholder="Precio" readonly="readonly"/> 
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
                </div>
            
        </>
    )
}
