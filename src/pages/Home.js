import Carousel from "../components/Carousel";
import CarList from "../components/CarList";
import PagePagination from "../components/PagePagination";
import Filter from "../components/Filter";

function Home() {

  return (
    <div>
      <Carousel />
      <Filter />
      <CarList />
      <PagePagination />
    </div>
  );
}

export default Home;
