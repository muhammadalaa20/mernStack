import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/react'
export default function CreateProduct () {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const toast = useToast()
    const addProduct = useProductStore((state) => state.createProduct);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { name, price, description, image};
        if (!name || !price || !description || !image) {
            toast({
                title: 'Error',
                description: 'All fields are required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        } else if (price < 0) {
            toast({
                title: 'Error',
                description: 'Price cannot be negative',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        } else if (!image.startsWith('http') && !image.startsWith('https')) {
            toast({
                title: 'Error',
                description: 'Image URL is not valid',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        } else if (!image.endsWith('.jpg') && !image.endsWith('.jpeg') && !image.endsWith('.png')) {
            toast({
                title: 'Error',
                description: 'Image format is not valid',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        } else {
            toast({
                title: 'Success',
                description: 'Product added successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }

        await addProduct(product); 
        setName('');
        setPrice('');
        setDescription('');
        setImage('');
        
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
        >
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add Product
                </button>
            </form>
        </motion.div>
    );
};
