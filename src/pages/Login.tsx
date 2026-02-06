import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

// Usuarios de prueba predefinidos
const TEST_USERS = {
  student: {
    accountNumber: '20195505',
    password: 'est12345',
    name: 'Santiago Ochoa',
    type: 'student'
  },
  organizer: {
    email: 'organizador@test.com',
    password: 'org12345',
    name: 'Eventos Universitarios',
    type: 'organizer'
  },
  admin: {
    email: 'admin@test.com',
    password: 'admin123',
    name: 'Administrador',
    type: 'admin'
  }
};

export default function Login() {
  const [activeTab, setActiveTab] = useState<'student' | 'organizer' | 'admin'>('student');
  const [credentials, setCredentials] = useState({
    accountNumber: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let authenticatedUser = null;

    // Validación para estudiantes
    if (activeTab === 'student') {
      if (credentials.accountNumber === TEST_USERS.student.accountNumber && 
          credentials.password === TEST_USERS.student.password) {
        authenticatedUser = TEST_USERS.student;
      }
    }
    
    // Validación para organizadores
    if (activeTab === 'organizer') {
      if (credentials.email === TEST_USERS.organizer.email && 
          credentials.password === TEST_USERS.organizer.password) {
        authenticatedUser = TEST_USERS.organizer;
      }
    }
    
    // Validación para administradores
    if (activeTab === 'admin') {
      if (credentials.email === TEST_USERS.admin.email && 
          credentials.password === TEST_USERS.admin.password) {
        authenticatedUser = TEST_USERS.admin;
      }
    }

    if (authenticatedUser) {
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      
      // Redirigir según tipo de usuario
      switch(authenticatedUser.type) {
        case 'student':
          navigate('/events');
          break;
        case 'organizer':
          navigate('/organizer-dashboard');
          break;
        case 'admin':
          navigate('/admin-panel');
          break;
      }
    } else {
      setError('Credenciales incorrectas. Usa los datos de prueba proporcionados.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'student' ? 'active' : ''}`}
          onClick={() => setActiveTab('student')}
        >
          Estudiante
        </button>
        <button 
          className={`tab ${activeTab === 'organizer' ? 'active' : ''}`}
          onClick={() => setActiveTab('organizer')}
        >
          Organizador
        </button>
        <button 
          className={`tab ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          Administrador
        </button>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        {activeTab === 'student' && (
          <div className="form-group">
            <label>Número de Cuenta</label>
            <input
              name="accountNumber"
              type="text"
              value={credentials.accountNumber}
              onChange={handleInputChange}
              placeholder="Ej: 20174729"
              required
            />
          </div>
        )}
        
        {(activeTab === 'organizer' || activeTab === 'admin') && (
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder={
                activeTab === 'organizer' ? 
                'organizador@test.com' : 
                'admin@test.com'
              }
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="test-credentials">
          <h3>Datos de Prueba:</h3>
          <ul>
            <li><strong>Estudiante:</strong> 20195505 / est12345</li>
            <li><strong>Organizador:</strong> organizador@test.com / org12345</li>
            <li><strong>Admin:</strong> admin@test.com / admin123</li>
          </ul>
        </div>

        <button type="submit" className="submit-button">
          Ingresar
        </button>
      </form>

      <div className="register-link">
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </div>
    </div>
  );
}