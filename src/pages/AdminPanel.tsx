// src/pages/AdminPanel.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

export default function AdminPanel() {
  const navigate = useNavigate();

  // Verificar autenticación
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user || JSON.parse(user).type !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de administración del sistema</p>
      <div className="admin-content">
        <p>Herramientas de administración estarán disponibles aquí.</p>
        <button onClick={() => navigate('/events')}>Ver eventos públicos</button>
      </div>
    </div>
  );
}