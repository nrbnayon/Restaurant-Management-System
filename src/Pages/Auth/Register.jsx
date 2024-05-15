import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateProfile } = useAuth();
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const photourl = formData.get("photourl");
    const email = formData.get("email");
    let password = formData.get("password").trim();
    try {
      setError(null);

      if (!username || !photourl || !email || !password) {
        throw new Error("All fields are required.");
      }

      if (!isValidEmail(email)) {
        throw new Error("Invalid email format.");
      }

      if (
        password.length < 6 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password)
      ) {
        throw new Error(
          "Password should be at least 6 characters long and contain at least one uppercase and one lowercase letter."
        );
      }

      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: username,
        photoURL: photourl,
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#8EA7E9]/20 p-6 md:p-0">
      <div className="flex h-full w-full overflow-hidden rounded-xl shadow-md  md:h-[90%] md:w-[80%] lg:h-[80%]">
        <div className="relative hidden h-full items-center justify-center bg-[#8EA7E9] md:flex md:w-[60%] lg:w-[40%]">
          <div className="absolute -top-2 left-[20%] h-16 w-16 rounded-full bg-gradient-to-br  from-white via-[#9eb6f8] to-[#6585dd]"></div>
          <div className="absolute bottom-[18%] left-[20%] h-20 w-20 rounded-full bg-gradient-to-br  from-white via-[#9eb6f8] to-[#6585dd]"></div>
          <div className="absolute -right-7 top-[50%] h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-[#9eb6f8] to-[#6585dd] transition-all"></div>
          <div className="absolute left-[50%] top-[22%] h-24 w-24 -translate-x-1/2 rounded-full  bg-gradient-to-br from-white via-[#9eb6f8] to-[#6585dd]"></div>
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-medium text-white/80 ">Welcome</h2>
            <p className="animate-pulse text-sm text-white/60">
              Please Enter You Information
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center bg-white py-10 lg:w-[60%]">
          <h2 className="pb-8 text-center text-3xl font-bold text-[#8EA7E9]">
            Register Now
          </h2>
          <form
            onSubmit={handleRegister}
            className="flex  w-full flex-col items-center justify-center gap-4"
          >
            <input
              className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
              type="text"
              placeholder="User Name"
              name="username"
              required
            />
            <input
              className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
              type="text"
              placeholder="Photo url"
              name="photourl"
              required
            />
            <input
              className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <div className="relative flex items-center w-[80%] md:w-[60%]">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="w-full rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full flex items-center justify-center p-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="text-[14px] text-gray-400">
              Already have an account ?
              <Link to="/login" style={{ color: "#8EA7E9" }}>
                Login Here
              </Link>
            </div>
            {error && (
              <div className="w-[80%] md:w-[60%] btn-rounded text-red-500 rounded p-2 mt-3">
                {error}
              </div>
            )}
            <input
              className="w-[80%] btn hover:btn-primary rounded-lg bg-[#8EA7E9] px-6 py-2 font-medium text-white md:w-[60%]"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
