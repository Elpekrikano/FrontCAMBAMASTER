import React from 'react';
import logoImg from '../../assets/logo.jpg'; // Importa la imagen del logo

const Footer = () => {
  return (
    <footer className="text-gray-0 body-font border-t-2">
      <div className="container px-10 py-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          {/* Usa la imagen importada en lugar del SVG */}
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-90">
            <img src={logoImg} alt="Logo" className="w-10 h-10 rounded-full" /> {/* Usa la imagen importada */}
            <span className="ml-3 text-xl">CAMBALACHES</span>
          </a>
          <p className="mt-2 text-sm text-gray-500"> La moda se transforma en expresión y la diversidad es la clave de tu armario. CAMBALACHES</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">First Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Second Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Third Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
              </li>
            </nav>
          </div>
          {/* Resto de los elementos de navegación */}
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-1 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 CAMBALACHES —
            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@CAMBALACHES</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            {/* Resto de iconos de redes sociales */}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
