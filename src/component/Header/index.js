import React, { useEffect, useRef, useState } from 'react';
import { Location, Phone } from '../Icons';
import './style.css';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { STORE } from '../../constant/collection';

export default function Header() {
  const firestore = useRef(getFirestore()).current;
  const [storeInfo, setStoreInfo] = useState({});

  useEffect(fetchStoreInfo, []);

  function fetchStoreInfo() {
    const storeRef = collection(firestore, STORE);

    getDocs(storeRef).then((docs) => {
      console.log(docs.docs[0]);
      if (!docs.empty) {
        const docData = docs.docs[0];
        const data = {
          ...docData.data(),
          id: docData.id,
        };
        console.log(data);
        localStorage.setItem('store', JSON.stringify(data));
        data?.favIcon && setFavIcon(data?.favIcon);
        setStoreInfo(data);
      }
    });
  }

  function setFavIcon(uri) {
    const favEle = document.head.querySelector("link[rel='icon']");
    if (favEle) {
      favEle.href = uri;
    }
  }

  return (
    <div>
      <div className="bg-green px-3 pb-4 pt-2 d-flex align-items-center flex-column position-relative text-white h3 overflow-hidden">
        <span className="green-circle position-absolute top-0 start-0 translate-middle rounded-circle p-5"></span>
        <span className="green-circle position-absolute top-100 start-100 translate-middle rounded-circle p-5"></span>
        {storeInfo?.logo ? (
          <div className="mb-2">
            <img src={storeInfo.logo} alt="" className="img-fluid store-logo" />
          </div>
        ) : (
          <div className="store-logo"></div>
        )}
        <div
          className={
            'mb-2 ' + (!storeInfo?.name && 'text-skeleton-heading rounded w-50')
          }
        >
          {storeInfo?.name}
        </div>
        <div className="small store-location text-green mb-1 d-flex justify-content-center align-items-center w-100">
          <Location />
          <div
            className={
              !storeInfo?.address && 'text-skeleton-small w-50 rounded'
            }
          >
            {storeInfo?.address}
          </div>
        </div>
        <div className="small store-location text-green  d-flex justify-content-center align-items-center w-100">
          <Phone />
          <div
            className={!storeInfo?.phone && 'text-skeleton-small w-25 rounded'}
          >
            {storeInfo?.phone}
          </div>
        </div>
      </div>
    </div>
  );
}
