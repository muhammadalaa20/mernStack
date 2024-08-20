import { useProductStore } from "../store/product";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EditProductModal from "../components/Edit"; // Import the modal component

export default function Home() {
  const { getProducts, products } = useProductStore();
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="p-5 min-h-screen dark:bg-slate-900 bg-slate-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden flex flex-col justify-between">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover cursor-pointer" />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 cursor-pointer">{product.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">${product.price}</p>
                  <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                </div>
              </Link>
              <div className="p-4 flex justify-between">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  aria-label="Delete Product"
                  onClick={() => deleteProduct(product._id)}
                >
                  <MdDeleteOutline />
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  aria-label="Edit Product"
                  onClick={() => handleEditClick(product)}
                >
                  <MdEdit />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No products available.{' '}
            <Link to="/create" className="text-blue-500 hover:text-blue-700 font-bold">
              Create Product
            </Link>
          </p>
        )}
      </div>

      {/* Render EditProductModal */}
      {showModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onUpdate={updateProduct}
        />
      )}
    </div>
  );
}
