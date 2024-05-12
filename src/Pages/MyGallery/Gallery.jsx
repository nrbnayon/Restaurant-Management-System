import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import SkeletonLoader from "../LoaderSpiner/SkeletonLoader";
import { FaRegUser } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";

const Gallery = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [allFoodsImg, setAllFoodsImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFoodImgUrl, setSelectedFoodImgUrl] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`/foods`)
      .then((res) => {
        const foodData = res.data;
        setAllFoodsImg(foodData);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure.get(`/feedbacks`).then((res) => {
      setFeedbacks(res.data);
    });
  }, [axiosSecure]);

  const handleAddButtonClick = (foodImage) => {
    if (user) {
      setModalOpen(true);
      setSelectedFoodImgUrl(foodImage);
    } else {
      navigate("/login", { state: location.pathname });
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
      <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
        {allFoodsImg.map((food, index) => (
          <div
            key={index}
            className={`relative w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square duration-300 ease-in-out transform hover:scale-105 ${
              index === 0 &&
              "col-span-2 row-span-2 md:col-start-3 md:row-start-1"
            }`}
          >
            <img
              src={food.food_image}
              alt=""
              className="w-full h-full rounded shadow-sm min-h-48"
            />

            {feedbacks
              .filter((feedback) => feedback.feedbackImgUrl === food.food_image)
              .map((filteredFeedback) => (
                <div
                  key={filteredFeedback._id}
                  className="absolute w-full inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 rounded"
                >
                  <div className="text-white text-center">
                    <FaRegUser className="inline-block mb-2 mr-1" />
                    {filteredFeedback?.feedbackUserName}
                    <br />
                    {filteredFeedback?.feedback}
                  </div>
                </div>
              ))}
            {feedbacks.filter(
              (feedback) => feedback.feedbackImgUrl === food.food_image
            ).length === 0 && (
              <div className="absolute w-full inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 rounded">
                <div className="text-white text-center ">
                  <FaRegUser className="inline-block mb-2 mr-1" />
                  {food?.userName || "Unknown"}
                  <br />
                  {food?.description.slice(0, 20)}
                </div>
              </div>
            )}

            <button
              onClick={() => handleAddButtonClick(food.food_image)}
              className="absolute opacity-50 hover:opacity-100 bottom-4 right-4 flex items-center justify-center w-12 h-12 text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-md"
              title="Add Feedback"
            >
              <AiOutlinePlus />
            </button>
          </div>
        ))}
      </div>
      {modalOpen && (
        <Modal
          closeModal={() => setModalOpen(false)}
          feedbackImgUrl={selectedFoodImgUrl}
          updateFeedbacks={(newFeedbacks) => setFeedbacks(newFeedbacks)}
        />
      )}
    </section>
  );
};

export default Gallery;
