import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ShoppingCartTotal from "../components/ShoppingCartTotal";
import styles from "../styles/ShoppingCard.module.css";
import { ShopCartContext } from '../contexts/ShopCartContext'
import { CarContext } from '../contexts/CarContext';
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/EmptyCart";

function ShoppingCart() {
  const { showPrice } = useContext(CarContext); //for showing numbers in a friendly way
  const { purchases, setDeliveryCost, deleteProduct } = useContext(ShopCartContext)

 //2 variables that useEffect listens in order to re-rendering page when the user choose delivery option or deleted product
  const [isRadioButtonClicked, setIsRadioButtonClicked] = useState('false')
  const [isDeleteProductClicked, setisDeleteProductClicked] = useState('false')

  //fires when the user presses radio button for choosing delivery option
  const handleClick = (e) => {
    setDeliveryCost(e)
    setIsRadioButtonClicked(!isRadioButtonClicked)
  }

  //for deleting a car from the shopping cart
  const handleDeleteButtonClick = (productToDelete) => {
    deleteProduct(productToDelete)
    setisDeleteProductClicked(!isDeleteProductClicked)
  }

  //for re-rendering when the user either choose delivery option or deletes product
  useEffect(() => {
  }, [isRadioButtonClicked, isDeleteProductClicked])

  //when the user goes to carDetails page from shopping cart
  const history = useHistory();

  const goToCarDescription = (car) => {
    history.push(`/cars/${car.vin}`);
  };


  const props = {
    showPrice,
    purchases
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <div className={`${styles.shoppingCartTable} table-responsive`}>
            <table className="table table-bordered text-center mb-0">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  {/* <th>Total</th> */}
                </tr>
              </thead>
              <tbody>
                {/* products renders only if there are products in the purchase */}
                {purchases.products.length > 0 && purchases.products.map((product, i) => (
                  <tr key={i}>
                    <td className={styles.productList}>
                      <div className="d-flex align-items-center">
                        <div className={styles.removeIconBox} onClick={() => handleDeleteButtonClick(product)}>
                          <button className={styles.removeIconBtn}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                        <div className='d-flex flex-column flex-sm-row align-items-sm-center'>
                          <div className={styles.productThumb}>
                            <img
                              src={`../assets/car-pictures/${product.make}-${product.model}-${product.year}.jpg`}
                              alt="Product"
                            />
                          </div>
                          <div
                            onClick={() => goToCarDescription(product)}
                            className={`${styles.productName} mb-3 ms-0 ms-sm-4 mb-sm-0`}>
                            {product.make} {product.model} <span className='d-inline-block mt-2'>{product.year}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableColumn}>
                      <span className={styles.price}> {showPrice(product.price)} SEK </span>
                    </td>
                  </tr>
                ))
                }
                {
                  purchases.products.length === 0 &&
                  <tr>
                    <td className={styles.productList}>
                      <p className={styles.emptyCart}>The shopping cart is empty</p>
                    </td>
                    <td>

                    </td>
                  </tr>
                }
                {/* button for deleting all products from the shopping cart by one click, renders only if there are some products in the shopping cart */}
                {(() => {
                if (purchases.products.length > 0) {
                  return (
                    <tr>
                      <td className={styles.emptyCartTd}>
                        <EmptyCart></EmptyCart>
                      </td>
                    </tr>
                  );
                }
              })()}       

              </tbody>
            </table>
          </div>
         <div className={styles.deliveryBox}>

           {/* block with delivery options. Renders only if there are some products in the shopping cart */}
           { purchases.products.length > 0 &&
            <div className={styles.shippingMethods} >
                <div className={`${styles.formCheckBox} form-check d-flex align-items-end`}>
                  <input className={`${styles.formCheckRadio} form-check-input`} onClick={handleClick} value="paidDelivery" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Home delivery (5 000 SEK)
                        </label>
                </div>
                <div className={`${styles.formCheckBox} form-check d-flex align-items-end`}>
                  <input className={`${styles.formCheckRadio} form-check-input`} onClick={handleClick} value="withoutDelivery" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                  <label className="form-check-label" htmlFor='flexRadioDefault2' >
                    Pick up the car by yourself
                  </label>
                </div>
              </div>
            }
         </div>
         
        </div>
        {/* Block with overview which includes all products, delivery cost and total cost  */}
        <div className="col-lg-4">
          <ShoppingCartTotal props={props} />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
