import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxios from "./../../hooks/useAxios";

function AddNewFood() {
  const { user } = useAuth();
  const axiosSecure = useAxios();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post("/addFood", formData);
      toast.success("Food item added successfully!");
    } catch (error) {
      console.error("Error added food item:", error);
      toast.error("Failed to added food item. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-50px)] my-6 overflow-x-hidden bg-gray-200">
      <div className="bg-white shadow-md rounded px-2 md:px-8 pt-6 pb-8 mb-4  md:w-[80%] mx-auto w-full">
        <h2 className="text-2xl text-center  font-bold mb-4">
          Add New Delicious Food
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
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewFood;
