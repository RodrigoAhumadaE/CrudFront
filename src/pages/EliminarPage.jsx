import { useParams } from "react-router-dom"
import Eliminar from "../components/Eliminar";
import HeaderII from "../components/HeaderII";

export default function EliminarPage() {
  let {id} = useParams();
  let idUser = parseInt(id);
  
  return(
    <div className="content">
      <HeaderII />
      <Eliminar userid = {idUser} />
    </div>
  )
}