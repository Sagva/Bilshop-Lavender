import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CarContext } from "../contexts/CarContext";
import { ShopCartContext } from "../contexts/ShopCartContext";
import styles from "../styles/CarDetails.module.css";
import NotFound from "../components/NotFound";
import { UserContext } from "../contexts/UserContext";

export default function CarDetails(props) {
  // variable for CarDetails page(dynamic data, rendering)
  const { purchases, addCarToCart } = useContext(ShopCartContext);
  const [carItem, setCarItem] = useState(null);

  const { cars, copyCars, showPrice } = useContext(CarContext);

  // for url tracking
  let location = useLocation();

  useEffect(() => {
    if (copyCars || location) {
      setCarItem(cars.find((el) => props.match.params.vin == el.vin));
    }
  }, [copyCars, location]);

  //for scrolling to top of the page when the user goes from Shopping cart page to checkout on mobile (page on mobile is long and without that function opens in the middle/end of te page).
  function ScrollToTopOnMount() { //function uses as component in the beginning of the jsx codee 
    useEffect(() => {
      document.querySelector('body').scrollTo(0, 0)
    }, []);

    return null;
  }

  //To mark a car that is in the shopping cart
  let isCarInShoppingCart = false;

  for (let i = 0; i < purchases.products.length; i++) {
    let carItem = cars.find((el) => props.match.params.vin == el.vin)
    if (purchases.products[i].vin === carItem.vin) {
      isCarInShoppingCart = true;
    }
  }

  //To mark a sold car

  const { userOrders } = useContext(UserContext)

  let isBought = false
  for (let i = 0; i < userOrders.orderHistory.length; i++) {
    let carItem = cars.find((el) => props.match.params.vin == el.vin)

    for (let j = 0; j < userOrders.orderHistory[i].products.length; j++) {

      if (userOrders.orderHistory[i].products[j].vin === carItem.vin) {
        isBought = true;
      }
    }
  }

  const renderCarDetails = () => {
    return (
      <>
        <div className="container mt-5">
        <ScrollToTopOnMount />
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-md-5">
                  {/* lightbox */}
                  <a className={styles.lightbox} href="#car">
                    <img
                      className="w-100"
                      src={`../assets/car-pictures/${carItem.make}-${carItem.model}-${carItem.year}.jpg`}
                      alt={`${carItem.make} ${carItem.model}`}
                    />
                  </a>

                  {/* lightbox-target */}
                  <div className={styles.lightboxTarget} id="car">
                    <img
                      className={`${styles.lightboxTargetImg} w-100`}
                      src={`../assets/car-pictures/${carItem.make}-${carItem.model}-${carItem.year}.jpg`}
                      alt={`${carItem.make} ${carItem.model}`}
                    />
                    <a className={styles.lightboxClose} href="#"></a>
                  </div>
                </div>

                {/* Start Product Info Area  */}
                <div className="col-md-7 mt-5 mt-md-0">
                  <div className={styles.productDetailsInfoContentWrap}>
                    <div className={styles.prodDetailsInfoContent}>
                      <h2 className={styles.h2}>
                        {carItem.make} {carItem.model}
                      </h2>
                      <h5 className={styles.price}>
                        {" "}
                        <span className={styles.priceAmoumt}>
                          {showPrice(carItem.price)} SEK
                        </span>
                      </h5>
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Quidem nihil, est officia libero molestias
                        corporis possimus odit delectus. Molestias non debitis
                        dolores necessitatibus ratione voluptates expedita porro
                        quibusdam dolorem esse.
                      </p>

                      <div className={styles.productConfig}>
                        <div className={styles.tableResponsive}>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <th className={styles.configLabel}>Make</th>
                                <th className={styles.configOption}>
                                  {carItem.make}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th className={styles.configLabel}>Model</th>
                                <td className={styles.configOption}>
                                  {carItem.model}
                                </td>
                              </tr>

                              <tr>
                                <th className={styles.configLabel}>Year</th>
                                <td className={styles.configOption}>
                                  {carItem.year}
                                </td>
                              </tr>

                              <tr>
                                <th className={styles.configLabel}>City</th>
                                <td className={styles.configOption}>
                                  {carItem.city}
                                </td>
                              </tr>

                              <tr>
                                <th className={styles.configLabel}>Miles</th>
                                <td className={styles.configOption}>
                                  {carItem.miles}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {(() => {
                        if (isCarInShoppingCart) {
                          return <div style={{color: '#ad2626'}} className="mt-5 mx-auto border d-inline-block mt-3 px-4 py-3"> In the cart</div>;
                        } else if (isBought) {
                          return <div style={{color: '#ad2626'}} className="mt-5 mx-auto border d-inline-block mt-3 px-4 py-3"> Sold</div>;
                        }
                        else {
                          return <div
                            className="btn btnBordered mt-5 mx-auto"
                            onClick={() => addCarToCart(carItem)}
                          >
                            Add to Cart
                          </div>
                        }
                      })()}


                    </div>
                  </div>
                </div>
                {/* End Product Info Area */}
              </div>
            </div>
          </div>
        </div>
        {/* container */}
      </>
    );
  };
  return carItem ? (
    renderCarDetails()
  ) : (
    <div>
      <NotFound />
    </div>
  );
}
