import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header/header'; // Importa el Header original
import HeaderClients from './modules/headerclients/headerclients'; // Importa el HeaderClients
import Home from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom'; // Agrega Navigate
import Product from './modules/Product';
import Products from './modules/Products';
import CategoryProducts from './modules/CategoryProducts';
import Cart from './modules/Cart';
import Register from './modules/Register/Register';
import Login from './modules/Login/Login';
import Inicio from './modules/Init/inicio'; // Importa la vista Inicio

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para indicar si el usuario ha iniciado sesión

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Deja que React Router maneje la redirección a la página de inicio
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleImageUpload = async (formData) => {
    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        console.log('Imágenes cargadas correctamente');
      } else {
        console.error('Error al cargar las imágenes');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <HeaderClients isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      ) : (
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products" element={<Products handleImageUpload={handleImageUpload} />} />
        <Route path="/categories/:name" element={<CategoryProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              handleLogin={handleLogin} // Pasa la función handleLogin al componente Login
              setIsLoggedIn={setIsLoggedIn} // Pasa la función setIsLoggedIn al componente Login
            />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} />
        {/* Redirecciona a la página de inicio si el usuario no está autenticado */}
        <Route
          path="/*"
          element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />}
        />
      </Routes>
      {window.location.pathname !== '/products' && <Footer />}
    </div>
  );
}

export default App;