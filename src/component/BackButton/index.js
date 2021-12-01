import React from "react";
import { useNavigate } from "react-router-dom";
import { Back } from "../Icons";
import "./style.css";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <div
      className="position-fixed shadow rounded-circle bg-white p-2 back-button-container m-3"
      role="button"
      onClick={() => navigate(-1)}
    >
      <Back />
    </div>
  );
}
