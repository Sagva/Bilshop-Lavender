import {useContext } from "react";
import { ShopCartContext } from "../contexts/ShopCartContext";

//button to empty shopping cart
function EmptyCart() {
  const { emptyCart } = useContext(ShopCartContext)


  return (
    <div className="d-flex justify-content-start mt-3">
      <button className={`btnEmptyCart`} onClick={(e) => emptyCart(e)}>Empty all</button>
    </div>
  );
}

export default EmptyCart;