function CarouselIndicators(props) {
  const { index } = props;

  
    return(
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to={index}
          // The first indicator is given classname active and aria-current true
          className={`${index === 0 ? "active" : "" }`}
          aria-current={`${index === 0 ? "true" : "" }`}
          aria-label={`Slide ${index + 1}`}
        ></button>
    )
  }

export default CarouselIndicators;