import React, { useState } from 'react';
import placeholderImage from '../../assets/C4MBALACH3S.jpg'; // Ruta de la imagen de marcador de posición

const Products = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImages, setProductImages] = useState([]); // Estado para almacenar múltiples imágenes
  const [imagePreviews, setImagePreviews] = useState([placeholderImage]); // Estado para almacenar las vistas previas de las imágenes, inicializado con la imagen predeterminada
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen actualmente visible en la vista previa
  const [productType, setProductType] = useState(''); // Estado para el tipo de producto

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'productName') {
      setProductName(value);
    } else if (name === 'productDescription') {
      setProductDescription(value);
    } else if (name === 'productPrice') {
      setProductPrice(value);
    } else if (name === 'productType') { // Manejar cambios en el campo de tipo de producto
      setProductType(value);
    }
  };

  const handleImageChange = (event) => {
    const imageFiles = Array.from(event.target.files); // Convertir el objeto FileList a un array
    setProductImages(imageFiles); // Actualizar el estado de las imágenes

    // Generar vistas previas de las imágenes
    const previews = imageFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    productImages.forEach(image => {
      formData.append('productImage', image);
    });
  
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

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagePreviews.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto</label>
            <input type="text" id="productName" name="productName" className="border rounded w-full py-2 px-3" value={productName} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">Descripción del Producto</label>
            <textarea id="productDescription" name="productDescription" className="border rounded w-full py-2 px-3" value={productDescription} onChange={handleInputChange}></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-gray-700 text-sm font-bold mb-2">Precio del Producto</label>
            <input type="number" id="productPrice" name="productPrice" className="border rounded w-full py-2 px-3" value={productPrice} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="productType" className="block text-gray-700 text-sm font-bold mb-2">Tipo de Producto</label>
            <select id="productType" name="productType" className="border rounded w-full py-2 px-3" value={productType} onChange={handleInputChange}>
              <option value="">Seleccione un tipo</option>
              <option value="1">chaquetas</option>
              <option value="2">pantalones</option>
              <option value="3">zapatos</option>
              <option value="4">medias</option>
              {/* Agrega más opciones según tus necesidades */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="productImage" className="block text-gray-700 text-sm font-bold mb-2">Imagen(es) del Producto</label>
            <input type="file" id="productImage" name="productImage" className="border rounded w-full py-2 px-3" accept="image/*" multiple onChange={handleImageChange} />
          </div>
          <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Agregar Producto</button>
        </form>
      </div>
      <div className="w-1/2 ml-4">
        <h2 className="text-2xl font-semibold mb-4">Vista Previa de las Imágenes</h2>
        <div className="relative">
          <img src={imagePreviews[currentImageIndex]} alt={`Preview ${currentImageIndex}`} className="w-96 h-96 object-cover" />
          {imagePreviews.length > 1 && (
            <>
              <button onClick={handlePrevImage} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
                &lt;
              </button>
              <button onClick={handleNextImage} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
                &gt;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
