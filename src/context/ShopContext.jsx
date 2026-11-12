import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  // у кошику зберігаємо тільки { id: кількість }, ціни завжди беремо з каталогу
  const [cart, setCart] = useLocalStorage('volt_cart', {});
  const [favorites, setFavorites] = useLocalStorage('volt_favorites', []);

  const value = useMemo(() => {
    const items = Object.entries(cart)
      .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty }))
      .filter((item) => item.product);

    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const total = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);

    function setQty(id, qty) {
      const product = PRODUCTS.find((p) => p.id === id);
      const safeQty = Math.max(0, Math.min(qty, product.stock));

      setCart((prev) => {
        const next = { ...prev };
        if (safeQty === 0) delete next[id];
        else next[id] = safeQty;
        return next;
      });
    }

    return {
      items,
      count,
      total,
      favorites,
      addToCart: (id, qty = 1) => setQty(id, (cart[id] || 0) + qty),
      setQty,
      removeFromCart: (id) => setQty(id, 0),
      clearCart: () => setCart({}),
      toggleFavorite: (id) =>
        setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])),
    };
  }, [cart, favorites, setCart, setFavorites]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
