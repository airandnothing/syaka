'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartState, CartItem, Product } from '@/types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      subtotal: 0,
      shipping: 0,
      discount: 0,

      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);

        if (existingItem) {
          set(state => ({
            items: state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          }));
        } else {
          set(state => ({
            items: [...state.items, { id: product.id, product, quantity }],
          }));
        }

        get().calculateTotals();
      },

      removeItem: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
        }));
        get().calculateTotals();
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        }));
        get().calculateTotals();
      },

      clearCart: () => {
        set({ items: [], total: 0, subtotal: 0, shipping: 0, discount: 0 });
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      calculateTotals: () => {
        const { items } = get();
        const subtotal = items.reduce((total, item) => {
          const price = item.product.originalPrice && item.product.discount
            ? item.product.price
            : item.product.price;
          return total + (price * item.quantity);
        }, 0);

        const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
        const discount = 0; // Could be calculated based on promo codes
        const total = subtotal + shipping - discount;

        set({ subtotal, shipping, discount, total });
      },
    }),
    {
      name: 'mavigadget-cart',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : (undefined as unknown as Storage))),
    }
  )
);
