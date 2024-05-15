import { useState } from "react";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import LoginImg from "../../assets/images/login.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { signInUser, loginWithGoogle, loginWithGithub } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    try {
      const userCredential = await signInUser(email, password);
      const user = userCredential.user;

      if (user) {
        toast.success("Login Successfully");
        navigate(location?.state ? location.state : "/");
      }
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password");
      } else {
        setError("Invalid email or password Try again");
      }
    }
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success("Google Login Successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGithubSignIn = () => {
    loginWithGithub()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success("GitHub Login successful!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSocialLogin = () => {
    setError("Please try other options. This not builded yet! on processing");
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-[95%] mx-auto  flex-col  lg:flex-row">
          <div className="md:w-1/2">
            <div className="">
              <img src={LoginImg} alt="LoginImg" />
            </div>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <h1 className="text-2xl md:text-5xl mt-4 text-center font-bold">
              Welcome Back!
            </h1>
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
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-circle bg-red-600 text-white"
                >
                  <FaGoogle />
                </button>
                <button
                  onClick={handleSocialLogin}
                  className="btn btn-circle bg-blue-700 text-white"
                >
                  <FaFacebook />
                </button>
                <button
                  onClick={handleGithubSignIn}
                  className="btn btn-circle bg-gray-800 text-white"
                >
                  <FaGithub />
                </button>
                <button
                  onClick={handleSocialLogin}
                  className="btn btn-circle bg-blue-800 text-white"
                >
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
