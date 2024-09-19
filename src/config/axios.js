import axios from "axios";




const clienteAxios = axios.create({
    baseURL: 'hhtpp://localhost:5000'
});


export default clienteAxios;