import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import URLBase from "../Constantes";
import axios from "axios";
import "../css/Eliminar.css";

export default function Eliminar({userid}) {

  const [userFound, setUserFound] = useState({});

  // funcion para obtener el usuario a eliminar
  const getUsuario = async () => {
    const urlGetUser = `${URLBase}api/usuario/${userid}`;
    try {
      const responseGetUser = await axios.get(urlGetUser);
      const responseGetUserJSON = await responseGetUser.data;
      setUserFound(responseGetUserJSON);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteUser = async () => {
    const urlDelUser = `${URLBase}api/usuario/eliminar/${userid}`;
    try {
      const responseDelUser = await axios.delete(urlDelUser);
      if(responseDelUser.status === 200){
        alert("Usuario eliminado correctamente");
        volver();
      }else{
        console.log("Error al eliminar el usuario");
      }      
    } catch (error) {
      console.log(error);
    }
  }

  const volver = () => window.history.back();
  
  useEffect(() => {
    getUsuario();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div className="delete">
      <div className="consulta">
        <h3>Estas seguro que deseas eliminar el usuario</h3>
      </div>     
      <div className="datos">
        <h3>Rut: {userFound.rut}</h3>
        <h3>Nombre: {userFound.nombre} {userFound.apellido}</h3>
      </div>
      <div className="botones">
          <button type="submit" className="btn-accion eliminar" onClick={handleDeleteUser}>
            Eliminar
          </button>
          <button type="button" className="btn-accion cancelar" onClick={volver}>
            Cancelar
          </button>
        </div>
    </div>
  )
}

// validacion del argumento enviado al componente
Eliminar.propTypes = {
  userid: PropTypes.number.isRequired,
};