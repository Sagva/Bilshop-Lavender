import React, { useContext } from "react";
import styles from "../styles/Filter.Module.css";
import { CarContext } from "../contexts/CarContext";
import Searchbar from "./Searchbar";

function Filter() {
  const {
    onChangeMinMiles,
    onChangeMaxMiles,
    onChangeMinPrice,
    onChangeMaxPrice,
    findCarFilter,
    minPrice,
    maxPrice,
    minMiles,
    maxMiles,
    onChangeMake,
    onChangeModel,
    onChangeYear,
    make,
    model,
    year,
  } = useContext(CarContext);

  return (
    <div className={`${styles.accordionCustom}`}>
      <Searchbar />
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <div className="container">
            <h2 className="accordion-header" id="headingOne">
              <button className={`${styles.accordionBtn} accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                <span className={styles.btnText}>Advanced searching</span>
              </button>
            </h2>
          </div>
          <div id="collapseOne" className={`${styles.accordionColapse} accordion-collapse collapse`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body p-0 m-0">
              {/* body */}
              <div className={`${styles.filtercontainer} container`}>
                <form onSubmit={findCarFilter}>

                  <div className={styles.rowLargeView}>
                    {/* price */}
                    <div className={`${styles.rowItemLargeView} row mb-4`}>
                      <h2 className={`${styles.lable}`}>Price</h2>
                      <div className="col-6">
                        {/* <label htmlFor="minPrice">From</label> */}
                        <select
                          className={`${styles.formSelect} form-select`}
                          aria-label="Default select example"
                          value={minPrice}
                          onChange={onChangeMinPrice}
                        >
                          <option defaultValue>from </option>
                          <option value="50000">50 000 SEK</option>
                          <option value="100000">100 000 SEK</option>
                          <option value="200000">200 000 SEK</option>
                          <option value="300000">300 000 SEK</option>
                          <option value="400000">400 000 SEK</option>
                        </select>
                      </div>

                      <div className="col-6">
                        {/* <label htmlFor="maxPrice">To</label> */}
                        <select
                          className={`${styles.formSelect} form-select`}
                          aria-label="Default select example"
                          value={maxPrice}
                          onChange={onChangeMaxPrice}
                        >
                          <option defaultValue>to</option>
                          <option value="100000">100 000 SEK</option>
                          <option value="200000">200 000 SEK</option>
                          <option value="300000">300 000 SEK</option>
                          <option value="400000">400 000 SEK</option>
                          <option value="500000">500 000 SEK</option>
                          <option value="600000">600 000 SEK</option>
                          <option value="700000">700 000 SEK</option>
                          <option value="800000">800 000 SEK</option>
                        </select>
                      </div>
                    </div>



                    {/* miles */}
                    <div className={`${styles.rowItemLargeView} row  mb-4`}>
                      <h2 className={`${styles.lable}`}>Miles</h2>
                      <div className="col-6">
                        {/* <label htmlFor="minMiles">From</label> */}
                        <select
                          className={`${styles.formSelect} form-select`}
                          aria-label="Default select example"
                          value={minMiles}
                          onChange={onChangeMinMiles}
                        >
                          <option defaultValue>from</option>
                          <option value="10000">10 000</option>
                          <option value="20000">20 000</option>
                          <option value="30000">30 000</option>
                          <option value="40000">40 000</option>
                          <option value="50000">50 000</option>
                          <option value="60000">60 000</option>
                        </select>
                      </div>
                      <div className="col-6">
                        {/* <label htmlFor="maxMiles">To</label> */}
                        <select
                          className={`${styles.formSelect} form-select`}
                          aria-label="Default select example"
                          value={maxMiles}
                          onChange={onChangeMaxMiles}
                        >
                          <option defaultValue> to</option>
                          <option value="10000">10 000</option>
                          <option value="20000">20 000</option>
                          <option value="30000">30 000</option>
                          <option value="40000">40 000</option>
                          <option value="50000">50 000</option>
                          <option value="60000">60 000</option>
                        </select>
                      </div>
                    </div>
                  </div>


                  <div className={styles.secondLineLargeView}>
                    {/* make */}
                    <div className={`${styles.rowItemLargeView, styles.innerRowItemsLarge} row mb-4`}>
                      <div className={`${styles.col6Large} mb-4`}>
                        <h2 className={`${styles.lable}`}>Make</h2>

                        <input
                          type="text"
                          className={`${styles.formControl} form-control`}
                          placeholder="Enter a make"
                          value={make}
                          onChange={(e) => onChangeMake(e.target.value.replace(/\s/g, ""))}
                        />
                      </div>


                      {/* model */}
                      <div className={`${styles.col6Large}`}>
                        <h2 className={`${styles.lable}`}>Model</h2>
                        <input
                          type="text"
                          className={`${styles.formControl} form-control`}
                          placeholder="Enter a model"
                          value={model}
                          onChange={onChangeModel}
                        />
                      </div>
                    </div>
                    {/* year */}
                    <div className={`${styles.rowItemLargeView, styles.innerRowItemsLarge} row mb-4`}>
                      <div className={`${styles.col6Large} mb-4`}>
                        <h2 className={`${styles.lable}`}>Year</h2>
                        <input
                          type="number" min="1960" max="2020"
                          className={`${styles.formControl} form-control`}
                          placeholder="Enter a year"
                          value={year}
                          onChange={(e) => onChangeYear(e.target.value.substring(0, 4))}
                        />
                      </div>

                      <div className={`${styles.col6Large}`}>
                        <button type="submit" className={`${styles.filterBtn}  btnBrand `}>Filter</button>
                      </div>
                    </div>
                  </div>
                </form >
              </div >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;