import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  //  Submit to firebase login
  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        // updateUserProfile(data.name, data.photoURL);
        reset();
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown"
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp"
          }
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setAuthError(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          {/* Login Form start */}

          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="password"
                className="input input-bordered"
              />
              {authError && <div className="text-red-600">{authError}</div>}
              <label className="label">
                <Link href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary bg-blue-100 text-black"
                type="submit"
                value="Login"
              />
            </div>
            <p>
              <small>
                New Here?{" "}
                <Link to="/signup" className="text-blue-500">
                  Create an account.
                </Link>{" "}
              </small>
            </p>
            <SocialLogin></SocialLogin>
          </form>

          {/* Login form end   */}
        </div>
        <div className="text-center space-y-7 lg:text-left">
          <h1 className="text-5xl font-bold font-serif">Please Login!</h1>
          <img
            className="w-[50%] rounded-lg"
            src="https://photo.safetyhandler.com/sc0/https:%2F%2Fmedia.safetyhandler.com%2Fmedia%2Fimage%2Fgif%2Fbucket%2Ff5a36ceabfbb6f240347cca1a558d957-0.gif%3Fview=image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
