import { Link } from "react-router-dom";
import "../styles/Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-screen">
      {/* Imagen centrada */}
      <img 
        src="/images/welcome-image.png" 
        alt="¡Bienvenido!" 
        className="welcome-logo"
      />
      <h1 className="welcome-title">
        <span>¡Te damos la</span>
        <span>bienvenida!</span>
      </h1>
      <div className="auth-options">
        <Link to="/login" className="auth-button">Iniciar Sesión</Link>
        <Link to="/register" className="auth-button">Registrarme</Link>
      </div>
    </div>
  );
}