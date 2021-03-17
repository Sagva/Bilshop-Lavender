import { createContext, useState, useEffect, useContext } from "react";

export const ShopCartContext = createContext();

function ShopCartContextProvider(props) {
  const [purchases, setPurchases] = useState({
    userId: 1,
    products: [],
    deliveryCost: 0,
    isDeliveryChoosed: false,
    priceTotal: 0,
  });

  //Total sum in Navbar's cart icon 
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(purchases.priceTotal);
  }, [purchases]);

  // Number of products in Navbar's cart icon
  const [shoppingCartNum, setShoppingCartNum] = useState(purchases.products.length);

  useEffect(() => {
    setShoppingCartNum(purchases.products.length)
  }, [purchases]);
  

  // Local storage
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("products") !== null) {
      let temp = purchases;
      temp.products = JSON.parse(localStorage.getItem("products"));
      setPurchasesState(temp);
    }else{
      setPurchasesState(purchases);
    }
    setIsFetched(true);
  }, [])

  useEffect(() => {
    if(isFetched === true){
      localStorage.setItem("products", JSON.stringify(purchases.products));
    }
  }, [purchases])

 // Function for setting purcheses. Function takes argument temp which is a copy of current purchases with updates and overwrites purchases with that updated data.  
  const setPurchasesState = (temp) => {
    temp.priceTotal = getTotalPrice()
    setPurchases(() => ({
      products: temp.products,
      deliveryCost: temp.deliveryCost,
      priceTotal: temp.priceTotal,
      isDeliveryChoosed: temp.isDeliveryChoosed
    }))
  }
  
  // Shipping cost
  const setDeliveryCost = (e) => {
    let temp = purchases //make a copy of current purchases
    temp.isDeliveryChoosed = true //For blocking to checkout without delivery choosed
    temp.deliveryCost = e.currentTarget.value === "paidDelivery" ? 5000 : 0 //update deliveryCost in the copy
    setPurchasesState(temp) //overwrite purchases with new updated data
  };
  
  //Function for updating total price 
  const getTotalPrice = () => {
    let updatedTotalPrice = 0
    
    purchases.products.forEach((car) => {
      updatedTotalPrice = updatedTotalPrice + car.price
    })

    if(typeof purchases.deliveryCost === 'number') {
      updatedTotalPrice = updatedTotalPrice + purchases.deliveryCost
    }
    return updatedTotalPrice
  }
  
  // Remove from cart
  const deleteProduct = (productToDelete) => {
    let temp = purchases //make a copy of current purchases
    temp.products = purchases.products.filter((product) => product.vin !== productToDelete.vin) //update products in the copy
    temp.isDeliveryChoosed = false
    setPurchasesState(temp) //overwrite purchases with new updated data
  }

  //Add a car to cart
  const addCarToCart = (car) => {
      let isCar = false;
      purchases.products.forEach(element => {
        if (car.vin == element.vin) {
          isCar = true;
        }
      });
    if(isCar === false){
      let temp = purchases //make a copy of current purchases
        temp.products.unshift(car) //update products in the copy
        setPurchasesState(temp) //overwrite purchases with new updated data
    }
  }

  const values = {
    purchases,
    setPurchases,
    setDeliveryCost,
    deleteProduct,
    addCarToCart,
    shoppingCartNum,
    total,
  };

  return (
    <ShopCartContext.Provider value={values}>
      {props.children}
    </ShopCartContext.Provider>
  );
}

export default ShopCartContextProvider;
