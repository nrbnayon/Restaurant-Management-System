import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/404.gif')` }}
    >
      <div className="bg-blue-gray-300 text-center p-4 rounded-md">
        <p className="text-2xl font-bold mb-8 text-white">
          OOPS! Your Destination not Found
        </p>
        <Link to="/" className=" hover:underline btn btn-success font-bold">
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
