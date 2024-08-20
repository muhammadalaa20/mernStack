import { useProductStore } from "../store/product";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, getProducts } = useProductStore();
  const product = products.find((product) => product._id === id);

  useEffect(() => {
    if (!products.length) {
      getProducts(); // Fetch products if they haven't been loaded yet
    }
  }, [products, getProducts]);

  if (!product) {
    return <p className="text-center text-gray-600">Loading product...</p>;
  }

  return (
    <div className="p-5 min-h-screen dark:bg-slate-900 bg-slate-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{product.name}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">${product.price}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
