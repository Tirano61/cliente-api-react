


import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { Spinner } from '../layouts/Spinner';
import { FormBuscarProducto } from './FormBuscarProducto';
import Swal from 'sweetalert2';
import { FormCantidadProducto } from './FormCantidadProducto';

export const NuevoPedido = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    
    const [cliente, setcliente] = useState();
    const [busqueda, guardarBusqueda] = useState("");
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const buscarCliente = async()=>{
            const consulta = await clienteAxios.get(`/clientes/${id}`);
            //console.log(consulta.data.cliente);
            setcliente(consulta.data.cliente);
        };
        buscarCliente()
    }, []);

    useEffect(()=>{
        actualizarTotal();
    },[productos])

    const buscarProducto = async(e) =>{
        try {
            e.preventDefault()
        
            //! Obtener los priductos de la busqueda
            const resultado = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

            //! Si no hay resultados alerta
            if(resultado.data[0]){
                let productoResultado = resultado.data[0];
                //! agregar la llave producto (copia de id)
                productoResultado.producto = resultado.data[0]._id;
                productoResultado.cantidad = 0;
                //! Ponerlo en el state
                setProductos([...productos, productoResultado]);

            }else{
                Swal.fire({
                    type: 'error',
                    title: 'Sin resutados',
                    text: 'No se encontraron resultados'
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    //! Almacenar busqueda en el state
    const leerDatosBusqueda = (e) =>{
        guardarBusqueda( e.target.value);
    }

    //! Actualizar la cantidad de productos
    const restarProductos = (index) =>{
        //! Copiar el arreglo original
        const todosLosProductos = [...productos];
        //! Validar si esta en 0
        if(todosLosProductos[index].cantidad === 0) return;
        
        todosLosProductos[index].cantidad --; 

        setProductos(todosLosProductos);
    }
    const aumentarProductos = (index) =>{
        const todosLosProductos = [...productos];

        todosLosProductos[index].cantidad ++;

        setProductos(todosLosProductos);
    }

    //! Actualizar el total a pagar
    const actualizarTotal = () =>{
        if(productos.length === 0){
            setTotal(0);
            return;
        }
        //! Calcular nuevo total
        let nuevoTotal = 0;
        productos.map(producto =>{
            nuevoTotal += (producto.cantidad * producto.precio);
            setTotal(nuevoTotal);
        })
    }

    const eliminarProductoLista = (id) => {
        const todosLosProductos = productos.filter(producto => producto.producto !== id);

        setProductos(todosLosProductos);
    }
    //! Almacena el pedido en la base de datos
    const realizarPedido = async (e) =>{
        e.preventDefault();

        //! Construir el objeto para el envio
        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }
        //! Almacenar en la base de datos
        const res = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);
        if(res.status === 200){
            Swal.fire({
                type: 'success',
                title: 'Guardado !!!',
                text: res.data.mensaje

            })
        }else{
            Swal.fire({
                type: 'error',
                title: 'Error al Guardar',
                text: 'Hubo un error al guardar el pedido'

            })
        }
        navigate('/pedidos');
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
                {
                    productos.map((producto, index) =>(
                        <FormCantidadProducto 
                            key={producto.producto}
                            producto={producto}
                            index={index}
                            restarProductos = { restarProductos }
                            aumentarProductos = { aumentarProductos }
                            eliminarProductoLista= { eliminarProductoLista }
                        />
                    ))
                }
            </ul>
            <div className="campo">
                <p className='total'>Total a pagar : <span>$ {total}</span></p>
                
            </div>
            {
                total > 0 ? (
                    <form onSubmit={ realizarPedido }>
                        <input type="submit" 
                            className='btn btn-verde btn-block'
                            value="Realizar Pedido"
                        />
                    </form>
                ) : null
            }
            
        </>
    )
}
