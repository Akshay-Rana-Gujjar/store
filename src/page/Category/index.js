import { collection, getDocs, query } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CATEGORY, PRODUCT } from "../../constant/collection";
import { FirebaseContext } from "../../provider/firebase";
import "./style.css";

export default function Category() {
  const { id } = useParams();
  const { firestore } = useContext(FirebaseContext);
	const [productData, setProductData] = useState([]);

  useEffect(() => {
    console.log(firestore);

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
    return (
      <div className={`${classN}`}>
        <img src={product.img} alt="" className="product-img img-fluid" />
        <div className="product-name h5">{product.name}</div>
        <div className="product-unit text-muted small">{product.unit}</div>
        <div className="d-flex justify-content-between1 align-items-baseline">
          <div
            className={
              "product-price text-green fw-bold " +
              (product.discountedPrice && "text-decoration-line-through small")
            }
          >
            {product.currencySymbol}
            {product.price}
          </div>
          <div className="text-green fw-bold ms-1">
            {product.currencySymbol}
            {product.discountedPrice}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" category-page-container p-3 position-relative bg-light">
      <div className="row container-fluid1 mx-1">
        {productData.map((p) => (
          <ProductItem
            className="col-6 border border-light shadow-sm p-3 card rounded-0"
            product={p}
          />
        ))}
      </div>
    </div>
  );
}
