import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import SkeletonLoader from "../LoaderSpiner/SkeletonLoader";

const Gallery = () => {
  const axiosSecure = useAxios();
  const [allFoodsImg, setAllFoodsImg] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/foods`)
        .then((res) => {
          const foodData = res.data;
          const result = foodData.filter(
            (food) =>
              food.userName === user.displayName &&
              food.photoUrl === user.photoURL
          );
          setAllFoodsImg(result);
        })
        .catch((error) => {
          console.error("Error fetching foods:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [axiosSecure, user]);

  if (loading || !user) {
    return <SkeletonLoader />;
  }

  return (
    <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
      <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
        {allFoodsImg.map((food, index) => (
          <img
            key={index}
            src={food.food_image}
            alt=""
            className={`w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square ${
              index === 0 &&
              "col-span-2 row-span-2 md:col-start-3 md:row-start-1"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
