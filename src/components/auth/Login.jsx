


import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

export const Login = () => {

    //! Auth y token 
    const [ auth, guardarAuth ] = useContext(CRMContext);

    const navigate = useNavigate();

    const [credenciales, setCredenciales] = useState({email: '', password: ''})
    
    const leerDatos = (e)=>{
        setCredenciales({
            ...credenciales, 
            [e.target.name] : e.target.value
        });
    }

    const iniciarSesion = async (e) =>{
        e.preventDefault();
        //! Autenticar usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            
            const token = respuesta.data.token;
            localStorage.setItem('token', token);

            //! Colocarlo en el state
            guardarAuth({
                token,
                auth: true
            })

            Swal.fire(
                'Login correcto', 
                'has iniciado sesión', 
                'success'
            )

            navigate('/')

        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    return (
        <div className='login'>
            <h2>Iniciar Sesion</h2>
            <div className="contenedor-formulario">
                <form onSubmit={ iniciarSesion }>
                    <div className="campo">
                        <label >Email</label>
                        <input type="text" 
                            name='email'
                            placeholder='Email para iniciar sesion'
                            required
                            onChange={ leerDatos }
                        />
                    </div>
                    <div className="campo">
                        <label >Password</label>
                        <input type="password" 
                            name='password'
                            placeholder='Password para iniciar sesion'
                            required
                            onChange={ leerDatos }
                        />
                    </div>
                    <input type="submit" value="Iniciar Sesión" className='btn btn-verde btn-block'/>
                </form>
            </div>
        </div>
    )
}
