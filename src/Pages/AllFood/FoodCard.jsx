import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { TbListDetails } from "react-icons/tb";
import { FaCartArrowDown } from "react-icons/fa";

const FoodCard = ({ food }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const { _id, food_name, food_image, food_category, price, quantity } = food;

  return (
    <div
      className="mx-auto w-full my-6 md:max-w-[380px] space-y-6 rounded-xl bg-white p-4 font-sans shadow-lg dark:bg-[#18181B] transition duration-300 ease-in-out transform hover:scale-105 hover:border-primary"
      data-aos="fade-up"
    >
      <div className="relative flex h-48 w-full justify-center lg:h-[280px]">
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          {/* love  */}
          <div className="flex items-center">
            <svg
              width={30}
              className="fill-transparent stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500 "
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <g strokeWidth="0"></g>{" "}
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>{" "}
              <g id="SVGRepo_iconCarrier">
                <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
              </g>
            </svg>
          </div>
        </div>
        <img
          width={300}
          height={300}
          className="h-full w-full rounded-lg bg-black/40"
          src={food_image}
          alt="food"
        />
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="space-x-2">
          <button
            aria-label="Share this post"
            type="button"
            className="p-2 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4 fill-current dark:text-violet-600"
            >
              <path d="M404,344a75.9,75.9,0,0,0-60.208,29.7L179.869,280.664a75.693,75.693,0,0,0,0-49.328L343.792,138.3a75.937,75.937,0,1,0-13.776-28.976L163.3,203.946a76,76,0,1,0,0,104.108l166.717,94.623A75.991,75.991,0,1,0,404,344Zm0-296a44,44,0,1,1-44,44A44.049,44.049,0,0,1,404,48ZM108,300a44,44,0,1,1,44-44A44.049,44.049,0,0,1,108,300ZM404,464a44,44,0,1,1,44-44A44.049,44.049,0,0,1,404,464Z"></path>
            </svg>
          </button>
          <button aria-label="Bookmark this post" type="button" className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4 fill-current dark:text-violet-600"
            >
              <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
            </svg>
          </button>
        </div>
        <div className="flex space-x-2 text-sm dark:text-gray-600">
          <button type="button" className="flex items-center p-1 space-x-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-label="Number of comments"
              className="w-4 h-4 fill-current dark:text-violet-600"
            >
              <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
              <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
            </svg>
            <span>30</span>
          </button>
          <button type="button" className="flex items-center p-1 space-x-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-label="Number of likes"
              className="w-4 h-4 fill-current dark:text-violet-600"
            >
              <path d="M126.638,202.672H51.986a24.692,24.692,0,0,0-24.242,19.434,487.088,487.088,0,0,0-1.466,206.535l1.5,7.189a24.94,24.94,0,0,0,24.318,19.78h74.547a24.866,24.866,0,0,0,24.837-24.838V227.509A24.865,24.865,0,0,0,126.638,202.672ZM119.475,423.61H57.916l-.309-1.487a455.085,455.085,0,0,1,.158-187.451h61.71Z"></path>
              <path d="M494.459,277.284l-22.09-58.906a24.315,24.315,0,0,0-22.662-15.706H332V173.137l9.573-21.2A88.117,88.117,0,0,0,296.772,35.025a24.3,24.3,0,0,0-31.767,12.1L184.693,222.937V248h23.731L290.7,67.882a56.141,56.141,0,0,1,21.711,70.885l-10.991,24.341L300,169.692v48.98l16,16H444.3L464,287.2v9.272L396.012,415.962H271.07l-86.377-50.67v37.1L256.7,444.633a24.222,24.222,0,0,0,12.25,3.329h131.6a24.246,24.246,0,0,0,21.035-12.234L492.835,310.5A24.26,24.26,0,0,0,496,298.531V285.783A24.144,24.144,0,0,0,494.459,277.284Z"></path>
            </svg>
            <span>283</span>
          </button>
        </div>
      </div>

      <div
        className="mx-auto w-[85%] text-gray-800 space-y-4 text-center font-semibold"
        data-aos="fade-up"
      >
        <h6 className="text-sm md:text-base lg:text-lg">{food_name}</h6>
        <div className="flex justify-between">
          <p className="text-md font-semibold md:text-sm">
            Recipe: {food_category}
          </p>
          <p className="text-md font-bold md:text-md">Quantity: {quantity}</p>
        </div>
        <h3 className="text-sm md:text-base lg:text-lg">Price: ${price}</h3>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
        <Link
          data-aos="fade-up"
          data-aos-delay="200"
          to={`/foodDetails/${_id}`}
          state={food.food_name}
          className="text-xl box-border btn text-center  border-4 border-blue-gray-700 w-40  h-14 rounded-lg  bg-primary text-white  relative group"
        >
          <span className="font-bold pr-4">Details</span>
          <span className="bg-blue-gray-700 absolute right-0 top-0  h-full flex items-center justify-center px-1 group-hover:duration-300 group-hover:w-full w-10 duration-300">
            <TbListDetails />
          </span>
        </Link>

        <button
          className="flex items-center btn btn-sm duration-300 ease-in-out transform hover:scale-105"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <FaCartArrowDown className="w-4 h-4" />
          {/* <span className="text-[#c7c7c5]">Add to Cart</span> */}
        </button>
      </div>
    </div>
  );
};

FoodCard.propTypes = {
  food: PropTypes.object.isRequired,
};

export default FoodCard;
