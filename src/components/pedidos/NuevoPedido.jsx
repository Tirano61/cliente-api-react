


import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { Spinner } from '../layouts/Spinner';
import { FormBuscarProducto } from './FormBuscarProducto';
import Swal from 'sweetalert2';

export const NuevoPedido = () => {

    const { id } = useParams();
    
    const [cliente, setcliente] = useState();
    const [busqueda, guardarBusqueda] = useState("");
    const [resultados, setresultados] = useState("");

    useEffect(() => {
        const buscarCliente = async()=>{
            const consulta = await clienteAxios.get(`/clientes/${id}`);
            //console.log(consulta.data.cliente);
            setcliente(consulta.data.cliente);
        };
        buscarCliente()
    }, []);

    const buscarProducto = async(e) =>{
        try {
            e.preventDefault()
        
            //! Obtener los priductos de la busqueda
            const resultado = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
            console.log(resultado.data);
            //! Si no hay resultados alerta
            if(!resultado.data[0]){

            }else{
                Swal.fire({
                    type: 'error',
                    title: 'Sin resutados',
                    text: 'No se encontraron resultados'
                });
            }
           
            //Swal.fire
        } catch (error) {
            console.log(error);
        }

    }
    //! Almacenar busqueda en el state
    const leerDatosBusqueda = (e) =>{
        guardarBusqueda( e.target.value);
        console.log( e.target.value);
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
                    <input type="number" name="precio" placeholder="Precio" readOnly="readonly"/> 
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
                </div>
            
        </>
    )
}
