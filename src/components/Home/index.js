import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories'
import FeatureCard from '../../components/FeatureCard'
import Hero from '../../components/Hero'
import ProductCard from '../../components/ProductCard'
import Stats from '../../components/StatCard'

const Home = () => {
  const [productos, setProductos] = useState([])
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3001/productos?limit=12')
        const data = await response.json()
        setProductos(data)
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    }
    fetchProductos()
  }, [])

  const handleProductClick = (productos) => {
    setSelectedProducto(productos);
  }

  return (
    <>
      <Hero />
      <Categories />
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Productos</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">LOS MAS DESTACADOS DE LA TEMPORADA</h1>
      </div>
      {productos.length > 0 ?
        <ProductCard productos={productos} onProductClick={handleProductClick} /> :
        <div>Loading.....</div>
      }
      {selectedProducto && <FeatureCard product={selectedProducto} onClose={() => setSelectedProducto(null)} />}
      <Stats />
    </>
  )
}

export default Home