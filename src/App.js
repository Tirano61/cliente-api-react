import React, { Fragment, useContext } from "react";

import Header from './components/layouts/Header'
import { Navegacion } from "./components/layouts/Navegacion";
//** Routing */
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Clientes } from "./components/clientes/Clientes";
import { EditarCliente } from "./components/clientes/EditarCliente";
import { Productos } from "./components/productos/Productos";
import { EditarProducto } from "./components/productos/EditarProducto";
import { NuevoProducto } from "./components/productos/NuevoProducto";
import { Producto } from "./components/productos/Producto";
import { Pedidos } from "./components/pedidos/Pedidos";
import { NuevoCliente } from "./components/clientes/NuevoCliente";
import { NuevoPedido } from "./components/pedidos/NuevoPedido";
import { Login } from "./components/auth/Login";
import { CRMContext, CRMProvider } from "./context/CRMContext";



function App(){

    //! Utilizar context en el componente
    const [ auth, guardarAuth ] = useContext(CRMContext);

    return(
      <BrowserRouter>
        <Fragment>
          <CRMProvider value={[ auth, guardarAuth ]}>
            <Header />
            <div className="grid contenedor contenido-principal">
              <Navegacion/>
              <main className="caja-contenido col-9">
                <Routes>
                  <Route exact path="/" element={<Clientes/>}/>
                  <Route exact path="/clientes/nuevo" element={<NuevoCliente />}/>
                  <Route exact path="/clientes/editar/:id" element={<EditarCliente />}/>
                  
                  <Route exact path="/productos" element={<Productos />}/>
                  <Route exact path="/productos/nuevo" element={<NuevoProducto />}/>
                  <Route exact path="/productos/editar/:id" element={<EditarProducto />}/>

                  <Route exact path="/pedidos" element={<Pedidos />}/>
                  <Route exact path="/pedidos/nuevo/:id" element={<NuevoPedido />}/>

                  <Route exact path="/iniciar-sesion" element={ <Login />} /> 
                  
                </Routes>
              </main>
            </div>
          </CRMProvider>
        </Fragment>
      </BrowserRouter>
      
    );

}


export default App;
