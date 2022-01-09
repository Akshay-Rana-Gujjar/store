import { collection, getDocs, query } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CATEGORY, PRODUCT } from '../../constant/collection';
import { FirebaseContext } from '../../provider/firebase';
import useCart, { useAddToCart, useCartDecrement, useCartIncrement } from '../../utils/cart';
import './style.css';

export default function Category() {
  const { id } = useParams();
  const { firestore } = useContext(FirebaseContext);
  const [productData, setProductData] = useState([]);
  const cart = useCart();

  useEffect(() => {
    const q = query(collection(firestore, `${CATEGORY}/${id}/${PRODUCT}`));
    getDocs(q).then((docs) => {
      const tempDocs = [];
      docs.forEach((doc) => {
        const docObj = {
          ...doc.data(),
          id: doc.id,
        };
        tempDocs.push(docObj);
      });
      setProductData(tempDocs);
    });
  }, []);

  function ProductItem({ product, className: classN }) {
    const handleAddToCart = useAddToCart();
    const handleCartIncrement = useCartIncrement();
    const handleCartDecrement = useCartDecrement();

    const cartCount = cart && cart[product.id] && cart[product.id].cartCount;

    return (
      <div className={`${classN}`}>
        <img src={product.img} alt="" className="product-img img-fluid" />
        <div className="product-name h5">{product.name}</div>
        <div className="product-unit text-muted small">{product.unit}</div>
        <div className="d-flex justify-content-between1 align-items-baseline">
          {product?.price && (
            <div
              className={
                'product-price text-green fw-bold ' +
                (product.discountedPrice &&
                  'text-decoration-line-through small')
              }
            >
              {product.currencySymbol}
              {product.price}
            </div>
          )}
          {product?.discountedPrice && (
            <div className="text-green fw-bold ms-1">
              {product.currencySymbol}
              {product.discountedPrice}
            </div>
          )}
        </div>
        {cartCount ? (
          <div className="d-flex text-white align-items-center justify-content-between">
            <div
              className="item-cart-icon text-center bg-green rounded-circle p-1 shadow"
              onClick={() => handleCartDecrement(product.id)}
            >
              -
            </div>
            <div className="text-green">{cartCount}</div>
            <div
              className="bg-green item-cart-icon text-center rounded-circle p-1 shadow"
              onClick={() => handleCartIncrement(product.id)}
            >
              +
            </div>
          </div>
        ) : (
          <div
            className="bg-green p-1 text-center text-white rounded shadow"
            onClick={() => handleAddToCart(product.id, product)}
          >
            Add
          </div>
        )}
      </div>
    );
  }

  return (
    <div className=" category-page-container p-3 position-relative bg-light">
      <div className="row container-fluid1 mx-1">
        {productData.length === 0 && (
          <>
            <div className="product-skeleton col-6 border shadow-sm p-3 py-2 card rounded-0" />
            <div className="product-skeleton col-6 border shadow-sm p-3 py-2 card rounded-0" />
          </>
        )}
        {productData.map((p) => (
          <ProductItem
            className="col-6 border border-light shadow-sm p-3 py-2 card rounded-0"
            product={p}
          />
        ))}
      </div>
    </div>
  );
}
