import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartStore = {
  isCartOpen: boolean;
  cartItems: CartItem[];
  toggleCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  isCartOpen: false,
  cartItems: [],
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeCart: () => set(() => ({ isCartOpen: false })),

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),
}));
