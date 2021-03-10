import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { CarContext } from "../contexts/CarContext";
import { ShopCartContext } from "../contexts/ShopCartContext";
import styles from "../styles/CarDetails.module.css";

export default function CarDetails(props) {
  const { addCarToCart } = useContext(ShopCartContext);
  // variable for CarDetails page(dynamic data, rendering)
  const [carItem, setCarItem] = useState(null);

  const { copyCars, showPrice } = useContext(CarContext);

  useEffect(() => {
    if (copyCars) {
      setCarItem(copyCars.find((el) => props.match.params.vin == el.vin));
    }
  }, [copyCars]);

  const renderCarDetails = () => {
    return (
      <>
        <div className="container mt-5">
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
                        <strong>Price:</strong>{" "}
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
                            <tr>
                              <th className={styles.configLabel}>Make</th>
                              <td className={styles.configOption}>
                                {carItem.make}
                              </td>
                            </tr>

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
                          </table>
                        </div>
                      </div>
                      <NavLink
                        to="/shopping-cart"
                        onClick={() => addCarToCart(carItem)}
                        className="btn btnBordered mt-5 mx-auto"
                      >
                        Add to Cart
                      </NavLink>
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
  // TODO implement NOT FOUND
  return carItem ? renderCarDetails() : <div></div>;
}
