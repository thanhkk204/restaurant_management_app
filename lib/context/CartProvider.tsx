"use client"
// context/CartContext.tsx
import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem } from '../../types/type';


type CartState = CartItem[];

type CartAction =
  | { type: 'SET_CART'; payload: CartState }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { dish_id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { dish_id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.dish_id === action.payload.dish_id);
      if (existingItem) {
        return state.map(item =>
          item.dish_id === action.payload.dish_id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'REMOVE_ITEM':
      return state.filter(item => item.dish_id !== action.payload.dish_id);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.dish_id === action.payload.dish_id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

interface CartContextProps {
  cart: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (dish_id: string) => void;
  updateQuantity: (dish_id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (dish_id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { dish_id } });
  };

  const updateQuantity = (dish_id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { dish_id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
