import "./App.css";
import {
  addDocument,
  getDocsAprobados,
  getDocsRechazados,
} from "./redux/documentoSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Menu } from "./components/menu.jsx";
import { Header } from "./components/header";
import { Gestion } from "./components/gestion";
import { Aprobados } from "./components/aprobados";
import { Rechazados } from "./components/rechazados";
import { Redireccionar } from "./components/redireccionar";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://10.0.0.14:4001/firmas/api/pendientes")
      .then((response) => response.json())
      .then((data) => dispatch(addDocument(data)))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://10.0.0.14:4001/firmas/api/aprobados")
      .then((response) => response.json())
      .then((data) => dispatch(getDocsAprobados(data)))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://10.0.0.14:4001/firmas/api/rechazados")
      .then((response) => response.json())
      .then((data) => dispatch(getDocsRechazados(data)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route
          path="/gestion" exact
          element={
            <div className="containerHeaderBody">
              <Header titulo="Gestión de documentos firmados" />
              <Gestion />
            </div>
          }
        />
        <Route
        path="/aprobados" exact
          element={
            <div className="containerHeaderBody">
              <Header titulo="Documentos aprobados" />
              <Aprobados />
            </div>
          }
        />
        <Route
          path="/rechazados" exact
          element={
            <div className="containerHeaderBody">
              <Header titulo="Documentos rechazados" />
              <Rechazados />
            </div>
          }
        />
        <Route
          path="*"
          element={<Redireccionar/>}
        />
      </Routes>
    </div>
  );
}

export default App;
