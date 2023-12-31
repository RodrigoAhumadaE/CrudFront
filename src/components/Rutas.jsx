import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioPage from "../pages/InicioPage";
import EliminarPage from "../pages/EliminarPage";
import ActualizarPage from "../pages/ActualizarPage";

export default function Rutas() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="eliminar/:id" element={<EliminarPage />} />
        <Route path="actualizar/:id" element={<ActualizarPage />} />
      </Routes>
    </BrowserRouter>
  )
}