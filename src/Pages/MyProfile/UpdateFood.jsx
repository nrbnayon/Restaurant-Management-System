import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

function UpdateFood({ foodId, closeModal, handleFoodUpdate }) {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [foodInfo, setFoodInfo] = useState(null);
  const [formData, setFormData] = useState({
    food_name: "",
    food_image: "",
    food_category: "",
    price: 0,
    quantity: 1,
    made_by: user?.displayName,
    food_origin: "",
    description: "",
    totalSeals: 0,
    purchaseCount: 0,
    userEmail: user?.email || "Email Hidden For Security",
    userName: user?.displayName,
    photoUrl: user?.photoURL,
  });

  useEffect(() => {
    axiosSecure
      .get(`/foods/${foodId}`)
      .then((res) => setFoodInfo(res.data))
      .catch((error) => {
        console.error("Error fetching food details:", error);
        toast.error("Failed to fetch food details.");
      });
  }, [axiosSecure, foodId]);

  useEffect(() => {
    if (foodInfo) {
      setFormData(foodInfo);
    }
  }, [foodInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post(`/updateFood/${foodId}`, formData);
      toast.success("Food item updated successfully!");
      closeModal();
      handleFoodUpdate();
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error("Failed to update food item. Please try again later.");
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto w-[80%] mx-auto mt-24 ">
      <div className="flex items-center justify-center   px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white p-4  sm:pb-4">
            <h2 className="md:text-xl font-bold text-center mb-4">
              Update Food: {formData.food_name}{" "}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1  md:grid-cols-2 gap-6"
            >
              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="food_image"
                >
                  Food Image URL:
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="food_image"
                  pattern="https?://.+"
                  title="Please enter a valid URL"
                  value={formData.food_image}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="food_name"
                >
                  Food Name:
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="food_name"
                  value={formData.food_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="food_category"
                >
                  Food Category:
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="food_category"
                  value={formData.food_category}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="food_origin"
                >
                  Country Name:
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="food_origin"
                  type="text"
                  name="food_origin"
                  value={formData.food_origin}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Short Description:
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Food Quantity:
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  min="1"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Per Food Price:
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="userName"
                >
                  Food Add By:
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="userName"
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="userEmail"
                >
                  Email:
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="userEmail"
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  disabled
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2 flex items-center justify-center">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  UPDATE
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={closeModal}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

UpdateFood.propTypes = {
  closeModal: PropTypes.func.isRequired,
  foodId: PropTypes.string.isRequired,
  handleFoodUpdate: PropTypes.func.isRequired,
};

export default UpdateFood;
