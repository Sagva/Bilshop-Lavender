import { useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Navbar.module.css'


const Navbar = () =>{
  const [ showCollapsedMenu, setshowCollapsedMenu ] = useState(false)

  const toggleMenu = () => {
    setshowCollapsedMenu(!showCollapsedMenu)
  }

  const show = showCollapsedMenu ? "show" : "" ;

  return(
    // <div className='d-flex justify-content-between align-items-center'>
    //   {/* <h1>Logo <FontAwesomeIcon icon={faCar}/></h1> */}
    //   <div className='d-flex align-items-end ms-3'>
    //     <img src={`../logo.png`} alt="Logo" className={styles.logo}/>
    //     <div className={`${styles.brandName} ms-3`}>Car Market <p className={styles.subBrand}>Lavender</p></div>
        
    //   </div>
    //   <nav className='nav'>
    //     <Link to="/">Home</Link>
    //     <Link to="/about">About</Link>
    //     <Link to='/shopping-cart'><FontAwesomeIcon icon={faShoppingCart}/></Link>
    //   </nav>
    // </div>

    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <div className='d-flex align-items-end'>
         <img src={`../logo.png`} alt="Logo" className={styles.logo}/>
         <div className={`${styles.brandName} ms-3`}>Car Market <p className={styles.subBrand}>Lavender</p></div>
       </div>
        <button 
          onClick={toggleMenu}
          style={{border: 'none'}} 
          className={`${styles.myBtn} btn navbar-toggler`}
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars}/>
        </button>
        <div className={`${show} ${styles.navbarList} collapse navbar-collapse`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0 d-flex align-items-end">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <Link className={styles.shoppingCartIcon} to='/shopping-cart'><FontAwesomeIcon icon={faShoppingCart}/></Link>
    </nav>
  );
}

export default Navbar;