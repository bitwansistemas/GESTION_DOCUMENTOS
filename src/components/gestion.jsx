import { useDispatch, useSelector } from "react-redux";
import "../styles/gestion.css";
import contrato from "../assets/contratos.png";
import certificado from "../assets/certificado.png";
import selfie from "../assets/imagen.png";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { addDocument } from "../redux/documentoSlice";
import { Suspense } from "react";
import buscarContrato from '../assets/buscarContrato.png'
export const Gestion = () => {
  const documents = useSelector((state) => state.documento.documentos);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://10.0.0.14:4001/firmas/api/pendientes")
      .then((response) => response.json())
      .then((data) => dispatch(addDocument(data)))
      .catch((error) => console.log(error));
  }, []);

  const aprobarDocumento = (id) => {
    Swal.fire({
      icon: "info",
      title: "Confirmaci髇",
      text: "縀sta seguro/a que quiere aprobar el documento?",
      showCancelButton: true,
      confirmButtonText: "Aprobar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`http://10.0.0.14:4001/firmas/api/actualizar/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: "true",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire(
              "Documento aprobado satisfactoriamente!",
              "",
              "success"
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.reload(true);
              }
            });
          });
      }
    });
  };

  const rechazarDocumento = (id) => {
    Swal.fire({
      icon: "info",
      title: "Confirmaci贸n",
      text: "驴Esta seguro/a que quiere rechazar el documento?",
      showCancelButton: true,
      confirmButtonText: "Rechazar",
      customClass: {
        confirmButton: "buttonRechazar",
      },
    }).then((result) => {
      if (result.isConfirmed) {
         Swal.fire({
          input: "textarea",
          inputLabel: "Escriba brevemente el motivo de rechazo",
          inputPlaceholder: "Escribe aqui...",
          inputAttributes: {
            "aria-label": "Escribe aqui",
          },
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            fetch(`http://10.0.0.14:4001/firmas/api/actualizar/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                estado: "false",
                comentarios:result.value
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                Swal.fire(
                  "Documento rechazado satisfactoriamente!",
                  "",
                  "success"
                ).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload(true);
                  }
                });
              });
          }
        });
      }
    });
  };

  return documents.length > 0 ? (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="globalContainerTable">
        <table className="tablaDocumentos">
          <thead>
            <th className="colServicio">Servicio</th>
            <th className="colTitular">Titular</th>
            <th className="colTipo">Tipo transacci贸n</th>
            <th>Documento</th>
            <th>Certificado</th>
            <th>Selfie</th>
            <th className="colOpciones">Opci贸n</th>
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
                <td className="colOpciones">
                  <div className="containerOpciones">
                    <button
                      className="opcionesGestionAceptar"
                      onClick={() => aprobarDocumento(documento.codigoDocumento)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="opcionesGestionRechazar"
                      onClick={() =>
                        rechazarDocumento(documento.codigoDocumento)
                      }
                    >
                      Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  ) : (
    <div className="globalContainerTable">
      <h1>No existen documentos pendientes para revisi贸n</h1>
      <img className="imagenBuscarContrato" src={buscarContrato} alt="" />
    </div>
  );
};
