import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../css/Eliminar.css";

export default function Eliminar({userid}) {

  const idUser = {
    id: userid
  }

  const [userFound, setUserFound] = useState({});

  const getUsuario = async () => {
    const urlGetUser = "http://localhost:8000/user/get_user";
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(idUser),
    };
    try {
      const responseGetUser = await fetch(urlGetUser, requestOptions);
      const responseGetUserJSON = await responseGetUser.json();
      const data = await responseGetUserJSON;
      setUserFound(data);
    } catch (error) {
      console.log(error);
    }
  }

  const delUsuario = async () => {
    const urlDelUser = "http://localhost:8000/user";
    const requestOptionsDel = {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(idUser),
    };
    try {
      const responseDelUser = await fetch(urlDelUser, requestOptionsDel);
      const responseDelUserJSON = await responseDelUser.json();
      const dataDel = await responseDelUserJSON;
      console.log(dataDel);
      setTimeout(() => window.location.href = "/", 1000)      
    } catch (error) {
      console.log(error);
    }
  }


  
  useEffect(() => {
    getUsuario();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(idUser);
  console.log(userFound);


  return(
    <div className="delete">
      <div className="consulta">
        <h3>Estas seguro que deseas eliminar el usuario</h3>
      </div>     
      <div className="datos">
        <h3>Rut: {userFound.rut}</h3>
        <h3>Nombre: {userFound.nombre} {userFound.apPaterno} {userFound.apMaterno}</h3>
      </div>
      <button className="btn-accion eliminar" onClick={delUsuario}>Eliminar</button>
    </div>
  )
}

Eliminar.propTypes = {
  userid: PropTypes.number.isRequired,
};