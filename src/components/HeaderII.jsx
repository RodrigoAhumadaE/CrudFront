import { FaAnglesLeft } from "react-icons/fa6";
import "../css/Header.css";

export default function HeaderII() {
  return(
    <nav className="header">
      <div className="icono">
        <h2>CRUD</h2>
      </div>
      <div className="volver">
        <button className="back" onClick={() => window.history.back()} >
          <FaAnglesLeft />
        </button>
      </div>
    </nav>
  )
}