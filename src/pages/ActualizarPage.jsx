import { useParams } from "react-router-dom";
import Actualizar from "../components/Actualizar";
import HeaderII from "../components/HeaderII";

export default function ActualizarPage() {
  let {id} = useParams();
  let idUser = parseInt(id);

  return(
    <div className="content">
      <HeaderII />
      <Actualizar userid = {idUser} />
    </div>    
  )
}