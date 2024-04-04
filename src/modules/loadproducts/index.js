import React, { useState } from "react";
import placeholderImage from "../../assets/C4MBALACH3S.jpg";

const LoadProducts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([placeholderImage]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fk_tipo_prod, setFk_tipo_prod] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "fk_tipo_prod") {
      setFk_tipo_prod(value);
    }
  };

  const handleImageChange = (event) => {
    const imageFiles = Array.from(event.target.files);
    setImage(imageFiles);

    const previews = imageFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    image.forEach((image) => {
      formData.append("image", image);
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("fk_tipo_prod", fk_tipo_prod);

    try {
      const response = await fetch("https://backcambamaster-production.up.railway.app/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Imágenes y datos cargados correctamente");
      } else {
        console.error("Error al cargar las imágenes y los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagePreviews.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre del Producto
            </label>
            <input
              type="text"
              id="productName"
              name="title"
              className="border rounded w-full py-2 px-3"
              value={title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Descripción del Producto
            </label>
            <textarea
              id="productDescription"
              name="description"
              className="border rounded w-full py-2 px-3"
              value={description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productPrice"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Precio del Producto
            </label>
            <input
              type="number"
              id="productPrice"
              name="price"
              className="border rounded w-full py-2 px-3"
              value={price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fk_tipo_prod"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tipo de Producto
            </label>
            <select
              id="fk_tipo_prod"
              name="fk_tipo_prod"
              className="border rounded w-full py-2 px-3"
              value={fk_tipo_prod}
              onChange={handleInputChange}
            >
              <option value="">Seleccione un tipo</option>
              <option value="1">chaquetas</option>
              <option value="2">pantalones</option>
              <option value="3">zapatos</option>
              <option value="4">medias</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="productImage"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Imagen(es) del Producto
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="border rounded w-full py-2 px-3"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar Producto
          </button>
        </form>
      </div>
      <div className="w-1/2 ml-4">
        <h2 className="text-2xl font-semibold mb-4">
          Vista Previa de las Imágenes
        </h2>
        <div className="relative">
          <img
            src={imagePreviews[currentImageIndex]}
            alt={`Preview ${currentImageIndex}`}
            className="w-96 h-96 object-cover"
          />
          {imagePreviews.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                &lt;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                &gt;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadProducts;
