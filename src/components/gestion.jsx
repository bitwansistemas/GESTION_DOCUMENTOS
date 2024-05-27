import { useDispatch, useSelector } from "react-redux";
import "../styles/gestion.css";
import contrato from "../assets/contratos.png";
import certificado from "../assets/certificado.png";
import selfie from "../assets/imagen.png";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { addDocument } from "../redux/documentoSlice";
import { Suspense } from "react";
import buscarContrato from "../assets/buscarContrato.png";
import ver from "../assets/ver.png";
import { useNavigate } from "react-router-dom";
export const Gestion = () => {
  const documents = useSelector((state) => state.documento.documentos);
  const [idTecnico, setIdTecnico] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://45.230.33.14:4001/firmas/api/pendientes")
      .then((response) => response.json())
      .then((data) =>{
        dispatch(addDocument(data))
      } )
      .catch((error) => console.log(error));
  }, []);



  const verInfoTecnico = (idCuadrilla) => {
    fetch("http://45.230.33.14:4001/firmas/api/getinfocuadrilla", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idCuadrilla: idCuadrilla,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let nombre = JSON.stringify(`${data.response[0].nombres} ${data.response[0].apellidos}`)
        let identificacion = JSON.stringify(`${data.response[0].identificacion}`)
        nombre = nombre.replace('"', '')
        nombre = nombre.replace('"', '')
        nombre=nombre.toLowerCase()
       
        let palabras = nombre.split(" ");
        
        for (var i = 0; i < palabras.length; i++) {
         
          palabras[i] =
            palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
        }

   
        var resultado = palabras.join(" ");

         nombre = resultado;
        identificacion = identificacion.replace('"', '')
        identificacion = identificacion.replace('"', '')
        
        Swal.fire({
          icon: "info",
          title: "TÉCNICO",
          html:`<div style="display: flex; justify-content:center"><p style="text-align:left;width:80%"><span style="font-weight:bold">Nombre:</span> ${nombre}<br><span style="font-weight:bold">Identificación:</span> ${identificacion}</p></div>`
        });
      })
      .catch((error) => console.log(error));
  };


  const aprobarDocumento = (id) => {
    Swal.fire({
      icon: "info",
      title: "Confirmación",
      text: "¿Esta seguro/a que quiere aprobar el documento?",
      showCancelButton: true,
      confirmButtonText: "Aprobar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          input: "textarea",
          inputLabel: "Escriba brevemente un comentario",
          inputPlaceholder: "Escribe aqui...",
          inputAttributes: {
            "aria-label": "Escribe aqui",
          },
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://45.230.33.14:4001/firmas/api/actualizar/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                estado: "true",
                comentarios: result.value,
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
                    navigate("/");
                  }
                });
              }).catch(error=>{
                console.log(error);
              });
          }
        });
      }
    });
  };

  const rechazarDocumento = (id) => {
    Swal.fire({
      icon: "info",
      title: "Confirmación",
      text: "¿Esta seguro/a que quiere rechazar el documento?",
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
            fetch(`http://45.230.33.14:4001/firmas/api/actualizar/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                estado: "false",
                comentarios: result.value,
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
                    navigate("/");
                  }
                });
              }).catch(error=>{
                console.log(error);
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
            <th className="colServicio">Tecnico</th>
            <th className="colServicio">Servicio</th>
            <th className="colTitular">Titular</th>
            <th className="colTipo">Tipo transacción</th>
            <th>Documento</th>
            <th>Certificado</th>
            <th>Selfie</th>
            <th className="colOpciones">Opción</th>
          </thead>
          <tbody>
            {documents.map((documento) => (
              <tr>
                 <td className="colServicio">
                <img
                  className="iconos"
                  src={ver}
                  alt=""
                  onClick={() => verInfoTecnico(documento.idCuadrilla)}
                />
              </td>
                <td className="colServicio">{documento.numeroservicio}</td>
                <td className="colTitular">
                  {documento.nombres} {documento.apellidos}
                </td>
                <td className="colTipo">{documento.nombre}</td>
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
                      onClick={() =>
                        aprobarDocumento(documento.codigoDocumento)
                      }
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
      <h1>No existen documentos pendientes para revisión</h1>
      <img className="imagenBuscarContrato" src={buscarContrato} alt="" />
    </div>
  );
};
