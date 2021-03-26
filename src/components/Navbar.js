import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Navbar.module.css";
import { ShopCartContext } from "../contexts/ShopCartContext";
import { CarContext } from "../contexts/CarContext";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { logedIn, logOut } = useContext(UserContext);

  const [showCollapsedMenu, setshowCollapsedMenu] = useState(false);
  const { shoppingCartNum, total } = useContext(ShopCartContext);
  const toggleMenu = () => {
    setshowCollapsedMenu(!showCollapsedMenu);
  };
  const { showPrice, setSwitching } = useContext(CarContext);
  const show = showCollapsedMenu ? "show" : "";

  let totalRestructured;
  let navbarClassName;
  if (shoppingCartNum > 0) {
    totalRestructured = showPrice(total);
    totalRestructured = `${totalRestructured} SEK`;
    navbarClassName = "d-block";
  } else {
    totalRestructured = "";
    navbarClassName = "d-none";
  }

  let cartNum;
  if (shoppingCartNum > 0) {
    cartNum = shoppingCartNum;
    navbarClassName = "d-block";
  } else {
    cartNum = "";
    navbarClassName = "d-none";
  }

  // refresh rendering when navigating from other tabs to the home page
  const followLink = () => {
    setSwitching(true);
  };

  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container d-flex justify-content-end ">
        {/* Logo */}
        <div className="d-flex align-items-end flex-grow-1 ">
          <Link
            onClick={followLink}
            to="/"
            className={`${styles.brandName} d-flex align-items-center`}
          >
            <img src={`../../logo.png`} alt="Logo" className="logo" />
            <div className="ms-3">
              Car Market <p className="subBrand">Lavender</p>
            </div>
          </Link>
        </div>
        {/* Shopping cart */}
        <Link className={`${styles.shoppingCartIcon}`} to="/shopping-cart">
          <div className={`${styles.cartWrapper}`}>
            <FontAwesomeIcon icon={faShoppingCart} />

            <div className={`${styles.cartNumStyling} ${navbarClassName} `}>
              {cartNum}
            </div>
            <div
              className={`${styles.cartPriceStyling} ${navbarClassName} row`}
            >
              {totalRestructured}
            </div>
          </div>
        </Link>
        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          style={{ border: "none" }}
          className={`${styles.myBtn} btn navbar-toggler`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {/* About, My profile, Logout */}
        <div
          className={`${show} ${styles.navbarList} collapse navbar-collapse`}
          id="navbarSupportedContent"
        >
          {(() => {
            if (logedIn === true) {
              //If user is logged in, show logout and My profile
              return (
                <ul className="navbar-nav me-auto mb-lg-0 d-flex align-items-end">
                  <li className="nav-item d-flex">
                    <Link to="/about">About</Link>
                  </li>
                  <li className="nav-item d-flex">
                    <Link to="/MyProfile">My profile</Link>
                  </li>
                  <li className="nav-item d-flex">
                    <button
                      className={`${styles.logOutButton}`}
                      onClick={logOut}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              );
            } else {
              //If user is logged out, show logout and My profile
              return (
                <ul className="navbar-nav me-auto mb-lg-0 d-flex align-items-end">
                  <li className="nav-item d-flex">
                    <Link to="/about">About</Link>
                  </li>
                  <li className="nav-item d-flex">
                    <Link to="/LogIn">LogIn</Link>
                  </li>
                </ul>
              );
            }
          })()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
