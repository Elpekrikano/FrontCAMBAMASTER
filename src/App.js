import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header/header'; // Importa el Header original
import HeaderClients from './modules/headerclients/headerclients'; // Importa el HeaderClients
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Product from './modules/Product';
import Products from './modules/Products';
import CategoryProducts from './modules/CategoryProducts';
import Cart from './modules/Cart';
import Register from './modules/Register/Register';
import Login from './modules/Login/Login';
import Inicio from './modules/Init/inicio'; // Importa la vista Inicio
import LoadProducts from './modules/loadproducts';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para indicar si el usuario ha iniciado sesión

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleImageUpload = async (formData) => {
    try {
      const response = await fetch('https://backcambamaster-production.up.railway.app/upload', {
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
        <HeaderClients isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> // Renderiza HeaderClients si el usuario ha iniciado sesión
      ) : (
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> // Renderiza el Header original si el usuario no ha iniciado sesión
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loadproducts" element={<LoadProducts handleImageUpload={handleImageUpload} />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/categories/:name" element={<CategoryProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>404</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Pasa la función setIsLoggedIn al componente Login */}
        <Route path="/home" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} /> {/* Agrega la ruta para la vista Inicio */}
      </Routes>
      {/* Lógica condicional para mostrar el Footer en todas las vistas excepto Products */}
      {window.location.pathname !== '/products' && <Footer />}
    </div>
  );
}

export default App;
