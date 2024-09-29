import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { Producto } from "./Producto";
import { Spinner } from "../layouts/Spinner";
import { CRMContext } from "../../context/CRMContext";

export const Productos = () => {

	const navigate = useNavigate();

	const [productos, setProductos] = useState([]);

	const [auth, guardarAuth ] = useContext(CRMContext);

	const cargarProductos = async()=>{
		try {
			const consultaProductos = await clienteAxios.get('/productos',{
				headers: {
					Authorization : `Bearer ${auth.token}`
				}
			});
			setProductos(consultaProductos.data);
			
		} catch (error) {
			if(error.response.status === 500){
				navigate('/iniciar-sesion');
			}
		}
	}

	useEffect(() => {
		if(auth.token !== ''){
			cargarProductos();
		}else{
			navigate('/iniciar-sesion');
		}
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
