import { useDispatch, useSelector } from "react-redux";
import "../styles/gestion.css";
import contrato from "../assets/contratos.png";
import certificado from "../assets/certificado.png";
import selfie from "../assets/imagen.png";
import { useEffect } from "react";
import { getDocsAprobados } from "../redux/documentoSlice";
import buscarContrato from '../assets/buscarContrato.png'
export const Aprobados = () => {
  const documents = useSelector((state) => state.documento.docsAprobados);
  const dispatch = useDispatch();
  console.log(documents);
  useEffect(() => {
    fetch("http://10.0.0.14:4001/firmas/api/aprobados")
      .then((response) => response.json())
      .then((data) => dispatch(getDocsAprobados(data)))
      .catch((error) => console.log(error));
  }, []);

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
          <th>estado</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="globalContainerTable">
      <h1>No existen documentos aprobados</h1>
      <img className="imagenBuscarContrato" src={buscarContrato} alt="" />
    </div>
  );
};
