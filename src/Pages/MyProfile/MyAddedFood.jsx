import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaRegEdit, FaEye } from "react-icons/fa";
import UpdateFood from "./UpdateFood";

const MyAddedFood = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [myAddedFood, setMyAddedFood] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateFoodInfo, setUpdateFoodInfo] = useState(null);

  const findBy = {
    userName: user?.displayName,
    photoUrl: user?.photoURL,
    userEmail: user?.email || "Email Hidden For Security",
  };

  const fetchMyAddedFood = () => {
    let queryParams = "";
    if (findBy.userName && findBy.photoUrl) {
      queryParams = `userName=${findBy.userName}&photoUrl=${findBy.photoUrl}`;
    } else if (findBy.userEmail) {
      queryParams = `userEmail=${findBy.userEmail}`;
    }
    axiosSecure
      .get(`/myAddedFoods?${queryParams}`)
      .then((res) => setMyAddedFood(res.data))
      .catch((error) => {
        console.error("Error fetching user's added foods:", error);
        toast.error("Failed to fetch user's added foods.");
      });
  };

  useEffect(() => {
    fetchMyAddedFood();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.post(`/myAddedFoods/${id}`);
          setMyAddedFood(myAddedFood.filter((food) => food._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting data:", error);
          toast.error("Failed to delete food.");
        }
      } else {
        Swal("Your imaginary file is safe!");
      }
    });
  };

  const handleUpdate = (foodId) => {
    setUpdateFoodInfo(foodId);
    setModalOpen(true);
  };

  const handleFoodUpdate = () => {
    fetchMyAddedFood();
  };

  return (
    <div className="overflow-x-auto">
      {myAddedFood.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg font-semibold mb-2">Zero Foods Added Yet</p>
          <p>Add some foods to see them here!</p>
        </div>
      ) : (
        <table className="table">
          {/* head */}
          <thead className="w-full">
            <tr>
              <th>Delete</th>
              <th>Added Information</th>
              <th>Available Quantity</th>
              <th>Per Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myAddedFood.map((food) => (
              <tr key={food._id}>
                <th>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="btn btn-circle btn-sm md:btn-md"
                  >
                    <MdDeleteSweep className="w-4 h-4 md:w-6 md:h-6" />
                  </button>
                </th>
                <td>
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 md:w-16 md:h-16">
                        <img src={food?.food_image} alt={food?.food_name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{food?.food_name}</div>
                      <div className="text-sm opacity-50">
                        Total Quantity Seals: {food?.totalSeals}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <p className="ml-4 md:ml-8">{food?.quantity}</p>
                </td>
                <td>
                  {" "}
                  <p className="ml-4 md:ml-5">${food?.price}</p>
                </td>
                <th>
                  <div className="flex flex-col space-y-1">
                    <Link
                      to={`/FoodDetails/${food._id}`}
                      className="btn btn-ghost btn-xs btn-outline"
                    >
                      <FaEye />
                      <span className="hidden md:flex">DETAILS</span>
                    </Link>
                    <Link
                      onClick={() => handleUpdate(food._id)}
                      className="btn btn-ghost btn-xs border border-secondary"
                    >
                      <FaRegEdit />{" "}
                      <span className="hidden md:flex">UPDATE</span>
                    </Link>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <UpdateFood
          foodId={updateFoodInfo}
          closeModal={() => setModalOpen(false)}
          handleFoodUpdate={handleFoodUpdate}
        />
      )}
    </div>
  );
};

export default MyAddedFood;
