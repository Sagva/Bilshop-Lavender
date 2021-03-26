import React, { useContext } from "react";
import { CarContext } from "../contexts/CarContext";
import CarItem from "../components/CarItem";
import PagePagination from "../components/PagePagination";
import NotFound from "../components/NotFound";


export default function CarList() {
  const {
    copyCars,
    carsPerPage,
    setCurrentPage,
    currentCars,
    isFinded,
  } = useContext(CarContext);

  // pagination
  const paginate = (e, pageNumber) => {
    e.preventDefault();
    let children = document.querySelectorAll("[class*=PagePagination_liItem");
    children.forEach(child => {
      child.style.removeProperty("border");
      child.style.removeProperty("color");
    });
    e.target.style.border = "1px solid #feb93e";
    e.target.style.color = "#feb93e";
    setCurrentPage(pageNumber);
  };

  const autoScrollToTop = () => {
    let searchbarId = document.querySelector("#searchbarId");
    searchbarId.scrollIntoView();
  };

  // rendered with pagination

  const renderWithPagination = () => {
    return (
      <div className="container">
        
        <div className="row mtn-30 d-flex justify-content-center">
          {currentCars.map((item) => (
            <CarItem key={item.vin} car={item} />
          ))}
        </div>
        <PagePagination
          carsPerPage={carsPerPage}
          totalCars={copyCars.length}
          paginate={paginate}
          autoScrollToTop={autoScrollToTop}
        />
      </div>
     
    );
  };

  return isFinded ? renderWithPagination() : <NotFound></NotFound>;
}
