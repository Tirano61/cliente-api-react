
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams  } from 'react-router-dom';

export const EditarCliente = () => {

    const { id } = useParams(); 

    const navigate = useNavigate()

    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });
    //! Query ala api
    const consultarApi = async ()=>{
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        console.log(clienteConsulta.data.cliente);
        setCliente(clienteConsulta.data.cliente);
    }
    useEffect(() => {
        consultarApi();
    },[])
    
    //! Leer los datos del formulario
    const actualizarState = (e) =>{
        setCliente({
            //! Obtener una copia del state actual
            ...cliente,
            [e.target.name] : e.target.value 
        });
    }

    //! Envia una peticion con los nuevos valores del cliente
    const actualizarCliente = async(e)=>{
        e.preventDefault();
        clienteAxios.put(`/clientes/${id}`, cliente)
            .then(res =>{
                if(res.data.type === 'ok'){
                    Swal.fire({
                     title: "Envio de Cliente",
                     text: res.data.mensaje,
                     icon: "succes"
                   }); 
                 }else{
                     Swal.fire({
                         title: "Envio de Cliente",
                         text: res.data.mensaje,
                         icon: "error"
                     });
                 }
            });
        navigate('/');
    }

    const validarCliente = () =>{
        const { nombre, apellido, empresa, email, telefono } = cliente;
        //! Revisar que tengan contenido
        let valido = !nombre.length || !apellido.length || !empresa.length 
            || !email.length || !telefono.length;

        return valido;
    }
    

  return (
    <>
        <h2>Editar Cliente</h2>
        <form onSubmit={actualizarCliente}>
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input type="text" 
                    placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={actualizarState}
                    value={cliente.nombre}
                />
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input type="text" 
                    placeholder="Apellido Cliente" 
                    name="apellido"
                    onChange={actualizarState}
                    value={cliente.apellido}
                />
            </div>
        
            <div className="campo">
                <label>Empresa:</label>
                <input type="text" 
                    placeholder="Empresa Cliente" 
                    name="empresa"
                    onChange={actualizarState}
                    value={cliente.empresa}
                />
            </div>

            <div className="campo">
                <label>Email:</label>
                <input type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={actualizarState}
                    value={cliente.email}
                />
            </div>

            <div className="campo">
                <label>Teléfono:</label>
                <input type="tel" 
                    placeholder="Teléfono Cliente" 
                    name="telefono"
                    onChange={actualizarState}
                    value={cliente.telefono}
                />
            </div>

            <div className="enviar">
                    <input type="submit" 
                        className="btn btn-azul" 
                        value="Guardar Cambios"
                        disabled={ validarCliente() }
                    />
            </div>

        </form>
    </>
  )
}