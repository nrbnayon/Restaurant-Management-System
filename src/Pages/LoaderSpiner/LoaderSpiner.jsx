import { CirclesWithBar } from "react-loader-spinner";

const LoaderSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-gray-600 mt-4 text-center text-5xl flex items-center justify-center">
          L
          <CirclesWithBar
            height="45"
            width="45"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          ading...
        </div>
      </div>
    </div>
  );
};

export default LoaderSpinner;
