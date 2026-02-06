import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

type UserType = 'public' | 'student' | 'organizer' | 'admin';

export default function Register() {
  const [activeTab, setActiveTab] = useState<UserType>('public');
  
  // Estados para todos los formularios
  const [publicData, setPublicData] = useState({
    nombre: '',
    apellidos: '',
    genero: '',
    telefono: '',
    email: '',
    contrasena: ''
  });

  const [studentData, setStudentData] = useState({
    numeroCuenta: '',
    contrasena: ''
  });

  const [organizerData, setOrganizerData] = useState({
    empresa: '',
    telefono: '',
    tipoEvento: '',
    email: '',
    contrasena: ''
  });

  const [adminData, setAdminData] = useState({
    nombres: '',
    emailInstitucional: '',
    claveAdministrativa: '',
    rol: 'contributor' as 'principal' | 'contributor',
    aceptaTerminos: false
  });

  // Manejadores de cambios
  const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPublicData(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrganizerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrganizerData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setAdminData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch(activeTab) {
      case 'public':
        console.log('Registro público:', publicData);
        break;
      case 'student':
        console.log('Registro estudiante:', studentData);
        break;
      case 'organizer':
        console.log('Registro organizador:', organizerData);
        break;
      case 'admin':
        console.log('Registro administrador:', adminData);
        break;
    }
  };

  const renderForm = () => {
    switch(activeTab) {
      case 'public':
        return (
          <>
            <div className="form-group">
              <label>Nombre(s)*</label>
              <input 
                name="nombre"
                type="text" 
                value={publicData.nombre}
                onChange={handlePublicChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellidos*</label>
              <input 
                name="apellidos"
                type="text" 
                value={publicData.apellidos}
                onChange={handlePublicChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Género*</label>
              <select 
                name="genero"
                value={publicData.genero}
                onChange={handlePublicChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Teléfono*</label>
              <input 
                name="telefono"
                type="tel" 
                value={publicData.telefono}
                onChange={handlePublicChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Correo electrónico*</label>
              <input 
                name="email"
                type="email" 
                value={publicData.email}
                onChange={handlePublicChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña*</label>
              <input 
                name="contrasena"
                type="password" 
                value={publicData.contrasena}
                onChange={handlePublicChange}
                required
                minLength={8}
              />
            </div>
          </>
        );

      case 'student':
        return (
          <>
            <div className="form-group">
              <label>Número de Cuenta*</label>
              <input
                name="numeroCuenta"
                type="text"
                value={studentData.numeroCuenta}
                onChange={handleStudentChange}
                required
                placeholder="Ej: 20230001"
              />
            </div>
            <div className="form-group">
              <label>Contraseña*</label>
              <input
                name="contrasena"
                type="password"
                value={studentData.contrasena}
                onChange={handleStudentChange}
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
              />
            </div>
          </>
        );

      case 'organizer':
        return (
          <>
            <div className="form-group">
              <label>Empresa Organizadora*</label>
              <input
                name="empresa"
                type="text"
                value={organizerData.empresa}
                onChange={handleOrganizerChange}
                required
                placeholder="Nombre de la empresa"
              />
            </div>
            <div className="form-group">
              <label>Teléfono*</label>
              <input
                name="telefono"
                type="tel"
                value={organizerData.telefono}
                onChange={handleOrganizerChange}
                required
                placeholder="+52 1234567890"
              />
            </div>
            <div className="form-group">
              <label>Tipo de Evento*</label>
              <select
                name="tipoEvento"
                value={organizerData.tipoEvento}
                onChange={handleOrganizerChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="cultural">Cultural</option>
                <option value="deportivo">Deportivo</option>
                <option value="academico">Académico</option>
                <option value="empresarial">Empresarial</option>
              </select>
            </div>
            <div className="form-group">
              <label>Correo Electrónico*</label>
              <input
                name="email"
                type="email"
                value={organizerData.email}
                onChange={handleOrganizerChange}
                required
                placeholder="contacto@empresa.com"
              />
            </div>
            <div className="form-group">
              <label>Contraseña*</label>
              <input
                name="contrasena"
                type="password"
                value={organizerData.contrasena}
                onChange={handleOrganizerChange}
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
              />
            </div>
          </>
        );

      case 'admin':
        return (
          <>
            <div className="form-group">
              <label>Nombre(s)*</label>
              <input
                name="nombres"
                type="text"
                value={adminData.nombres}
                onChange={handleAdminChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Correo Institucional*</label>
              <input
                name="emailInstitucional"
                type="email"
                value={adminData.emailInstitucional}
                onChange={handleAdminChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Clave Administrativa*</label>
              <input
                name="claveAdministrativa"
                type="password"
                value={adminData.claveAdministrativa}
                onChange={handleAdminChange}
                required
                minLength={10}
              />
            </div>
            <div className="form-checkbox">
              <input
                name="aceptaTerminos"
                type="checkbox"
                checked={adminData.aceptaTerminos}
                onChange={handleAdminChange}
                required
              />
              <label>Acepto los términos y condiciones*</label>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Registro de Usuario</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'public' ? 'active' : ''}`}
          onClick={() => setActiveTab('public')}
        >
          Público General
        </button>
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

      <form onSubmit={handleSubmit} className="register-form">
        {renderForm()}
        
        <button type="submit" className="submit-button">
          {activeTab === 'admin' ? 'Crear Cuenta' : 'Registrarse'}
        </button>
      </form>

      <div className="login-link">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </div>
    </div>
  );
}