import React, { useState } from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios'
import { useNavigate } from 'react-router-dom';

export const NuevoProducto = () => {
	const navigate = useNavigate();
  
	const [producto, setproducto] = useState({
		nombre: '',
		precio: ''
	});

	const [archivo, setarchivo] = useState('');


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
	//! Almacena el nuevo producto en la base de datos
	const enviarProducto =async (e) =>{
		e.preventDefault();

		//! Crear un formData
		const formData = new FormData();
		formData.append( 'nombre', producto.nombre );
		formData.append( 'precio', producto.precio );
		formData.append( 'imagen', archivo );

		try {
			
			const res = await clienteAxios.post('/productos', formData, {
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

	return (
		<>
		<form onSubmit={ enviarProducto }>
			<legend>Llena todos los campos</legend>

			<div className="campo">
				<label>Nombre:</label>
				<input type="text" 
					placeholder="Nombre Producto" 
					name="nombre" 
					onChange={leerInformacionProducto}
				/>
			</div>

			<div className="campo">
				<label>Precio:</label>
				<input type="number" 
					name="precio" 
					min="0.00" 
					step="100" 
					placeholder="Precio" 
					onChange={leerInformacionProducto}
				/>
			</div>
		
			<div className="campo">
				<label>Imagen:</label>
				<input type="file"  
					name="imagen" 
					onChange={leerArchivo}
				/>
			</div>

			<div className="enviar">
					<input type="submit" className="btn btn-azul" value="Agregar Producto" />
			</div>
		</form>
		</>
	)
}
