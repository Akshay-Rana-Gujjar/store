import { createContext, useState } from 'react';

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(
    (localStorage.getItem('cart') &&
      JSON.parse(localStorage.getItem('cart'))) ||
      {}
  );

  function _setCart(cartData) {
    let data = null;
    if (typeof cartData === 'function') {
      setCart((prev) => {
        data = cartData(prev);
        const dataToString = JSON.stringify(data);
        localStorage.setItem('cart', dataToString);
        return data;
      });
    } else {
      data = cartData;
      const dataToString = JSON.stringify(data);
      localStorage.setItem('cart', dataToString);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart: _setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
