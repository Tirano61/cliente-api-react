import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios'
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../layouts/Spinner';


export const EditarProducto = () => {

	const { id } = useParams()

	const navigate = useNavigate();

	const [producto, setproducto] = useState({
		nombre: '',
		precio: '',
		imagen: ''
	});
	const [archivo, setarchivo] = useState('');

	const consultarApi = async() =>{
		const productoConsulta = await clienteAxios.get(`/productos/${id}`);
		console.log(productoConsulta.data);
		setproducto(productoConsulta.data);
	}

	useEffect(() => {
		consultarApi();
	}, []);

	//! Editar elñ producto en la base de datos
	const  editarProducto =async(e) =>{
		e.preventDefault();

		//! Crear un formDatas
		const formData = new FormData();
		formData.append( 'nombre', producto.nombre );
		formData.append( 'precio', producto.precio );
		formData.append( 'imagen', archivo );

		try {
			
			const res = await clienteAxios.put(`/productos/${id}`, formData, {
				headers:{
					'Conten-Type': 'multipart/form-data'
				}
			});
			if(res.status === 200){
				Swal.fire({
					type:  'succes',
					title: 'Inserción correcta',
					text:  res.data.mensaje
				});
			}
			
			navigate('/productos');

		} catch (error) {
			console.log(error);
			Swal.fire({
				type:  'error',
				title: 'Hubo un error',
				text:  'Vuelve a intentarlo'
			})
		}
	}
		
			//! Leer los datos del formulario
	const leerInformacionProducto = (e) => {
		setproducto({
			//! Obtener una copia del state y agreagr el nuevo
			...producto,
			[e.target.name] : e.target.value
		})
	}
	//! Coloca la imagen en el state
	const leerArchivo = (e)=>{
		setarchivo( e.target.files[0] );
	}

	const { nombre, precio, imagen } = producto;

	if(!nombre) return <Spinner/>

	return (
		<>
			<form onSubmit={ editarProducto } >
				<legend>Llena todos los campos</legend>

				<div className="campo">
					<label>Nombre:</label>
					<input type="text" 
						placeholder="Nombre Producto" 
						name="nombre" 
						onChange={leerInformacionProducto}
						defaultValue={ nombre }
					/>
				</div>

				<div className="campo">
					<label>Precio:</label>
					<input type="number" 
						name="precio" 
						min="0.00" 
						step="10" 
						placeholder="Precio" 
						onChange={leerInformacionProducto}
						defaultValue={ precio }
					/>
				</div>
			
				<div className="campo">
					<label>Imagen:</label>
					{
						imagen ? (
							<img src={`http://localhost:5000/${imagen}`} width="300"/>
						) : null
					}
					<input type="file"  
						name="imagen" 
						onChange={leerArchivo}
						
					/>
				</div>

				<div className="enviar">
						<input type="submit" className="btn btn-azul" value="Guardar Cambios" />
				</div>
			</form>
		</>
	)
}
