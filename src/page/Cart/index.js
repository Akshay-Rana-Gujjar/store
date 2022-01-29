import React, { useState } from 'react';
import './style.css';
import { Back } from '../../component/Icons';
import useCart, { useCartDecrement, useCartIncrement, UseEmptyCart } from '../../utils/cart';
import { Link } from 'react-router-dom';

export default function Cart() {
  const cart = useCart();
  const handleCartIncrement = useCartIncrement();
  const handleCartDecrement = useCartDecrement();
	const emptyCart = UseEmptyCart();
  const store = JSON.parse(localStorage.getItem('store') || null) || {};
  const [showLoading, setShowLoading] = useState(false);
  const sendOrderToLINE = () => {
    setShowLoading(true);
    const {lineId, currencySymbol} = store;
		let totalPrice = 0;
    let message = `Hello I want to order:
		${Object.keys(cart).map((key) => {
      const item = cart[key];
			if(!isNaN(Number(item.discountedPrice || item.price)) && !isNaN(item.cartCount))
				totalPrice+= Number(item.discountedPrice || item.price) * item.cartCount;
			const cartCount = item.cartCount || '';
			const itemName = item.name || '';
			const itemUnit = item.unit || '';
      return `${cartCount} ${itemName} (${itemUnit}) \n`;
    })}
		`;
		if(totalPrice>0){
			message += "Total Bill: "+currencySymbol + totalPrice;
		}
    const LINE_SCHEMA = `https://line.me/R/oaMessage/@${lineId}/?${encodeURI(
      message
    )}`;
    window.open(LINE_SCHEMA, '_blank');
    setTimeout(() => setShowLoading(false), 10000);
  };

  if (!cart || Object.keys(cart).length === 0) {
    return (
      <div className="position-absolute  text-center top-50 start-50 translate-middle">
        <h4 className="text-secondary small text-nowrap ">
          you don't have anything in your cart
        </h4>
        <Link className="bg-green text-white btn shadow btn-block w-75" to="/">
          start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-2 pt-4 d-flex align-items-center flex-column w-100">
        <div className="text-muted h3">
          Delivering {Object.keys(cart).length} item(s)
        </div>
				<div className="ms-3 text-danger align-self-end me-1 small" onClick={emptyCart}>
					empty cart
				</div>
      </div>
      {Object.keys(cart).map((key) => {
        const item = cart[key];
        return (
          <div className="card w-100 border-top-0 border-start-0 border-end-0 border-bottom">
            <div className="row g-0">
              <div className="col-4">
                <img src={item.img} className="img-fluid" alt="" srcset="" />
              </div>
              <div className="col-8">
                <div className="card-body position-relative">
                  <div className="text-black display-6">{item.name}</div>
                  <div className="d-flex fs-5">
                    <div className="fw-bold">
                      {item.currencySymbol}
                      {item.discountedPrice || item.price}
                    </div>
                    {item.discountedPrice && (
                      <div className="text-decoration-line-through ms-2 text-muted">
                        {item.currencySymbol}
                        {item.price}
                      </div>
                    )}
                  </div>
                  <div className="text-muted">{item.unit}</div>
                  <div className="position-absolute end-0 bottom-0 mb-2 me-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        onClick={() => handleCartDecrement(item.id)}
                        className="bg-green text-white rounded-circle shadow d-flex justify-content-center align-items-center cart-item-button"
                      >
                        -
                      </div>
                      <div className="mx-2">{item.cartCount}</div>
                      <div
                        onClick={() => handleCartIncrement(item.id)}
                        className="bg-green text-white rounded-circle shadow d-flex justify-content-center align-items-center cart-item-button"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="mb-5 p-2 small text-center fst-italic">
        have a great day!
      </div>
      <div
        onClick={sendOrderToLINE}
        className="position-fixed bottom-0 w-100 bg-green p-2 text-white h3 mb-0 d-flex justify-content-center align-items-center"
      >
        <div className="fw-light d-flex align-items-center">
          <div className="order-btn-sub-detail text-center m-1">
            {Object.keys(cart).length} item(s)
          </div>
          <div className="">Order on LINE</div>
        </div>
        <div className="next-icon d-flex align-items-center">
          <Back />
        </div>
      </div>
      {showLoading && (
        <>
          <div
            className="position-fixed start-0 top-0 end-0 bottom-0 bg-black d-flex justify-content-center align-items-center"
            style={{ '--bs-bg-opacity': 0.5, zIndex: 21 }}
          >
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div className="fw-bold ms-2">Opening Line App...</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
