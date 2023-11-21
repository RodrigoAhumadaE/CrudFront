// import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import URLBase from "../Constantes";

export default function Actualizar() {

  const [userFound, setUserFound] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    telefono:0,
    correo: ""
  });
  let userid = sessionStorage.getItem('idUsuario');

  const navigate = useNavigate();

  const getUsuario = async () => {
    const urlGetUser = `${URLBase}api/usuario/${userid}`;
    try {
      const responseGetUser = await fetch(urlGetUser);
      const responseGetUserJSON = await responseGetUser.json();
      setUserFound(responseGetUserJSON);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlUpUser = `http://localhost:8000/user/${userid}`;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userFound),
    };
    try {
      const updateUser = await fetch(urlUpUser, requestOptions);
      const updateUserJSON = await updateUser.json();
      const data = await updateUserJSON.mensaje;
      console.log(data);
      setTimeout(() => navigate(-1), 1000);
    } catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
    getUsuario();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFound((prevState) => ({...prevState, [name]: value}));
  }

  const cerrarModal = () => {
    let elementModalAdd = document.querySelector('.modal-edit');
    elementModalAdd.classList.remove('mostrar');
    let elementContainer = document.querySelector('.content');
    elementContainer.classList.remove('desenfocar');
  }

  return(
    <div className="form-edit">
      <form onSubmit={handleSubmit}>
        <h2 className="titulo-form">Formulario Agregar</h2>
        <div className="formulario">
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
          <button type="submit" className="btn-accion editar">
            Actualizar
          </button>
          <button type="button" className="btn-accion cancelar" onClick={cerrarModal}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

// Actualizar.propTypes = {
//   userid: PropTypes.number.isRequired,
// };