import Listar from "../components/Listar";
import Agregar from "../components/Agregar";

export default function InicioPage() {
  return(
    <>
      <div className="content">
        <Listar />
      </div>
      <div className="modal-add">
        <Agregar />
      </div>
    </>
      
  )
}