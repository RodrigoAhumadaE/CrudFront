import { FaMagnifyingGlass, FaUserPlus } from "react-icons/fa6";
// import { Link } from "react-router-dom";
import "../css/Header.css";

export default function Header() {

  const mostarModalAdd = () => {
    let elementModalAdd = document.querySelector('.modal-add');
    elementModalAdd.classList.add('mostrar');
    let elementContainer = document.querySelector('.content');
    elementContainer.classList.add('desenfocar');
  }

  return(
    <nav className="header">
      <div className="icono">
        <h2>CRUD</h2>
      </div>
      <div className="buscador">
        <input type="text" placeholder="ingrese rut a buscar..." />
        <button className="buscar">
          <FaMagnifyingGlass />
        </button>
      </div>
      <div className="agregar">
        {/* <Link to={'agregar'}> */}
          <button className="add" onClick={mostarModalAdd}>
            <FaUserPlus />
          </button>
        {/* </Link>         */}
      </div>
    </nav>
  )
}