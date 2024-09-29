
import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate  } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

export const NuevoCliente = () => {

    const [auth, guardarAuth ] = useContext(CRMContext);

    const navigate = useNavigate();

    const [cliente, setcliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });
    //! Leer los datos del formulario
    const actualizarState = (e) =>{
        setcliente({
            //! Obtener una copia del state actual
            ...cliente,
            [e.target.name] : e.target.value 
        });
    }

    const validarCliente = () =>{
        const { nombre, apellido, empresa, email, telefono } = cliente;
        //! Revisar que tengan contenido
        let valido = !nombre.length || !apellido.length || !empresa.length 
            || !email.length || !telefono.length;

        return valido;
    }
    const enviarCliente = (e)=>{
        e.preventDefault();
        //! Enviar Peticion
        clienteAxios.post('/clientes', cliente).then(res =>{
            if(res.data.type === 'ok'){
               Swal.fire({
                title: "Envio de Cliente",
                text: res.data.mensaje,
                icon: "success"
              }); 
            }else{
                Swal.fire({
                    title: "Envio de Cliente",
                    text: res.data.mensaje,
                    icon: "error"
                });
            }
            
            navigate('/');
            
        });
    }

    //! Verificar si el usuario esta autenticado
    useEffect(() => {
        if(!auth.auth){
            navigate('/iniciar-sesion');
        }
    }, []);

    return (
        <>
            <h2>Nuevo Cliente</h2>
            <form onSubmit={ enviarCliente }>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido"
                        onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Cliente"
                            disabled={ validarCliente() }
                        />
                </div>

            </form>
        </>
    )
    }

