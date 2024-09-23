import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { Producto } from "./Producto";
import { Spinner } from "../layouts/Spinner";

export const Productos = () => {

	const [productos, setProductos] = useState([]);

	const cargarProductos = async()=>{
		const consultaProductos = await clienteAxios.get('/productos');
		console.log(consultaProductos);
		setProductos(consultaProductos.data);
	}

	useEffect(() => {
		cargarProductos();
	}, [])
	
	//! Spinner de carga
	if(!productos.length){
		return <Spinner/>
	}

	return (
		<>
			<h2>Productos</h2>

			<Link to="/productos/nuevo" className="btn btn-verde nvo-cliente">
				<i className="fas fa-plus-circle"></i>
				Nuevo Producto
			</Link>

			<ul className="listado-productos">
				{
					productos.map(producto =>(
						<Producto
							key={producto._id}
							producto={producto}
						/>
					))
				}
				
			
			</ul>
		</>
	);
};
