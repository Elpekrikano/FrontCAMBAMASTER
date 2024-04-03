import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../../services/authServices";

const InputField = ({ label, type, id, name, value, onChange }) => {
  return (
    <div className="mb-4" style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={id} className="form-label fw-bold">{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control fw-bold"
        style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.50rem", padding: "0.4rem" }}
        required
      />
    </div>
  );
};

const Login = ({ setIsLoggedIn }) => { // Recibe setIsLoggedIn como prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Estado para indicar si el usuario es administrador

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const { mutateAsync } = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = { email, password };
      console.log('Datos a enviar:', formData);
      const response = await mutateAsync(formData);
      console.log('Respuesta del servidor:', response);

      // Verificar si el usuario es administrador
      if (response && response.token) {
        const decodedToken = parseJwt(response.token); // Función para decodificar el token JWT
        setIsAdmin(decodedToken.role === 'admin');
      }

      // Actualizar el estado de inicio de sesión en el componente padre
      setIsLoggedIn(true);

      // Redirigir al usuario a la vista de inicio después del inicio de sesión exitoso
      navigate("/inicio");
      setSuccessMessage('¡Inicio de sesión exitoso!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para decodificar un token JWT (solo un ejemplo, debes usar una librería adecuada)
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="container mt-4" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "3.5em", marginBottom: "0.5em", textAlign: "center" }}>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "0 auto", textAlign: "left" }}>
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <InputField
          label="Contraseña"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        {successMessage && <div style={{ color: "green", marginBottom: "10px" }}>{successMessage}</div>}
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: loading ? "not-allowed" : "pointer" }} disabled={loading}>
            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </div>
        {/* Mostrar el panel de administrador si el usuario es administrador */}
        {isAdmin && (
          <div>
            <h2>Panel de Administrador</h2>
            {/* Aquí puedes colocar el código para el control de roles y la gestión de usuarios */}
          </div>
        )}
        <div style={{ marginTop: "40px" }}></div>
      </form>
    </div>
  );
};

export default Login;
