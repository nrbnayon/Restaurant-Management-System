import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import SkeletonLoader from "../LoaderSpiner/SkeletonLoader";
import { FaRegUser } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";
import BgCard from "../Shared/BgCard/BgCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Gallery = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [allFoodsImg, setAllFoodsImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [gallery, setGallery] = useState([]);

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
    axiosSecure.get(`/gallery`).then((res) => {
      setGallery(res.data);
    });
  }, [axiosSecure]);
  useEffect(() => {
    AOS.init();
  }, []);

  const handleModal = () => {
    if (user) {
      setModalOpen(true);
    } else {
      navigate("/login", { state: location.pathname });
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  const Card = {
    img: "https://img.freepik.com/free-psd/food-menu-restaurant-facebook-cover-template_106176-735.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=ais_user",
    title: "Watch Our Delicious Food Gallery",
    desc: "Explore a tantalizing journey through our culinary delights. Indulge your senses with a feast for the eyes, showcasing our mouthwatering dishes that promise to delight every palate.",
  };

  return (
    <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
      <BgCard Card={Card} />
      <h3 className="text-3xl text-center my-4 font-bold">Food Gallery</h3>
      {/* Gallery Image  */}
      <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
        {gallery.map((gall, index) => (
          <div
            key={index}
            className={`relative w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square duration-300 ease-in-out transform hover:scale-105 ${
              index === 0
                ? "col-span-2 row-span-2 md:col-start-1 md:row-start-1"
                : "md:col-span-1 md:row-span-1"
            }`}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              src={gall?.galleryImgUrl}
              alt={gall?.userName}
              className="w-full h-full rounded shadow-sm min-h-48"
            />
            <div className="absolute w-full inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 rounded">
              <div className="text-white text-center">
                <FaRegUser className="inline-block mb-2 mr-1" />
                {gall?.userName}
                <br />
                {gall?.desc.slice(0, 30)}...
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Image form all food  */}
      <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
        {allFoodsImg.map((food, index) => (
          <div
            key={index}
            className={`relative w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square duration-300 ease-in-out transform hover:scale-105 ${
              index === 0 &&
              "col-span-2 row-span-2 md:col-start-3 md:row-start-1"
            }`}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              src={food?.food_image}
              alt={food?.food_name}
              className="w-full h-full rounded shadow-sm min-h-48"
            />
            <div className="absolute w-full inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 rounded">
              <div className="text-white text-center">
                <FaRegUser className="inline-block mb-2 mr-1" />
                {food?.userName}
                <br />
                {food?.description.slice(0, 30)}...
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleModal}
        className="fixed bottom-4 right-4 flex items-center justify-center w-12 h-12 text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-md"
        title="Add Image"
      >
        <AiOutlinePlus />
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => setModalOpen(false)}
          updateGallery={setGallery}
        />
      )}
    </section>
  );
};

export default Gallery;

// import { useEffect, useState } from "react";
// import useAxios from "../../hooks/useAxios";
// import useAuth from "../../hooks/useAuth";
// import SkeletonLoader from "../LoaderSpiner/SkeletonLoader";
// import { FaRegUser } from "react-icons/fa";
// import { AiOutlinePlus } from "react-icons/ai";
// import Modal from "./Modal";
// import { useLocation, useNavigate } from "react-router-dom";
// import BgCard from "../Shared/BgCard/BgCard";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Gallery = () => {
//   const axiosSecure = useAxios();
//   const { user } = useAuth();
//   const [allFoodsImg, setAllFoodsImg] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedFoodImgUrl, setSelectedFoodImgUrl] = useState(null);
//   const [gallery, setGallery] = useState([]);

//   const location = useLocation();

//   const navigate = useNavigate();

//   useEffect(() => {
//     axiosSecure
//       .get(`/foods`)
//       .then((res) => {
//         const foodData = res.data;
//         setAllFoodsImg(foodData);
//       })
//       .catch((error) => {
//         console.error("Error fetching foods:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [axiosSecure]);

//   useEffect(() => {
//     axiosSecure.get(`/gallery`).then((res) => {
//       setGallery(res.data);
//     });
//   }, [axiosSecure]);

//   useEffect(() => {
//     AOS.init();
//   }, []);

//   const handleModal = (foodImage) => {
//     if (user) {
//       setModalOpen(true);
//       setSelectedFoodImgUrl(foodImage);
//     } else {
//       navigate("/login", { state: location.pathname });
//     }
//   };

//   if (loading) {
//     return <SkeletonLoader />;
//   }

//   const Card = {
//     img: "https://img.freepik.com/free-psd/food-menu-restaurant-facebook-cover-template_106176-735.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=ais_user",
//     title: "Watch Our Delicious Food Gallery",
//     desc: "Explore a tantalizing journey through our culinary delights. Indulge your senses with a feast for the eyes, showcasing our mouthwatering dishes that promise to delight every palate.",
//   };

//   return (
//     <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
//       <BgCard Card={Card} />
//       <h3 className="text-3xl text-center my-4 font-bold">Food Gallery</h3>
//       <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
//         {allFoodsImg.map((food, index) => (
//           <div
//             key={index}
//             className={`relative w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square duration-300 ease-in-out transform hover:scale-105 ${
//               index === 0 &&
//               "col-span-2 row-span-2 md:col-start-3 md:row-start-1"
//             }`}
//             data-aos="fade-up"
//             data-aos-duration="1000"
//           >
//             <img
//               src={food.food_image}
//               alt=""
//               className="w-full h-full rounded shadow-sm min-h-48"
//             />

//             {gallery
//               .filter((feedback) => feedback.feedbackImgUrl === food.food_image)
//               .map((filteredFeedback) => (
//                 <div
//                   key={filteredFeedback._id}
//                   className="absolute w-full inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 rounded"
//                 >
//                   <div className="text-white text-center">
//                     <FaRegUser className="inline-block mb-2 mr-1" />
//                     {filteredFeedback?.feedbackUserName}
//                     <br />
//                     {filteredFeedback?.feedback}
//                   </div>
//                 </div>
//               ))}
//             {gallery.filter(
//               (feedback) => feedback.feedbackImgUrl === food.food_image
//             ).length === 0 && (
//               <div className="absolute w-full inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 rounded">
//                 <div className="text-white text-center ">
//                   <FaRegUser className="inline-block mb-2 mr-1" />
//                   {food?.userName || "Unknown"}
//                   <br />
//                   {food?.description.slice(0, 20)}
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={() => handleModal(food.food_image)}
//               className="absolute opacity-50 hover:opacity-100 bottom-4 right-4 flex items-center justify-center w-12 h-12 text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-md"
//               title="Add Feedback"
//             >
//               <AiOutlinePlus />
//             </button>
//           </div>
//         ))}
//       </div>
//       {modalOpen && (
//         <Modal
//           closeModal={() => setModalOpen(false)}
//           feedbackImgUrl={selectedFoodImgUrl}
//           updateGallery={(newGallery) => setGallery(newGallery)}
//         />
//       )}
//     </section>
//   );
// };

// export default Gallery;
