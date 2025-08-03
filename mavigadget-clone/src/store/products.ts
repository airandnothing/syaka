import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '@/data/products';
import type { Product } from '@/types';

interface ProductsState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: initialProducts,

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `product_${Date.now()}`, // 生成唯一ID
        };

        set(state => ({
          products: [...state.products, newProduct]
        }));
      },

      updateProduct: (id, updates) => {
        set(state => ({
          products: state.products.map(product =>
            product.id === id ? { ...product, ...updates } : product
          )
        }));
      },

      deleteProduct: (id) => {
        set(state => ({
          products: state.products.filter(product => product.id !== id)
        }));
      },

      getProductById: (id) => {
        const { products } = get();
        return products.find(product => product.id === id);
      },

      getProductsByCategory: (category) => {
        const { products } = get();
        return products.filter(product => product.category === category);
      },
    }),
    {
      name: 'mavigadget-products',
    }
  )
);
