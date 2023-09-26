import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redireccionar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/gestion");
  }, []);

  return <div></div>;
};
