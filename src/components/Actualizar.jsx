import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import URLBase from "../Constantes";
import axios from 'axios';
import '../css/Actualizar.css';

export default function Actualizar({userid}) {

  const [userFound, setUserFound] = useState({
    usuarioId: userid,
    rut: "",
    nombre: "",
    apellido: "",
    telefono: 0,
    correo: ""
  });

  const navigate = useNavigate();

  // funcion para obtener el usuario a editar
  const getUsuario = async () => {
    const urlGetUser = `${URLBase}api/usuario/${userid}`;  
    try {
      const responseGetUser = await axios.get(urlGetUser);
      const responseGetUserJSON = await responseGetUser.data;
      setUserFound(responseGetUserJSON);
    } catch (error) {
      console.log(error);
    }
  };
  
  // funcion para actualizar el usuario
  const handleUpdateUser = async (usuario) => {
    try {
      const response = await axios.put(`${URLBase}api/usuario/actualizar`, usuario);
      if (response.status === 200) {
        alert('Usuario actualizado exitosamente');
        navigate(-1);
      } else {
        alert('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // funcion para ejecutar la funcion de actualizar usuario cuando se envie el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleUpdateUser(userFound);
  };

  
  useEffect(() => {
    getUsuario();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // funcion que actualiza el estado userFound cada vez que se modifica un valor en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFound((prevState) => ({...prevState, [name]: value}));
  }

  return(
    <div className="form-edit">
      <form onSubmit={handleSubmit}>
        <h2 className="titulo-form">Formulario Editar</h2>
        <div className="formulario">
        <div className="item">
            <label htmlFor="usuarioId">ID: </label>
            <input type="text" name="usuarioId" disabled value={userFound.usuarioId} />
          </div>
          <div className="item">
            <label htmlFor="rut">RUT: </label>
            <input type="text" name="rut" onChange={handleChange} value={userFound.rut} />
          </div>
          <div className="item">
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" name="nombre" onChange={handleChange} value={userFound.nombre} />
          </div>
          <div className="item">
            <label htmlFor="apellido">Apellido: </label>
            <input type="text" name="apellido" onChange={handleChange} value={userFound.apellido} />
          </div>
          <div className="item">
            <label htmlFor="telefono">Teléfono: </label>
            <input type="number" name="telefono" onChange={handleChange} value={userFound.telefono} />
          </div>
          <div className="item">
            <label htmlFor="correo">Correo: </label>
            <input type="email" name="correo" onChange={handleChange} value={userFound.correo} />
          </div>
        </div>        
        <div className="botones">
          <button type="submit" className="btn editar">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  )
}

// validacion del argumento enviado al componente
Actualizar.propTypes = {
  userid: PropTypes.number.isRequired,
};