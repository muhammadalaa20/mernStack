import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
            return { message: 'All fields are required' };
        }
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) throw new Error('Failed to create product');
            const data = await response.json();
            set((state) => ({
                products: [...state.products, data],
            }));
            console.log('Product added:', data);
            return { message: 'Product added successfully', data };
        } catch (error) {
            console.error('Error:', error);
            return { message: error.message };
        }
    },

    getProducts: async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            set({ products: data });
            return data;
        } catch (error) {
            console.error('Error:', error);
            return { message: error.message };
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete product');
            set((state) => ({
                products: state.products.filter((product) => product._id !== id),
            }));
            return { message: 'Product deleted successfully' };
        } catch (error) {
            console.error('Error:', error);
            return { message: error.message };
        }
    },

    updateProduct: async (id, updatedProduct) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) throw new Error('Failed to update product');
            const data = await response.json();
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? data : product
                ),
            }));
            return { message: 'Product updated successfully', data };
        } catch (error) {
            console.error('Error:', error);
            return { message: error.message };
        }
    },
}));
