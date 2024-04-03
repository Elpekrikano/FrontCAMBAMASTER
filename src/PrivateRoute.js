import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Aquí debemos definir la función isLoggedIn
  const isLoggedIn = () => {
    // Aquí deberías verificar si el usuario está autenticado
    // y devolver true o false en consecuencia
    return true; // Cambia esto por tu lógica de autenticación real
  };

  // Si el usuario no está autenticado, redirige al login
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, muestra el componente
  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
