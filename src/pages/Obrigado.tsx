// Obrigado page kept for compatibility but not used — redirect to quiz if rendered.
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Obrigado = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  return null;
};

export default Obrigado;
