import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORY } from "../../constant/collection";
import {FirebaseContext} from "../../provider/firebase";
import "./style.css";
import {collection, query, getDocs } from 'firebase/firestore'


export default function Home() {

	const [categoryData, setCategoryData] = useState([]);

  const data = [
    {
      name: "Vegetables",
      img: "https://www.freepnglogos.com/uploads/vegetables-png/fruit-and-vegetables-basket-png-20.png",
    },
    {
      name: "Fruits",
      img: "https://freepngimg.com/thumb/fruit/6-2-fruit-png-picture.png",
    },
    {
      name: "Vegetables",
      img: "https://www.freepnglogos.com/uploads/vegetables-png/fruit-and-vegetables-basket-png-20.png",
    },
    {
      name: "Fruits",
      img: "https://freepngimg.com/thumb/fruit/6-2-fruit-png-picture.png",
    },
    {
      name: "Vegetables",
      img: "https://www.freepnglogos.com/uploads/vegetables-png/fruit-and-vegetables-basket-png-20.png",
    },
    {
      name: "Fruits",
      img: "https://freepngimg.com/thumb/fruit/6-2-fruit-png-picture.png",
    },
    {
      name: "Vegetables",
      img: "https://www.freepnglogos.com/uploads/vegetables-png/fruit-and-vegetables-basket-png-20.png",
    },
    {
      name: "Fruits",
      img: "https://freepngimg.com/thumb/fruit/6-2-fruit-png-picture.png",
    },
  ];

  const { firestore } = useContext(FirebaseContext);

	useEffect(() => {
		console.log(firestore);
		
		const q = query(collection(firestore, CATEGORY));
		getDocs(q).then((docs)=>{
			const tempDocs = [];
			docs.forEach(doc=>{
				const docObj = {
					...doc.data(),
					id: doc.id
				}
				tempDocs.push(docObj);
			});
			setCategoryData(tempDocs);
		})
	
	}, []);

  function CategoryItem({ category = {}, onClick = null }) {
    return (
      <Link to={`/category/${category.id}`}>
        <div
          className="category-item position-relative p-0 text-white border1 border-light1 rounded-3 mb-3 card shadow bg-category overflow-hidden"
          onClick={onClick}
        >
          <img
            src={category.img}
            alt=""
            srcset=""
            className="category-item-img"
          />
          <div className="h3 position-absolute ps-2 w-100 category-item-name text-g-reen mb-0 py-3">
            {category.name}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="">
      <div className="home-category-container container p-3 position-relative bg-white">
        <div className="h2 text-green">Categories</div>
        <div className="category-item-container">
          {categoryData.map((c) => (
            <CategoryItem category={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
