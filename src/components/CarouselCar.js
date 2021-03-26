import styles from "../styles/Carousel.Module.css";
import { useHistory } from "react-router-dom";

function CarouselCard(props) {
  const { car } = props;
  const { index } = props;
  const history = useHistory();
  const modelUpperCase = car.model.toUpperCase();

  const handleClick = () => {
    //when a car is clicked you go to that cars detail page
    history.push(`/cars/${car.vin}`);
  };

  return (
    <div
    // if the car is the fist in the array when rendering it is given classname "active" (and showed in carousel)
      className={`${styles.carouselItem} carousel-item  ${
        index === 0 ? "active" : ""
      } `}
      data-bs-interval="4000"
      onClick={handleClick}
    >
      <img
        src={`../assets/car-pictures/${car.make}-${car.model}-${car.year}.jpg`}
        className={`${styles.carouselImage} d-block`}
        alt={`${car.make} ${car.model}`}
      />
      <div className="carousel-caption d-md-block">
        <h1 className={styles.h1deal}>
          {car.discount} OFF ON THIS {modelUpperCase} {car.year}
        </h1>
      </div>
    </div>
  );
}

export default CarouselCard;
