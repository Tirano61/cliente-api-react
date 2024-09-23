

import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import { Cliente } from './Cliente';
import { Link } from 'react-router-dom';
import { Spinner } from '../layouts/Spinner';


export const Clientes = () => {

	const [clientes, setClientes] = useState([]);

	const consultarApi = async () =>{
		const clienteConsulta = await clienteAxios.get('/clientes');
		console.log(clienteConsulta);
		setClientes( clienteConsulta.data.clientes );
	}

	useEffect(() => {
		consultarApi();  

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
