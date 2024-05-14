import BookTable from "../Extra/BookTable";
import Plan from "../Extra/Plan";
import CustomerReviewSection from "../Extra/Review";
import Banner from "./Banner";
import TopSellingFood from "./TopSellingFood";
import OurLocation from "../Extra/OurLocation";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopSellingFood />
      <BookTable />
      <CustomerReviewSection />
      <OurLocation />
      <Plan />
    </div>
  );
};

export default Home;
