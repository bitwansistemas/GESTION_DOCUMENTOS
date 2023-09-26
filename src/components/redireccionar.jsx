import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redireccionar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/documentos/v1/gestion");
  }, []);

  return <div></div>;
};
