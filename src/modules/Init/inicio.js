import React, { useEffect, useState } from 'react';
import Hero from '../../components/Hero';
import ProductCard from '../../components/ProductCard';
import Stats from '../../components/StatCard';
import HeaderClients from '../headerclients/headerclients'; // Aquí se importa HeaderClients

const Inicio = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdctos = async () => {
      try {
        const response = await fetch('http://localhost:3001/productos?limit=12');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProdctos();
  }, []);

  return (
    <>
      <HeaderClients /> {/* Se renderiza HeaderClients solo si el usuario está autenticado */}
      <Hero />
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Productos</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">LOS MÁS DESTACADOS DE LA TEMPORADA</h1>
      </div>
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <ProductCard products={products} />
      )}
      <Stats />
    </>
  );
};

export default Inicio;
