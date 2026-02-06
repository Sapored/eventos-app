import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Events.css';

type Event = {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  date: string;
  time: string;
  price: string;
  credits: boolean;
  image?: string;
};

type User = {
  name: string;
  type: 'student' | 'organizer' | 'admin';
  accountNumber?: string;
  email?: string;
};

export default function Events() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // Datos de ejemplo de eventos
  const demoEvents: Event[] = [
    {
      id: 1,
      title: 'POETRY SLAM',
      subtitle: 'Versos a mordidas',
      location: 'Centro Cultural Universitario',
      description: 'Competencia de poesía urbana con invitados especiales',
      date: '20 May 2025',
      time: '6:00 PM',
      price: 'Gratis',
      credits: true,
      image: '/images/poetry-slam.jpg'
    },
    {
      id: 2,
      title: 'MUJERES EN TECNOLOGÍA',
      subtitle: 'Panel de discusión',
      location: 'Auditorio 2 en Facultad de Telemática',
      description: 'Conversatorio con líderes femeninas en el sector tecnológico',
      date: '17 Sep 2025',
      time: '4:30 PM',
      price: '$50.00',
      credits: true,
      image: '/images/women-in-tech.jpg'
    },
    {
      id: 3,
      title: 'NOCHE DE JAZZ',
      subtitle: 'Concierto en vivo',
      location: 'Teatro Universitario',
      description: 'Presentación de la banda de jazz universitario',
      date: '03 Jun 2025',
      time: '7:00 PM',
      price: '$120.00',
      credits: false,
      image: '/images/jazz-night.jpg'
    }
  ];

  // Filtrar eventos basados en el término de búsqueda
  const filteredEvents = demoEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="events-container">
      <header className="events-header">
        <div className="user-info">
          <span>Bienvenido, {user.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </div>
        
        <h1>Eventos Disponibles</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar eventos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button">🔍</button>
        </div>
      </header>

      <main className="events-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              {event.image && (
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                </div>
              )}
              
              <div className="event-header">
                <h2>{event.title}</h2>
                <h3>{event.subtitle}</h3>
              </div>
              
              <div className="event-body">
                <p className="event-location">📍 {event.location}</p>
                <p className="event-description">{event.description}</p>
                
                <div className="event-date">
                  <span>🗓 {event.date}</span>
                  <span>⏰ {event.time}</span>
                </div>
                
                <div className="event-footer">
                  <span className={`event-price ${event.price === 'Gratis' ? 'free' : 'paid'}`}>
                    {event.price}
                  </span>
                  {event.credits && (
                    <span className="event-credits">
                      ✔ Acredita culturales/deportivos
                    </span>
                  )}
                </div>
              </div>

              <button className="event-button">
                Ver detalles
              </button>
            </div>
          ))
        ) : (
          <div className="no-events">
            <p>No se encontraron eventos que coincidan con tu búsqueda.</p>
            <button onClick={() => setSearchTerm('')}>Limpiar búsqueda</button>
          </div>
        )}
      </main>
    </div>
  );
}