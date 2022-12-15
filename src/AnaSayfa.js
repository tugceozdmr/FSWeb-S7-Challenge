import React from "react";
import pizzaPic from "./Assets/Pizza.jpg";
import "./anasayfa.css";

export default function AnaSayfa() {
  return (
    <div>
      <img src={pizzaPic} className="pizzaPic" />
    </div>
  );
}
