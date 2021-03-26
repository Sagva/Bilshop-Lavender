import { CarContext } from "../contexts/CarContext";
import React, { useContext } from "react";
import styles from "../styles/PreviousOrders.Module.css";

function PreviousOrders(order) {
  const { showPrice } = useContext(CarContext);
  return (
    <div className="mb-5">
      <table border="3" className="table table-responsive table-bordered">
        <thead>
          <tr className={`${styles.fatBorder} col-12 col-md-4`}>
            <th className="text-center">Make</th>
            <th className="text-center">Model</th>
            <th className="text-center">Price</th>
          </tr>
        </thead>

        {order.order.products.map((product, i) => (
          <tbody key={i} className="col-12 col-md-4">
            <tr>
              <td className="text-center">{product.make}</td>
              <td className="text-center">{product.model}</td>
              <td className="text-center">{showPrice(product.price)} SEK</td>
            </tr>
          </tbody>
        ))}
      </table>
      <div className={`${styles.totalPriceStyle} text-center`}>
        {`Total Price: ${showPrice(order.order.priceTotal)} SEK`}
      </div>
    </div>
  );
}

export default PreviousOrders;
