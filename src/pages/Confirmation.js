import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Confirmation.module.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { ShopCartContext } from '../contexts/ShopCartContext'
import { CarContext } from '../contexts/CarContext';


function Confirmation() {

    const { userData } = useContext(UserContext) //for rendering collected at Checko
    const { purchases, setPurchases } = useContext(ShopCartContext) //for rendering purcheses and then reseting them to the empty state
    const { showPrice } = useContext(CarContext); //for showing numbers in a friendly way 
    
    //for printing the page, the function fires on clicking print button
    const printConfirmation = () => {
        window.print()
    }

    //when the page loads Navbar hides so user can't press Logo at the Navbar and be redirected on Home page without complete the purchase 
    useEffect(() => {
        document.querySelector('nav').classList.add('d-none') 
    }, [])

    //for geting current date which render on the Confirmation page
    function currentDate() {
        const today = new Date(); 
        const nullBeforeMonth = today.getMonth() <= 9 ? '0' : '' 
        const nullBeforeDay = today.getDate() <= 9 ? '0' : '' 
        const date = nullBeforeDay + today.getDate() + '.' + nullBeforeMonth + (today.getMonth() + 1) + '.' + today.getFullYear();
        return date
    }

    //when the user clicks on the close button
    const handleClick = () => {
        setPurchases(() => ({ // purcheses reset to empty 
            userId: 1,
            products: [],
            deliveryCost: 0,
            isDeliveryChoosed: false,
            priceTotal: 0
          }))
          document.querySelector('nav').classList.remove('d-none') //Navbar gets back
    }

    return (
        <div className={`${styles.toPrint} container mt-5 py-4 px-4 py-sm-5 px-sm-5 border d-flex flex-column`}>
            <div className={`${styles.companyContacts} d-flex align-items-start flex-column flex-sm-row`}>
                <div className='flex-grow-1'>
                    <img src={`../../logo.png`} alt="Logo" className='logo'/>
                    <div className='brandName mt-2 mb-5 mb-sm-0'>Car Market <p className='subBrand'>Lavender</p></div>
                </div>
                <div className={`${styles.btnBlock} btnBlock`}>
                    <button onClick={printConfirmation} className='d-none d-sm-block me-lg-5'>
                        <FontAwesomeIcon icon={faPrint} size='2x' className={styles.icon}/>
                    </button>
                </div>
                <div className='ps-sm-4'>
                    <p>Car Market, Inc</p>
                    <p>605, Ratan Icon Building, <br/> Skåne, Sweden, 90002</p>
                    <p>Phone: 070-0000-0077</p>
                    <p>Email: cars@mailgo.dev</p>
                </div>
                <div>
                    <Link to="/" className={styles.closeButton} onClick={handleClick}>
                        <FontAwesomeIcon icon={faTimesCircle} size='lg' />
                    </Link>
                </div>
            </div>
            <div className='customer-contacts mt-5'>
                <p>Customer Name: <b>{userData.firstName} {userData.lastName}</b></p>
                <p>Customer Address: <b>{userData.postcode}, {userData.city}, {userData.streetAddress}</b></p>
                <p>Customer Tel: <b>{userData.phone}</b></p>
                <p>Customer Email: <b>{userData.email}</b></p>
            </div>
            <div className={`${styles.dateAndIdBlock} d-flex flex-column d-sm-block mt-5`}>
                <p>Date: <b>{currentDate()}</b></p>
                <p>Customer ID: <b>{userData.userId}</b></p>
            </div>
            <div className={styles.productOverview}>
                <h3 className='my-5 pb-2 text-center'>Order Information</h3>
                <table className="table table-responsive table-bordered">
                    <thead>
                        <tr>
                            <th className='text-center'>Product</th>
                            <th className='text-center'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* loops through products */}
                        {
                            purchases.products.map((product, i) => (
                                <tr key={i}>
                                    <td>{product.make} {product.model} {product.year}</td>
                                    <td>{showPrice(product.price)} SEK</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <p className={`${styles.totalPrice} mt-5`}>
                    Total: {showPrice(purchases.priceTotal)} 
                    {
                        typeof purchases.priceTotal === 'number' && 
                        <span> SEK</span>
                    }
                </p>
            </div>
            <div className='my-5 text-center'>
                <p>Thank you for your purchase! If you have any questions contact us at cars@mailgo.dev</p>
            </div>
           
        </div>
    )
}

export default Confirmation
