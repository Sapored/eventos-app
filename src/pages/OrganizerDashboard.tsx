// src/pages/OrganizerDashboard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

export default function OrganizerDashboard() {
  const navigate = useNavigate();

  // Verificar autenticación
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user || JSON.parse(user).type !== 'organizer') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1>Panel del Organizador</h1>
      <p>Bienvenido al panel de creación y gestión de eventos</p>
      <div className="dashboard-content">
        <p>Aquí podrás crear, editar y gestionar tus eventos.</p>
        <button onClick={() => navigate('/events')}>Ver eventos públicos</button>
      </div>
    </div>
  );
}