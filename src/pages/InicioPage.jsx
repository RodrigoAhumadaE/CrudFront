import Header from "../components/Header";
import Listar from "../components/Listar";
import Agregar from "../components/Agregar";
import Actualizar from "../components/Actualizar";

export default function InicioPage() {
  return(
    <>
      <div className="content">
        <Header />
        <Listar />
      </div>
      <div className="modal-add">
        <Agregar />
      </div>
      <div className="modal-edit">
        <Actualizar />
      </div>
    </>
      
  )
}