import { motion } from "framer-motion";
import { useProductStore } from "../../store/product";
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
<div className="p-5 min-h-screen flex justify-center items-center dark:bg-slate-900 bg-slate-300">
      <motion.div
        className="max-w-4xl w-full bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="p-6 flex flex-col justify-center md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {product.name}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            ${product.price}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
