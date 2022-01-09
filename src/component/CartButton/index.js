import React from 'react';
import './style.css';
import { Cart } from '../Icons';
import { Link } from 'react-router-dom';
import useCart from '../../utils/cart';

export default function CartButton() {
  const cart  = useCart();

  return (
    <Link to="/cart">
      <div className="cart-container shadow position-fixed bg-white m-3 rounded-circle p-2 end-0">
        <div className="cart-icon">
          <Cart />
        </div>
        <div className="cart-count d-flex justify-content-center align-items-center position-absolute bg-danger top-0 start-1001 end-0  translate-middle1 rounded-circle p-1 small text-white">
          {cart && Object.keys(cart).length || "0"}
        </div>
      </div>
    </Link>
  );
}
