import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import BgCard from "../Shared/BgCard/BgCard";
import { FaSearch } from "react-icons/fa";
import FoodCard from "./FoodCard";
import { useNavigation } from "react-router-dom";
import LoaderSpinner from "../LoaderSpiner/LoaderSpiner";

const Card = {
  img: "https://i.ibb.co/qdfqzfZ/f4.png",
  title: "Our All Foods Items",
  desc: "Explore a wide range of delicious dishes from our menu. From appetizers to desserts, we offer an exquisite culinary experience that will tantalize your taste buds.",
};

const AllFoods = () => {
  const navigation = useNavigation();
  const axiosSecure = useAxios();

  const [allFoods, setAllFoods] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/foods")
      .then((res) => {
        console.log("Response from /foods endpoint:", res.data);
        setAllFoods(res.data);
      })
      .catch((error) => {
        console.error("Error fetching /foods:", error);
      });
  }, [axiosSecure]);

  if (navigation.state === "loading" || !allFoods) {
    return <LoaderSpinner />;
  }
  return (
    <div className="my-6">
      <BgCard Card={Card} />

      <p className="my-4">
        Here&apos;s a sneak peek of our delicious offerings:
      </p>
      <div className="flex items-center md:w-1/2 mx-auto border border-gray-300 rounded-l-[30px] rounded-r-[30px] overflow-hidden">
        <input
          type="text"
          placeholder="Search for food..."
          className="w-full py-2 px-4 focus:outline-none bg-transparent"
        />
        <button className="px-6 w-20 h-full rounded-r-[30px] py-4 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out">
          <FaSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Top Selling Food Item Cards */}

        {allFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
