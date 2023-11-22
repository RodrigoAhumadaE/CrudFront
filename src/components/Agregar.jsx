import { useState } from "react";
// import { formatRut } from "./utils/formatRut";
import "../css/Agregar.css";
import URLBase from "../Constantes";
import axios from 'axios';

export default function Agregar() {

  const [usuario, setUsuario] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    telefono:0,
    correo: ""
  });

  // funcion para crear el usuario 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URLBase}api/usuario/agregar`, usuario);
      cerrarModal();
      alert('Usuario creado exitosamente');
      location.reload();
      resetState();
    } catch (error) {
      console.error(error);
      alert('Error al crear usuario');
    }
  };

  // funcion para limpiar los datos del estado userFound
  const resetState = () => {
    setUsuario({
      rut: '',
      nombre: '',
      apellido: '',
      telefono: 0,
      correo: '',
    });
  };
  
  // funcion que actualiza el estado userFound cada vez que se modifica un valor en el formulario 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({...prevState, [name]: value}));
  }

  const cerrarModal = () => {
    let elementModalAdd = document.querySelector('.modal-add');
    elementModalAdd.classList.remove('mostrar');
    let elementContainer = document.querySelector('.content');
    elementContainer.classList.remove('desenfocar');
    resetState();
  }

  return(
    <div className="form-add">
      <form onSubmit={handleSubmit}>
        <h2 className="titulo-form">Formulario Agregar</h2>
        <div className="formulario">
          <div className="item">
            <label htmlFor="rut">RUT: </label>
            <input type="text" name="rut" id="rut" onChange={handleChange} value={usuario.rut} required minLength="10" placeholder="12345678-9" />
          </div>
          <div className="item">
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" name="nombre" id="nombre" onChange={handleChange} value={usuario.nombre} required />
          </div>
          <div className="item">
            <label htmlFor="apellido">Apellido: </label>
            <input type="text" name="apellido" id="apellido" onChange={handleChange} value={usuario.apPaterno} required />
          </div>
          <div className="item">
            <label htmlFor="telefono">Teléfono: </label>
            <input type="text" name="telefono" id="telefono" onChange={handleChange} value={usuario.fono} pattern="^[0-9]{9}$" required />
          </div>
          <div className="item">
            <label htmlFor="correo">Correo: </label>
            <input type="email" name="correo" id="correo" onChange={handleChange} value={usuario.mail} required />
          </div>
        </div>        
        <div className="botones">
          <button type="submit" className="btn-accion guardar">
            Guardar
          </button>
          <button type="button" className="btn-accion cancelar" onClick={cerrarModal}>
            Cancelar
          </button>
        </div>
      </form>      
    </div>
  )
}