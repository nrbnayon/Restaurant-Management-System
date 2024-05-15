import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyPurchase = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [myPurchaseFood, setMyPurchaseFood] = useState([]);

  const findPurchaseFood = {
    buyerName: user?.displayName,
    buyerProfileUrl: user?.photoURL,
    buyerEmail: user?.email || "Email Hidden For Security",
  };

  useEffect(() => {
    let queryParams = "";
    if (findPurchaseFood.buyerName && findPurchaseFood.buyerProfileUrl) {
      queryParams = `buyerName=${findPurchaseFood.buyerName}&buyerProfileUrl=${findPurchaseFood.buyerProfileUrl}`;
    } else if (findPurchaseFood.buyerEmail) {
      queryParams = `buyerEmail=${findPurchaseFood.buyerEmail}`;
    }
    axiosSecure
      .get(`/myPurchase?${queryParams}`)
      .then((res) => setMyPurchaseFood(res.data))
      .catch((error) => {
        console.error("Error fetching user's purchase foods:", error);
        toast.error("Failed to fetch your purchase foods.");
      });
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure delete your purchase?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.post(`/myPurchase/${id}`);
          setMyPurchaseFood(myPurchaseFood.filter((food) => food._id !== id));
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
      {myPurchaseFood.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg font-semibold mb-2">Zero Purchases Yet</p>
          <p>Start purchasing now!</p>
        </div>
      ) : (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Food Information</th>
              <th>Purchase Date & Cost</th>
              <th>Food Owner</th>
              <th>My Address</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {myPurchaseFood.map((food) => (
              <tr key={food._id}>
                <td>
                  <div className="flex flex-col md:flex-row  items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 md:w-16 md:h-16">
                        <img src={food?.foodImage} alt={food?.foodName} />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="font-bold">{food?.foodName}</div>
                      <div className="text-sm opacity-50">
                        Buy Quantity: {food?.quantity}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{food?.buyingDate}</p>
                    <div className="text-sm opacity-50">
                      Total Cost: ${food?.totalPrice}
                    </div>
                  </div>
                </td>
                <td className="uppercase">{food?.foodOwner}</td>
                <td>{food?.address}</td>
                <th>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="btn btn-circle btn-sm md:btn-md"
                  >
                    <MdDeleteSweep className="w-4 h-4 md:w-6 md:h-6" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPurchase;
