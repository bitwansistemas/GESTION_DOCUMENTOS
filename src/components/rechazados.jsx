import { useDispatch, useSelector } from "react-redux";
import "../styles/gestion.css";
import contrato from "../assets/contratos.png";
import certificado from "../assets/certificado.png";
import selfie from "../assets/imagen.png";
import { useEffect } from "react";
import { getDocsRechazados } from "../redux/documentoSlice";
import Swal from "sweetalert2";
import buscarContrato from '../assets/buscarContrato.png'

export const Rechazados = () => {
  const documents = useSelector((state) => state.documento.docsRechazados);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://10.0.0.14:4001/firmas/api/rechazados")
      .then((response) => response.json())
      .then((data) => dispatch(getDocsRechazados(data)))
      .catch((error) => console.log(error));
  }, []);

  const mostrarComentario = (comentario) => {
    Swal.fire({
      icon: 'info',
      title: 'Motivo de rechazo',
      text: comentario,
      
    })
  };
  return documents.length > 0 ? (
    <div className="globalContainerTable">
      <table className="tablaDocumentos">
        <thead>
          <th className="colServicio">Servicio</th>
          <th className="colTitular">Titular</th>
          <th className="colTipo">Tipo transacción</th>
          <th>Documento</th>
          <th>Certificado</th>
          <th>Selfie</th>
          <th>Estado</th>
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
                <p className="labelRechazado">Rechazado</p>
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
      <h1>No existen documentos rechazados</h1>
      <img className="imagenBuscarContrato" src={buscarContrato} alt="" />
    </div>
  );
};
