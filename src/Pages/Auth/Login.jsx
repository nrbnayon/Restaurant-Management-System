import { useContext, useState } from "react";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import LoginImg from "../../assets/images/login.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate(location?.state ? location?.state : "/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email address is already in use. Please log in instead.");
      } else {
        setError(error.message);
      }
      console.error(error);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-full mx-6  flex-col  lg:flex-row">
          <div className="md:w-1/2">
            <div className="">
              <img src={LoginImg} alt="LoginImg" />
            </div>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <h1 className="text-5xl mt-4 text-center font-bold">Login now!</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div>
                {error && (
                  <p className="btn-outline w-full text-red-500">{error}</p>
                )}
              </div>
              <div className="form-control">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className="flex justify-center">
                <p className="text-sm">New to Food-E?</p>
                <Link to="/register" className="ml-1 text-primary font-bold">
                  Register Now
                </Link>
              </div>
              <div className="divider my-0">OR</div>

              <h3 className="text-lg text-center font-semibold">
                Continue with
              </h3>
              <div className="flex items-center flex-wrap justify-evenly w-full ">
                <button className="btn btn-circle bg-red-600 text-white">
                  <FaGoogle />
                </button>
                <button className="btn btn-circle bg-blue-700 text-white">
                  <FaFacebook />
                </button>
                <button className="btn btn-circle bg-gray-800 text-white">
                  <FaGithub />
                </button>
                <button className="btn btn-circle bg-blue-800 text-white">
                  <FaLinkedin />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
