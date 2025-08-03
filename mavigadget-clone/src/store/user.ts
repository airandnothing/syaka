import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  favoriteProducts: string[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

// Mock user database for demo purposes
const mockUsers = new Map<string, any>();

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      favoriteProducts: [],

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo purposes, accept any email/password combination
        // In a real app, this would validate against a backend
        const userData = mockUsers.get(email) || {
          id: `user_${Date.now()}`,
          email,
          firstName: email.split('@')[0],
          lastName: 'User',
          createdAt: new Date()
        };

        if (!mockUsers.has(email)) {
          // Auto-register if user doesn't exist (for demo)
          mockUsers.set(email, userData);
        }

        set({
          user: userData,
          isAuthenticated: true,
        });

        return true;
      },

      register: async (userData) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Check if user already exists
        if (mockUsers.has(userData.email)) {
          return false; // User already exists
        }

        const newUser: User = {
          id: `user_${Date.now()}`,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          createdAt: new Date()
        };

        mockUsers.set(userData.email, newUser);

        set({
          user: newUser,
          isAuthenticated: true,
        });

        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          favoriteProducts: [], // Clear favorites on logout
        });
      },

      updateProfile: (updates) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...updates };
          set({ user: updatedUser });

          // Update mock database
          mockUsers.set(user.email, updatedUser);
        }
      },

      addToFavorites: (productId) => {
        const { favoriteProducts } = get();
        if (!favoriteProducts.includes(productId)) {
          set({
            favoriteProducts: [...favoriteProducts, productId],
          });
        }
      },

      removeFromFavorites: (productId) => {
        const { favoriteProducts } = get();
        set({
          favoriteProducts: favoriteProducts.filter(id => id !== productId),
        });
      },

      isFavorite: (productId) => {
        const { favoriteProducts } = get();
        return favoriteProducts.includes(productId);
      },
    }),
    {
      name: 'mavigadget-user',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        favoriteProducts: state.favoriteProducts,
      }),
    }
  )
);
