import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import BgCard from "../Shared/BgCard/BgCard";
import { FaSearch } from "react-icons/fa";
import FoodCard from "./FoodCard";
import SkeletonLoader from "../LoaderSpiner/SkeletonLoader";
import { Pagination, Stack } from "@mui/material";

const Card = {
  img: "https://i.ibb.co/qdfqzfZ/f4.png",
  title: "Our All Foods Items",
  desc: "Explore a wide range of delicious dishes from our menu. From appetizers to desserts, we offer an exquisite culinary experience that will tantalize your taste buds.",
};

const AllFoods = () => {
  const axiosSecure = useAxios();
  const [allFoods, setAllFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [loadingPreviousPage, setLoadingPreviousPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/foods?name=${searchQuery}`)
      .then((res) => {
        setAllFoods(res.data);
      })
      .catch((error) => {
        console.error("Error fetching /foods:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allFoods.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setLoadingNextPage(true);
    setCurrentPage(pageNumber);
    setLoadingPreviousPage(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadingNextPage(false);
    }, 1000);
  };

  if (loading || loadingNextPage || loadingPreviousPage) {
    return <SkeletonLoader />;
  }

  return (
    <div className="my-6">
      <BgCard Card={Card} />
      <p className="my-4 text-xl font-bold text-center">
        Here&apos;s a sneak peek of our delicious offerings:
      </p>
      <div className="flex items-center md:w-1/2 mx-auto border border-gray-300 rounded-l-[30px] rounded-r-[30px] overflow-hidden">
        <input
          value={searchQuery}
          onChange={handleSearch}
          type="text"
          placeholder="Search for food..."
          className="w-full py-2 px-4 focus:outline-none bg-transparent"
        />
        <button className="px-6 w-20 h-full rounded-r-[30px] py-4 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out">
          <FaSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {currentItems.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
      <div className="flex justify-center items-center text-center">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(allFoods.length / itemsPerPage)}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={(event, page) => paginate(page)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default AllFoods;
