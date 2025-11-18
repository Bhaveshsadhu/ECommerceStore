import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const qty = Number(quantity) || 1;
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.image,
          quantity: qty,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((prev) => {
      const qty = Math.max(Number(quantity) || 1, 1);
      return prev.map((item) =>
        item._id === productId ? { ...item, quantity: qty } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item._id !== productId));
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, totalItems };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      subtotal: totals.subtotal,
      totalItems: totals.totalItems,
    }),
    [items, addToCart, updateQuantity, removeFromCart, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

