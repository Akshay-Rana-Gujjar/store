import React, { useEffect, useRef, useState } from "react";
import { Location, Phone } from "../Icons";
import "./style.css";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { STORE } from "../../constant/collection";

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
        localStorage.setItem("store", JSON.stringify(data));
				data?.favIcon && setFavIcon(data?.favIcon);
        setStoreInfo(data);
      }
    });
  }

	function setFavIcon(uri){
		const favEle = document.head.querySelector("link[rel='icon']");
		if(favEle){
			favEle.href = uri;
		}
	}

  return (
    <div>
      <div className="bg-green px-3 py-4 text-center position-relative text-white h3 overflow-hidden">
        <span className="green-circle position-absolute top-0 start-0 translate-middle rounded-circle p-5"></span>
        <span className="green-circle position-absolute top-100 start-100 translate-middle rounded-circle p-5"></span>
				{storeInfo?.logo && <div className="mb-2">
					<img src={storeInfo.logo} alt="" className="img-fluid store-logo" />
				</div>}
        <div className="mb-2">{storeInfo?.name}</div>
        <div className="small store-location text-green mb-1">
          <Location />
          <span>{storeInfo?.address}</span>
        </div>
        <div className="small store-location text-green">
          <Phone />
          <span>{storeInfo?.phone}</span>
        </div>
      </div>
    </div>
  );
}
