import { useContext } from 'react';
import { CartContext } from '../provider/Cart';

const useCart = () => {
  const { cart } = useContext(CartContext);
  return cart;
};

export const useAddToCart = () => {
  const { setCart } = useContext(CartContext);
  return (id, productItem) => {
    productItem.cartCount = 1;
    setCart((prev) => {
      return { ...prev, [id]: productItem };
    });
  };
};

export const useCartIncrement = () => {
  const { cart, setCart } = useContext(CartContext);
  return function (id) {
    const item = cart[id];
		item.cartCount++;
    setCart((prev) => {
      return { ...prev, [id]: item };
    });
  };
};
export const useCartDecrement = () => {
  const { cart, setCart } = useContext(CartContext);

  return function (id) {
    let item = cart[id];
    item.cartCount--;

    setCart((prev) => {
      if (!item.cartCount) {
        delete prev[id];
        return { ...prev };
      }
      return { ...prev, [id]: item };
    });
  };
};

export const UseEmptyCart = () => {
  const { setCart } = useContext(CartContext);
  return () => {
    setCart(() => {
      return null;
    });
  };
};

export default useCart;
