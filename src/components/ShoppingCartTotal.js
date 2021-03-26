import React, { useEffect, useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import styles from '../styles/ShoppingCartTotal.module.css'
import { useHistory } from "react-router-dom";
import { UserContext } from '../contexts/UserContext'
import { CarContext } from '../contexts/CarContext';

function ShoppingCartTotal(props) {

    const { showPrice } = useContext(CarContext);//for showing numbers in a friendly way

    //useLocation is used for finding out about what page user is on, because we want that button "Proceed to checkout" renders only on the shopping Cart page
    const location = useLocation() //for checking location.pathname

    //for redirecting to the right page
    const history = useHistory();

    const { logedIn } = useContext(UserContext)

    //function fires when user press button "Proceed to checkout"
    const checkout = (e) => {
        e.preventDefault()
        if (logedIn === true) { //if the user is logged in then user will be redirected to checkout
            history.push("/shopping-cart/checkout")
        }
    }

    //the page reloads as soon as isDeliveryChoosed and logedIn change
    useEffect(() => {
    }, [props.props.purchases.isDeliveryChoosed, logedIn]);

    return (
        <div className='mt-5 mt-lg-0 mydiv'>
            <div className={styles.cartTotal}>
                <h5 className={styles.cartTotalHeading}>Your Order</h5>

                <div className="table-responsive">
                    <table className="table table-borderless">
                        <thead className='border-bottom'>
                            <tr>
                                <th>Products</th>
                                <th>Total</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                props.props.purchases.products.map((product, i) => (
                                    <tr key={i}>
                                        <td>
                                            {product.make}
                                            <p style={{ fontSize: 12 }}>{product.model} {product.year}</p>
                                        </td>
                                        <td>
                                            {props.props.showPrice(product.price)} SEK
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td>
                                    Shipping
                                </td>
                                {
                                    (props.props.purchases.products.length > 0 && props.props.purchases.isDeliveryChoosed) ?
                                        (<td>
                                            {showPrice(props.props.purchases.deliveryCost)}

                                            { props.props.purchases.products.length > 0 && ' SEK'}
                                        </td>)
                                        :
                                        (<td>
                                            <b>Not chosen</b>
                                        </td>)

                                }
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className='border-top'>
                                <th>Total</th>
                                <td>
                                    {
                                        props.props.purchases.products.length > 0 &&
                                        <b>
                                            {props.props.showPrice(props.props.purchases.priceTotal)}
                                            <span> SEK</span>
                                        </b>
                                    }
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>


                <div className={styles.toCheckoutBtnBox}>

                    {/* Button renders only on shopping Cart page */}

                    <div className='text-center'>
                        {(() => {
                            if (location.pathname === '/shopping-cart'
                                && props.props.purchases.isDeliveryChoosed
                                && props.props.purchases.products.length > 0) {
                                //if user is logged in, has chosen a delivery option and there are  products in cart then proceed to checkout 
                                if (logedIn === true) {
                                    return (
                                        <button onClick={(e) => checkout(e)} type="button" className={`btn ${styles.toCheckoutBtn}`}>
                                            Proceed to checkout
                                        </button>
                                    )
                                } else {
                                    //if user is not logger in show modal
                                    return (
                                        <button onClick={(e) => checkout(e)} type="button" className={`btn ${styles.toCheckoutBtn}`} data-bs-toggle="modal" data-bs-target="#chooseDeliveryModal">
                                            Proceed to checkout
                                        </button>
                                    )
                                }
                            } //if the user is on checkout page the button is not renders
                            else if (location.pathname === '/shopping-cart/checkout' || props.props.purchases.products.length === 0) {
                                return (
                                    <div></div>
                                )
                            } else {//if there are no products in the shopping cart or user hasn't choose delivery option, then button is blocked and doesn't work
                                return (
                                    <Link to='#'>
                                        <button type="button" className={`btn ${styles.toCheckoutBtn}`} data-bs-toggle="modal" data-bs-target="#chooseDeliveryModal">
                                            Proceed to checkout
                                        </button>
                                    </Link>
                                )
                            }
                        })()}
                    </div>
                </div>
            </div>

            <div className="modal fade" id="chooseDeliveryModal" tabIndex="-1" aria-labelledby="chooseDeliveryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            {logedIn ? <b>You need to choose a shipping option to proceed!</b> : <b>You need to be logged in</b>}

                        </div>
                        <div className="modal-footer text-center border-0">
                            <button type="button" className={`${styles.closeBtn} btn`} data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartTotal