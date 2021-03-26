import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import LogIn from "./pages/LogIn";
import MyProfile from "./pages/MyProfile";

import CarContextProvider from "./contexts/CarContext";
import CarDetails from "./pages/CarDetails";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import ShopCartContextProvider from "./contexts/ShopCartContext";
import Confirmation from "./pages/Confirmation";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <ShopCartContextProvider>
            <CarContextProvider>
              <Navbar />
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/LogIn" component={LogIn} />
              <Route exact path="/MyProfile" component={MyProfile} />
              <Route exact path="/shopping-cart" component={ShoppingCart} />
              <Route exact path="/cars/:vin" component={CarDetails} />

              <Route
                exact
                path="/shopping-cart/checkout"
                component={Checkout}
              />
              <Route
                exact
                path="/shopping-cart/checkout/confirmation"
                component={Confirmation}
              />

              <Footer />
            </CarContextProvider>
          </ShopCartContextProvider>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
