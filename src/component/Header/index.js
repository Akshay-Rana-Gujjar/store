import React from "react";
import { Location, Phone } from "../Icons";
import "./style.css";

export default function Header() {
  return (
    <div>
      <div className="bg-green p-5 py-4 text-center position-relative text-white h3 overflow-hidden">
        <span className="green-circle position-absolute top-0 start-0 translate-middle rounded-circle p-5"></span>
        <span className="green-circle position-absolute top-100 start-100 translate-middle rounded-circle p-5"></span>
        <div className="mb-2">Akshay's Store</div>
        <div className="small store-location text-light1 d-flex align-items-center justify-content-center text-green mb-1">
          <Location />
          121, Delhi, India
        </div>
        <div className="small store-location text-light1 d-flex align-items-center justify-content-center text-green">
          <Phone />
          +91 81307 56533
        </div>
      </div>
    </div>
  );
}
