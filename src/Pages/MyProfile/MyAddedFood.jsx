import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyAddedFood = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [myAddedFood, setMyAddedFood] = useState([]);

  const findBy = {
    userName: user?.displayName,
    photoUrl: user?.photoURL,
  };

  useEffect(() => {
    axiosSecure
      .get(
        `/myAddedFoods?userName=${findBy.userName}&photoUrl=${findBy.photoUrl}`
      )
      .then((res) => setMyAddedFood(res.data));
  }, [findBy]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          console.log("delete id", id);
          //   const response = await fetch(
          //     `https://euro-tour-server.vercel.app/foods/${id}`,
          //     {
          //       method: "DELETE",
          //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //     }
          //   );

          //   if (!response.ok) {
          //     throw new Error("Failed to delete food.");
          //   }
          //   setMyAddedFood((deleteFoods) =>
          //     deleteFoods.filter((food) => food._id !== id)
          //   );

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
            <th>Images</th>
            <th>Name</th>
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
                      Total Purchase: {food?.purchaseCount}
                    </div>
                  </div>
                </div>
              </td>
              <td>Available Quantity: {food?.quantity}</td>
              <td>Price: {food?.price}</td>
              <th>
                <button className="btn btn-ghost btn-xs">Details</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAddedFood;
