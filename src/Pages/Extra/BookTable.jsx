import { useState } from "react";

const BookTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative overflow-hidden my-6 w-[95%] mx-auto bg-gray-100 rounded-lg shadow-lg">
      <img
        src="https://source.unsplash.com/1600x900/?restaurant"
        alt="Farm to Table Dining Experience"
        className="object-cover w-full  h-96"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
          Book Your Table Now
        </h2>
        <p className="text-white text-lg sm:text-xl lg:text-2xl text-center px-4">
          Experience the freshness of locally sourced ingredients direct from
          our partnered farms to your table. Each dish is crafted with care to
          bring out the natural flavors and essence of the season.
        </p>
        <button
          className="mt-6 bg-primary text-white px-8 py-3 rounded-full uppercase font-semibold text-sm sm:text-base hover:bg-opacity-80 transition duration-300"
          onClick={() => setIsOpen(true)}
        >
          Book a Table
        </button>
      </div>

      {/* Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 md:mx-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-center mb-4">Book Now</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary transition duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary transition duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-semibold">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary transition duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="block text-sm font-semibold">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary transition duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-opacity-80 transition duration-300"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTable;
