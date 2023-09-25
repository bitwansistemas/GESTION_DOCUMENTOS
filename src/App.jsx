import "./App.css";
import { addDocument, getDocsAprobados, getDocsRechazados } from "./redux/documentoSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Menu } from "./components/menu.jsx";
import { Header } from "./components/header";
import { Gestion } from "./components/gestion";
import { Aprobados } from "./components/aprobados";
import { Rechazados } from "./components/rechazados";
function App() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    fetch("http://localhost:3000/pendientes")
      .then((response) => response.json())
      .then((data) => dispatch(addDocument(data)))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/aprobados")
      .then((response) => response.json())
      .then((data) => dispatch(getDocsAprobados(data)))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/rechazados")
      .then((response) => response.json())
      .then((data) => dispatch(getDocsRechazados(data)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route
          path="/gestion"
          element={
            <div className="containerHeaderBody">
              <Header titulo="Gestión de documentos firmados" />
              <Gestion />
            </div>
          }
        />
        <Route
          path="/aprobados"
          element={
            <div className="containerHeaderBody">
              <Header titulo="Documentos aprobados" />
              <Aprobados />
            </div>
          }
        />
        <Route
          path="/rechazados"
          element={
            <div className="containerHeaderBody">
              <Header titulo="Documentos rechazados" />
              <Rechazados />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
