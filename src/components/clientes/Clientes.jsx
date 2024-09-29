

import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import { Cliente } from './Cliente';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../layouts/Spinner';
import { CRMContext } from '../../context/CRMContext';

export const Clientes = () => {

	const [clientes, setClientes] = useState([]);

	const navigate = useNavigate();

	//! Utilizar el context
	const [auth, guardarAuth ] = useContext(CRMContext);

	const consultarApi = async () =>{
		try {
			const clienteConsulta = await clienteAxios.get('/clientes',{
				headers: {
					Authorization : `Bearer ${auth.token}`
				}
			});
			console.log(clienteConsulta);
			setClientes( clienteConsulta.data.clientes );
		} catch (error) {
			//! Error con autorizacion
			if(error.response.status === 500){
				navigate('/iniciar-sesion');
			}
			console.log(error);
		}
		
	}

	useEffect(() => {
		if(auth.token !== ''){
			consultarApi();  
		}else{
			navigate('/iniciar-sesion');
		}

	}, [])



	//! Spinner de carga
	if(!clientes.length){
		//consultarApi();
		return <Spinner/>
	} 
		
	
	return (
		<>
		<h2>Clientes</h2>
		<Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> 
			<i className="fas fa-plus-circle"></i>
			Nuevo Cliente
		</Link>
		<ul className='listado-clientes'>
			{
			clientes.map(cliente =>(
				<Cliente 
				key={cliente._id}  
				cliente={cliente}
				/>
			))
			}
			
		</ul>
		</>
		
	)
}
