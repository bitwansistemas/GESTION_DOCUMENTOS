import "../styles/menu.css";
import logo from '../assets/logobitwan.png'
import { Link } from "react-router-dom";
import gestion from "../assets/gestion.png";
import rechazados from "../assets/rechazar.png"
import aprobados from "../assets/aprobar.png"
export const Menu = () => {
  return (
    <div className="globalContainer">
        <img className='logo' src={logo} alt="" />
      <Link to="/documentos/v1/gestion">
      <button>
        <img className="icon" src={gestion} alt="" />
        Gestión
      </button>
      </Link>
      <Link to="/documentos/v1/aprobados">
      <button>
        <img className="icon" src={aprobados} alt="" />
        Aprobados
      </button>
      </Link>
      <Link to="/documentos/v1/rechazados">
      <button>
        <img className="icon" src={rechazados} alt="" />
        Rechazados
      </button>
      </Link>
    </div>
  );
};
