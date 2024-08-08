import React from "react";
import "../App.css";

export default function Car({ car, sellCarHandler, addStockHandler }) {
  return (
    <div>
      <div className="box">
        <div>{car.name}</div>
        <div>{car.quantity}</div>
        <button onClick={() => sellCarHandler(car.id)}>Sell</button>
        <button onClick={() => addStockHandler(car.id)}>Add Stock</button>
      </div>
    </div>
  );
}
