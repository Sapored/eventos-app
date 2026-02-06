// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Página no encontrada</h1>
      <p>La página que buscas no existe o no tienes permiso para acceder.</p>
      <Link to="/login">Volver al inicio</Link>
    </div>
  );
}