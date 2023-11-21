import { useState } from "react";
import "../css/Agregar.css";
import URLBase from "../Constantes";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";

export default function Agregar() {

  const [usuario, setUsuario] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    telefono:0,
    correo: ""
  });

  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // const urlSetUser = 'http://localhost:8000/user/';
  //   const urlSetUser = `${URLBase}usuario/agregar`;
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(usuario),
  //   };
  //   try {
  //     const createUser = await fetch(urlSetUser, requestOptions);
  //     const createUserJSON = await createUser.json();
  //     const data = await createUserJSON.mensaje;
  //     console.log(data);
  //     setTimeout(function () {
  //       location.reload();
  //     }, 1000); 
  //   } catch (error){
  //     console.log(error);
  //   }
  // };

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URLBase}api/usuario/agregar`, usuario);
      cerrarModal();
      alert('Usuario creado exitosamente');
      location.reload();
      setUsuario({
        rut: '',
        nombre: '',
        apellido: '',
        telefono: 0,
        correo: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error al crear usuario');
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({...prevState, [name]: value}));
  }

  const cerrarModal = () => {
    let elementModalAdd = document.querySelector('.modal-add');
    elementModalAdd.classList.remove('mostrar');
    let elementContainer = document.querySelector('.content');
    elementContainer.classList.remove('desenfocar');
  }

  return(
    <div className="form-add">
      <form onSubmit={handleSubmit}>
        <h2 className="titulo-form">Formulario Agregar</h2>
        <div className="formulario">
          <div className="item">
            <label htmlFor="rut">RUT: </label>
            <input type="text" name="rut" id="rut" onChange={handleChange} value={usuario.rut} />
          </div>
          <div className="item">
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" name="nombre" id="nombre" onChange={handleChange} value={usuario.nombre} />
          </div>
          <div className="item">
            <label htmlFor="apellido">Apellido: </label>
            <input type="text" name="apellido" id="apellido" onChange={handleChange} value={usuario.apPaterno} />
          </div>
          <div className="item">
            <label htmlFor="telefono">Teléfono: </label>
            <input type="number" name="telefono" id="telefono" onChange={handleChange} value={usuario.fono} />
          </div>
          <div className="item">
            <label htmlFor="correo">Correo: </label>
            <input type="email" name="correo" id="correo" onChange={handleChange} value={usuario.mail} />
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