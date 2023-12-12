import { useDispatch, useSelector } from "react-redux";
import "../styles/gestion.css";
import contrato from "../assets/contratos.png";
import certificado from "../assets/certificado.png";
import selfie from "../assets/imagen.png";
import { useEffect } from "react";
import { getDocsAprobados } from "../redux/documentoSlice";
import buscarContrato from '../assets/buscarContrato.png'
import Swal from "sweetalert2";
export const Aprobados = () => {
  const documents = useSelector((state) => state.documento.docsAprobados);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://45.230.33.14:4001/firmas/api/aprobados")
      .then((response) => response.json())
      .then((data) => dispatch(getDocsAprobados(data)))
      .catch((error) => console.log(error));
  }, []);

  const mostrarComentario = (comentario) => {
    Swal.fire({
      icon: 'info',
      title: 'Comentario',
      text: comentario?comentario:"No hay comentarios para este documento",
      
    })
  };
  return documents.length > 0 ? (
    <div className="globalContainerTable"> 
    <form className="buscar" onSubmit={e => {
      e.preventDefault();
      fetch(`http://45.230.33.14:4001/firmas/api/aprobados/${e.target.filtroServicio.value}`)
      .then((response) => response.json())
      .then((data) => dispatch(getDocsAprobados(data)))
      .catch((error) => console.log(error));
    }} onChange={e=>{
      if(e.target.value === ""){
        fetch("http://45.230.33.14:4001/firmas/api/aprobados")
        .then((response) => response.json())
        .then((data) => dispatch(getDocsAprobados(data)))
        .catch((error) => console.log(error));
      }
    }}>
      <input type="number" placeholder="No Servicio" name="filtroServicio"required />

      <button className="btn" type="submit">
        <i className="fas fa-search icon"></i>
      </button>
    </form>
    
      <table className="tablaDocumentos">
        <thead>
          <th className="colServicio">Servicio</th>
          <th className="colTitular">Titular</th>
          <th className="colTipo">Tipo transacción</th>
          <th>Documento</th>
          <th>Certificado</th>
          <th>Selfie</th>
          <th>estado</th>
          <th>Comentarios</th>
        </thead>
        <tbody>
          {documents.map((documento) => (
            <tr>
              <td className="colServicio">{documento.numeroservicio}</td>
              <td className="colTitular">{documento.nombres} {documento.apellidos}</td>
              <td className="colTipo">
                {documento.nombre}
              </td>
              <td>
                <a target="_blank" href={documento.urlDocumento}>
                  <img className="iconos" src={contrato} alt="" />
                </a>
              </td>
              <td>
                <a target="_blank" href={documento.urlCertificado}>
                  <img className="iconos" src={certificado} alt="" />
                </a>
              </td>
              <td>
                <a target="_blank" href={documento.urlSelfie}>
                  <img className="iconos" src={selfie} alt="" />
                </a>
              </td>
              <td>
                <p className="labelAceptado">Aprobado</p>
              </td>
              <td>
                <a
                 
                  onClick={() => mostrarComentario(documento.comentarios)}
                >
                  Leer
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="globalContainerTable">
      <form className="buscar" onSubmit={e => {
      e.preventDefault();
      fetch(`http://45.230.33.14:4001/firmas/api/aprobados/${e.target.filtroServicio.value}`)
      .then((response) => response.json())
      .then((data) => dispatch(getDocsAprobados(data)))
      .catch((error) => console.log(error));
    }} onChange={e=>{
      if(e.target.value === ""){
        fetch("http://45.230.33.14:4001/firmas/api/aprobados")
        .then((response) => response.json())
        .then((data) => dispatch(getDocsAprobados(data)))
        .catch((error) => console.log(error));
      }
    }}>
      <input type="number" placeholder="No Servicio" name="filtroServicio"required />

      <button className="btn" type="submit">
        <i className="fas fa-search icon"></i>
      </button>
    </form>
      <h1>No existen documentos aprobados</h1>
      <img className="imagenBuscarContrato" src={buscarContrato} alt="" />
    </div>
  );
};
