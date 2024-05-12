import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineGlobal,
} from "react-icons/ai";
import { Typewriter } from "react-simple-typewriter";
import AOS from "aos";
import "aos/dist/aos.css";

const FoodDetails = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const foods = useLoaderData();
  const {
    _id,
    food_name,
    food_image,
    food_category,
    price,
    made_by,
    food_origin,
    description,
  } = foods;

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={food_image} alt={food_name} className="w-full h-[400px] " />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mr-1 mb-4">
            <Typewriter
              words={[food_name]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              onLoop={() => {}}
              onFinish={() => {}}
            />
          </h2>
          <div className="flex justify-evenly">
            <div
              className="flex items-center text-gray-700 mb-2"
              data-aos="fade-up"
            >
              <AiOutlineUser className="inline-block mr-2 text-blue-500" />
              <span className="font-semibold mr-1 ">Made By: </span> {made_by}
            </div>
            <div
              className="flex items-center text-gray-700 mb-2"
              data-aos="fade-up"
            >
              <AiOutlineGlobal className="inline-block mr-2 text-blue-500" />
              <span className="font-semibold mr-1">Origin: </span> {food_origin}
            </div>
          </div>
          <div className="flex justify-around">
            <div
              className="flex items-center text-gray-700 mb-2"
              data-aos="fade-up"
            >
              <AiOutlineShoppingCart className="inline-block mr-2 text-blue-500" />
              <span className="font-semibold mr-1">Category: </span>{" "}
              {food_category}
            </div>
            <div
              className="flex items-center text-gray-700 mb-2"
              data-aos="fade-up"
            >
              <span className="font-semibold mr-1">Price: </span> ${price}
            </div>
          </div>
          <p className="text-gray-700 mb-4" data-aos="fade-up">
            {description}
          </p>
          <div className="w-full">
            <Link
              to={`/foodPurchase/${_id}`}
              state={food_name}
              className="bg-blue-500 w-full text-xl text-white btn rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              <AiOutlineShoppingCart className="inline-block mr-2" />
              Purchase Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
