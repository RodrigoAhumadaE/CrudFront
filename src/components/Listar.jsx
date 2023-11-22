import { useEffect, useState } from "react";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaUserPlus } from "react-icons/fa6";
import URLBase from "../Constantes";
import "../css/Listar.css";
import axios from "axios";

export default function Listar() {
  const [usuarios, setUsuarios] = useState([]);
  const [rutBusqueda, setRutBusqueda] = useState("");

  // funcion para obtener una lista de usuarios
  const fetchAPI = async () => {
    const urlLista = `${URLBase}api/usuarios/`;
    try {
      const response = await axios.get(urlLista);
      const responseJSON = await response.data;
      setUsuarios(responseJSON);
    } catch (error) {
      console.log("No se pueden obtener los usuarios:", error);
    }
  };

  // funcion para filtrar la lista de usuarios
  const porRut = async () => {
    const urlLista = `${URLBase}api/usuarios/?rut=${rutBusqueda}`;
    try {
      const response = await axios.get(urlLista);
      console.log(response.status);
      const responseJSON = await response.data;
      setUsuarios(responseJSON);
      setRutBusqueda("");    
    } catch (error) {
      if (error.response.status === 404) {
        alert("No se encontraron usuarios con el rut especificado");
      } else if (error.response.status === 500) {
        alert("Usuario no encontrado");
      } else {
        console.log("No se pueden obtener los usuarios:", error);
      }
      setRutBusqueda("");
    }
  };

  // funcion para mostar el modal para agregar un nuevo usuario
  const mostarModalAdd = () => {
    let elementModalAdd = document.querySelector('.modal-add');
    elementModalAdd.classList.add('mostrar');
    let elementContainer = document.querySelector('.content');
    elementContainer.classList.add('desenfocar');
  }

  useEffect(() => {
    fetchAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <>
      <nav className="header">
        <div className="icono">
          <h2>CRUD</h2>
        </div>
        <div className="buscador">
          <input type="text" placeholder="ingrese rut a buscar..." value={rutBusqueda} onChange={(e) => setRutBusqueda(e.target.value)} />
          <button className="buscar" onClick={() => porRut()} >
            <FaMagnifyingGlass />
          </button>
        </div>
        <div className="agregar">
          <button className="add" onClick={mostarModalAdd}>
            <FaUserPlus />
          </button>
        </div>
      </nav>
      <table className="tabla">
        <thead>
          <tr className="fila">
            <th>ID</th>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {
          usuarios?.map((data) => {
            return(
              <tbody key={data.usuarioId}>
                <tr className="fila">
                  <td>{data.usuarioId}</td>
                  <td>{data.rut}</td>
                  <td>{data.nombre} {data.apellido}</td>
                  <td>{data.telefono}</td>
                  <td>{data.correo}</td>
                  <td>
                    <Link to={`actualizar/${data.usuarioId}`}>
                      <button className="button editar">
                        <FaPenToSquare />
                      </button>
                    </Link>                                    
                    <Link to={`eliminar/${data.usuarioId}`}>
                      <button className="button eliminar">
                        <FaTrashCan />
                      </button>
                    </Link>                
                  </td>
                </tr>            
              </tbody>          
            )
          })
        }
      </table>
    </>      
  )
}