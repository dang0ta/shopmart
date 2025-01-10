import { Product } from "@models/product";
import { createContext, ReactNode, useContext, useState } from "react";

type CartItem = {
  product: Product;
  quantity: number;
};

type Cart = {
  items: Record<number, CartItem>;
  get: (productId: number) => CartItem | null;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  total: () => number;
  count: () => number;
};

const persistCart = (items: Record<number, CartItem>) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const loadPersistedCart = (): Record<number, CartItem> =>
  JSON.parse(localStorage.getItem("cart") || "{}") as Record<number, CartItem>;

const CartContext = createContext<Cart>({
  items: loadPersistedCart(),
  get: () => null,
  addItem: () => {},
  removeItem: () => {},
  total: () => 0,
  count: () => 0,
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Record<number, CartItem>>(
    loadPersistedCart()
  );
  const addItem = (product: Product) => {
    const existing = items[product.id];
    if (existing) {
      existing.quantity++;
      items[product.id] = existing;
    } else {
      items[product.id] = { product, quantity: 1 };
    }

    setItems({ ...items });
    persistCart(items);
  };

  const removeItem = (productId: number) => {
    const existing = items[productId];
    if (existing) {
      if (existing.quantity == 1) {
        delete items[productId];
      } else {
        existing.quantity--;
        items[productId] = existing;
      }
    }

    setItems({ ...items });
    persistCart(items);
  };

  const total = (): number => {
    console.log({items})
    return Object.keys(items).reduce((acc, cur) => {
        const keyn = Number(cur)
        if (Number.isNaN(keyn)) {
            return acc;
        }

        const item = items[keyn]

        console.log({item, q: item.quantity, price: item.product.price})

      acc += item.quantity * (item.product.price || 0);
      return acc;
    }, 0);
  };

  const count = () => Object.entries(items).length;

  const get = (productId: number): CartItem | null => {
    return items[productId];
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        total,
        count,
        get,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);