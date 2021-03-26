import React, { createContext, useState, useEffect } from "react";
import Cars from "../json/cars.json";

export const CarContext = createContext();

function CarContextProvider(props) {
  
  const carsarray = Cars;

  //variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(9);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;

  // * main array from db
  const [cars] = useState([...carsarray]);

  // * copy of the main array that changes and modifieds
  const [copyCars, setCopyCars] = useState(cars);

  //  *array that is rendered on the CarList
  const [currentCars, setCurrentCars] = useState(
    copyCars.slice(indexOfFirstCar, indexOfLastCar)
  );

  // variables for search bar
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setSearching] = useState(false);
  const [isFinded, setFinded] = useState(true);

  //variables for filter
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minMiles, setMinMiles] = useState("");
  const [maxMiles, setMaxMiles] = useState("");
  
  // switching from another link to home
  const [isSwitching, setSwitching] = useState(false);
  

  useEffect(() => {
    if (currentPage || isSearching) {
      setCurrentCars(copyCars.slice(indexOfFirstCar, indexOfLastCar));
    }
    // if there was a transition from another page to the main page, all cars must be rendered again using  the original array (cars)  (not pay attention to past searches)
    if(isSwitching){
      setFinded(true)
      setCopyCars(cars);	
      setCurrentCars(cars.slice(indexOfFirstCar, indexOfLastCar));
    }
    setSearching(false);
    setSwitching(false)
  }, [currentPage, isSearching, isSwitching]);

  // show price in friendly set
  const showPrice = (carItem) => {
    const price = String(carItem);

    if (price.length % 3 == 0) {
      return price
        .split(/(\d{3})/)
        .join(" ")
        .trim();
    } else {
      //add a space as a separator in integers
      return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    }
  };

  // Mark first pagination
  const markPagination = () =>{
    let children = document.querySelectorAll("[class*=PagePagination_liItem");
    children.forEach(child => {
      child.style.removeProperty("border");
      child.style.removeProperty("color");
    });
    if(document.querySelector("[class*=PagePagination_liItem")){
      document.querySelector("[class*=PagePagination_liItem").style.border = "1px solid #feb93e";
      document.querySelector("[class*=PagePagination_liItem").style.color = "#feb93e";
    }
  }

  useEffect(() =>{
    markPagination();
  }, [copyCars, isSwitching])

  // functions for search bar
  const findCar = (e) => {
    e.preventDefault();
    setFinded(true);
    if (searchInput.length > 0) {
      const result = cars.filter((item) => {
        const searchText = searchInput.toLowerCase().replace(/\s/g, "");
        const itemMake = item.make.toLowerCase().replace(/\s/g, "");
        const itemModel = item.model.toLowerCase().replace(/\s/g, "");
        return (itemMake + itemModel).includes(searchText);
      });
      // if we have a match
      if (result.length > 0) {
        setCopyCars(result);
        // if the user is on any page except the first and makes a search, then he  is redirected to the first page
        setCurrentPage(1);
      }
      // other way, isFined is false and rendered NotFound component
      else {
        setFinded(false);
      }
      setSearching(true);
    } else {
      setCopyCars(cars);
      setSearching(true);
    }
    setSearchInput("");
  };

  useEffect(() => {
    setMake("");
    setModel("");
    setYear("");
    setMinPrice("");
    setMaxPrice("");
    setMinMiles("");
    setMaxMiles("");
  }, [copyCars, currentCars]);

  const onChangeMake = (make) => {
    setMake(make.trim());
  };
  const onChangeModel = (e) => {
    setModel(e.target.value.trim());
  };
  const onChangeYear = (year) => {
    setYear(year);
  };

  const onChangeMinPrice = (e) => {
    setMinPrice(e.target.value);
  };
  const onChangeMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };
  const onChangeMinMiles = (e) => {
    setMinMiles(e.target.value);
  };
  const onChangeMaxMiles = (e) => {
    setMaxMiles(e.target.value);
  };

  const findCarFilter = (e) => {
    setFinded(true);
    e.preventDefault();
    
    let alteredMinMiles;
    let alteredMaxMiles;
    let alteredMinPrice;
    let alteredMaxPrice;

    if (minMiles == "") {
      alteredMinMiles = 0;
    } else {
      alteredMinMiles = minMiles;
    }
    if (maxMiles == "") {
      alteredMaxMiles = 10000000;
    } else {
      alteredMaxMiles = maxMiles;
    }
    if (minPrice == "") {
      alteredMinPrice = 0;
    } else {
      alteredMinPrice = minPrice;
    }
    if (maxPrice == "") {
      alteredMaxPrice = 10000000;
    } else {
      alteredMaxPrice = maxPrice;
    }
    const result = cars.filter((car) => {
        if (
          car.miles >= alteredMinMiles &&
          car.miles <= alteredMaxMiles &&
          car.price >= alteredMinPrice &&
          car.price <= alteredMaxPrice &&
          car.make.toLowerCase().indexOf(make.toLowerCase()) >= 0 &&
          car.model.toLowerCase().indexOf(model.toLowerCase()) >= 0
        ) {
          if (year != "" && car.year == year) { //if the year is not "" and the year is a match, return car
            return true;
          } else if (year == "") { //else if the year is not a parameter to take into consideration: return the car
            return true; 
          } else { //if the years don't match: don't return the car
            return false;
          }
        } else { //if the filter input don't match the car: don't return the car
          return false;
        }
      });
     
      if (result.length > 0){
        setCopyCars(result)
        setSearching(true);
        // setFinded(true);
      }else {
        setFinded(false);
        setCopyCars(cars)
        setSearching(true);
      }
  };

  const values = {
    cars,
    copyCars,
    carsPerPage,
    setCurrentPage,
    currentCars,
    findCar,
    showPrice,
    setSearchInput,
    searchInput,
    setSwitching,
    isFinded,
    onChangeMinPrice,
    onChangeMaxPrice,
    onChangeMinMiles,
    onChangeMaxMiles,
    onChangeMake,
    onChangeModel,
    onChangeYear,
    findCarFilter,
    make,
    model,
    year,
    minPrice,
    maxPrice,
    minMiles,
    maxMiles,
  };

  return (
    <CarContext.Provider value={values}>{props.children}</CarContext.Provider>
  );
}

export default CarContextProvider;
