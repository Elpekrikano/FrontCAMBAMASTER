import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/original.jpg';
import image2 from '../../assets/Flowers.jpeg';
import image3 from '../../assets/Gaban.jpeg';
import image4 from '../../assets/Chaqueta_azul.jpeg';

const Hero = ({ productos }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef(null);
  const images = [heroImg, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }, 3000); // Cambia la imagen cada 3 segundos
    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchText(inputValue);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="text-white body-font mt-20 relative" style={{ margin: 0 }}>
      <div className="container-fluid px-0 position-relative" style={{ paddingLeft: 0 }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`card mb-3 text-bg-dark ${index !== currentImage ? 'd-none' : ''}`}
            style={{
              display: index === currentImage ? 'block' : 'none',
              transition: 'opacity 1s ease-in-out',
              opacity: '1',
            }}
          >
            <img
              src={image}
              className="card-img-top"
              alt={`imagen ${index + 1}`}
              style={{
                width: '100%',
                height: '1000px',
                objectFit: 'cover',
                transition: 'opacity 0.5s ease-in-out', // Transición más suave al cambiar de imagen
              }}
            />
          </div>
        ))}
        <div className="animated-text-container" style={{textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -150%)', zIndex: 2, overflow: 'hidden'}}>
          <h1 className="animated-text" style={{ fontSize: '4rem', fontWeight: 'bold', whiteSpace: 'nowrap', animation: 'moveLeft 10s linear infinite', display: 'block' }}>LO MAS NUEVO DE LA TEMPORADA</h1>
          <div style={{ textAlign: 'center' }}>
            <h2 className="animated-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>La moda se transforma en expresión y la diversidad es la clave de tu armario.</h2>
            <p className="animated-text" style={{ fontSize: '1rem', fontWeight: 'bold', display: 'block' }}><small className="text-body-secondary">CAMBALACHES</small></p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-center mt-10" style={{ marginLeft: isSearchOpen ? '-200px' : '0', transition: 'margin-left 0.5s ease' }}>
        <Link to="/products" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Todos los productos
        </Link>
        <Link to="/more-info" className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
          Más información
        </Link>
        <div className="relative">
          <button
            className="search-toggle bg-gray-200 text-gray-900 rounded border-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 py-2 px-4 ml-2"
            onClick={toggleSearch}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 19l-6-6m0 0l-6 6m6-6" />
            </svg>
          </button>
          {isSearchOpen && (
            <input
              ref={searchRef}
              className="search-input absolute top-0 right-0 bg-gray-200 text-gray-900 rounded border-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 py-2 px-4 mr-2"
              type="text"
              placeholder="Buscar producto..."
              value={searchText}
              onChange={handleSearchChange}
            />
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes moveLeft {
            0% {
              transform: translateX(100%);
            }
            98% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          /* Media query para pantallas pequeñas */
          @media screen and (max-width: 768px) {
            .animated-text-container {
              top: 30%; /* Ajusta la posición vertical */
              left: 50%; /* Centra horizontalmente */
              transform: translate(-50%, -50%);
            }
          }

          /* Animación para desplazar los botones hacia la izquierda */
          .move-left {
            transform: translateX(-200px); /* Cambia la posición horizontal */
            transition: transform 0.5s ease; /* Agrega una transición suave */
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
