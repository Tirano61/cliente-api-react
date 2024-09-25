

import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import { Pedido } from './Pedido';
import { Spinner } from '../layouts/Spinner';

export const Pedidos = () => {

	const [pedidos, setpedidos] = useState([]);

	useEffect(() => {
		const buscarPedidos = async () =>{
		const pedidosConsulta = await clienteAxios.get('/pedidos');
		console.log(pedidosConsulta);
		setpedidos(pedidosConsulta.data);
		}

		buscarPedidos();
	}, []);

	if(!pedidos.length) return <Spinner /> 
	
	return (
		<>
			<h2>Pedidos</h2>

			<ul className="listado-pedidos">
				{
					
					pedidos.map((ped, index) => (
						
						<Pedido 
							key={ped._id}
							pedido= {ped}
						/>
					))
				}
			</ul>


		</>
	)
}
