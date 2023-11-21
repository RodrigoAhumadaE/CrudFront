import { useEffect, useState } from "react";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import URLBase from "../Constantes";
import "../css/Listar.css";

export default function Listar() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchAPI = async () => {
    const urlLista = `${URLBase}api/usuarios/`;
    try {
      const response = await fetch(urlLista);
      const responseJSON = await response.json();
      setUsuarios(responseJSON);
    } catch (error) {
      console.log("No se pueden obtener los usuarios:", error);
    }    
  }
  
  const mostarModalEdit = (id) => {
    sessionStorage.setItem('idUsuario', id);
    let elementModalAdd = document.querySelector('.modal-edit');
    elementModalAdd.classList.add('mostrar');
    let elementContainer = document.querySelector('.content');
    elementContainer.classList.add('desenfocar');
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return(
    <>
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
                    <button className="button editar" onClick={() => mostarModalEdit(data.usuarioId)}>
                      <FaPenToSquare />
                    </button>                
                    <Link to={`eliminar/${data.id}`}>
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