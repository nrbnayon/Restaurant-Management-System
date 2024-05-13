import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaRegEdit, FaEye } from "react-icons/fa";

const MyAddedFood = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [myAddedFood, setMyAddedFood] = useState([]);

  const findBy = {
    userName: user?.displayName,
    photoUrl: user?.photoURL,
    userEmail: user?.email || "Email Hidden For Security",
  };

  useEffect(() => {
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
          console.log("delete id", id);
          await axiosSecure.post(`/myAddedFoods/${id}`);
          // Remove the deleted item from the state
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

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Delete</th>
            <th>Images & Name</th>
            <th>Available Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myAddedFood.map((food) => (
            <tr key={food._id}>
              <th>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="btn btn-circle btn-md"
                >
                  <MdDeleteSweep className="w-6 h-6" />
                </button>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16">
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
              <td>Available Quantity: {food?.quantity}</td>
              <td>Per Quantity: ${food?.price}</td>
              <th>
                <div className="flex flex-col space-y-1">
                  <Link
                    to={`/FoodDetails/${food._id}`}
                    className="btn btn-ghost btn-xs btn-outline"
                  >
                    <FaEye /> Details
                  </Link>
                  <Link
                    to={`/FoodDetails/${food._id}`}
                    className="btn btn-ghost btn-xs border border-secondary"
                  >
                    <FaRegEdit /> UPDATE
                  </Link>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAddedFood;
