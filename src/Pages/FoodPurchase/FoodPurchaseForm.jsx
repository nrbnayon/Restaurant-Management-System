import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import BgCard from "../Shared/BgCard/BgCard";

const PurchaseForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const foods = useLoaderData();
  const navigate = useNavigate();

  const {
    _id,
    food_name,
    food_image,
    price,
    description,
    userName,
    quantity,
    photoUrl,
  } = foods;
  const [formData, setFormData] = useState({
    foodId: _id,
    foodName: food_name,
    foodImage: food_image,
    foodOwner: userName,
    price: price,
    quantity: 1,
    buyerEmail: user?.email || "Email Hidden For Security",
    buyingDate: new Date().toDateString(),
    address: "",
    city: "",
    totalPrice: price,
    buyerName: user?.displayName,
    buyerProfileUrl: user?.photoURL,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === "quantity") {
      const totalPrice = parseFloat(value) * formData.price;
      updatedFormData = { ...updatedFormData, totalPrice: totalPrice };
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (quantity < formData.quantity) {
        toast.warn("OOPS! Item is not available");
      } else {
        await axiosSecure.post("/purchase", formData);
        toast.success("Food item purchased successfully!");
        navigate("/myOrderFood");
      }
    } catch (error) {
      console.error("Error purchasing food item:", error);
      toast.error("Failed to purchase food item. Please try again later.");
    }
  };
  const Card = {
    img: `${food_image}`,
    title: `${food_name}`,
    desc: `${description}`,
  };
  return (
    <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
      <BgCard Card={Card} />
      <h2 className="text-2xl font-bold my-4 text-center">
        Purchase: {food_name}
      </h2>
      <div
        className={`w-full h-full flex justify-center bg-white drop-shadow-2xl rounded-lg `}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8 lg:mb-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                  <h3 className="text-2xl font-semibold whitespace-nowrap">
                    Shipping Details
                  </h3>
                </div>
                <div className="lg:p-6 p-2">
                  {/* Shipping Details form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                      <label
                        htmlFor="foodName"
                        className=" block text-gray-700"
                      >
                        Food Name
                      </label>
                      <input
                        type="text"
                        id="foodName"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="quantity"
                          className="block text-gray-700"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          min={1}
                          required
                          className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="price" className="block text-gray-700">
                          Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          disabled
                          min={0}
                          className=" p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <input
                          value={formData.address}
                          onChange={handleChange}
                          name="address"
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Enter your address"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">City</label>
                        <input
                          value={formData.city}
                          onChange={handleChange}
                          name="city"
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Enter your city"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                          className="bg-transparent flex h-10 w-full rounded-md border px-3 bg-gray-100"
                          value={formData.buyerName}
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="buyingDate"
                          className="block text-gray-700"
                        >
                          Buying Date
                        </label>
                        <input
                          type="text"
                          id="buyingDate"
                          name="buyingDate"
                          value={formData.buyingDate}
                          disabled
                          className="p-2 w-full border-gray-300 rounded-md bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="mb-4 space-y-2">
                      <label
                        htmlFor="buyerEmail"
                        className="block text-gray-700"
                      >
                        Buyer Email
                      </label>
                      <input
                        type="email"
                        id="buyerEmail"
                        name="buyerEmail"
                        value={formData.buyerEmail}
                        disabled
                        className=" p-2 w-full border-gray-300 rounded-md bg-gray-100"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="rounded-lg border bg-card  shadow-sm ">
                <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                  <h3 className="text-2xl font-semibold whitespace-nowrap">
                    Payment Information
                  </h3>
                </div>
                <div className="lg:p-6 p-2">
                  {/* Personal Information details form */}
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Card Number
                      </label>
                      <input
                        className="bg-transparent flex h-10 w-full rounded-md border px-3"
                        placeholder="Enter your card number"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                          Expiry Date
                        </label>
                        <input
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                          CVV
                        </label>
                        <input
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Enter your CVV"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Billing Address
                      </label>
                      <input
                        className="bg-transparent flex h-10 w-full rounded-md border px-3"
                        placeholder="Enter your billing address"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:mb-0 mb-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                  <h3 className="text-2xl font-semibold whitespace-nowrap">
                    Order Summary
                  </h3>
                </div>
                <div className="lg:p-6 p-2">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{food_name}</span>
                      <span>${price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span>{formData.quantity}</span>
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${formData.totalPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center lg:p-6 p-2">
                  <button
                    onClick={handleSubmit}
                    disabled={photoUrl === user?.photoURL || quantity === 0}
                    className="inline-flex items-center btn hover:btn-secondary text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
