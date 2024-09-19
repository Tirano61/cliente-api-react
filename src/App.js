import React, { Fragment } from "react";

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
import { Productos } from "./components/productos/Productos";
import { Pedidos } from "./components/pedidos/Pedidos";

function App(){

    return(
      <BrowserRouter>
        <Fragment>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion/>
            <main className="caja-contenido col-9">
              <Routes>
                <Route exact path="/" element={<Clientes/>}/>
                <Route exact path="/productos" element={<Productos/>}/>
                <Route exact path="/pedidos" element={<Pedidos/>}/>
              </Routes>
            </main>
          </div>
        </Fragment>
      </BrowserRouter>
      
    );

}


export default App;
