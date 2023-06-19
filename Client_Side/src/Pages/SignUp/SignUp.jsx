import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [authError, setAuthError] = useState([]);
  const navigate = useNavigate();

  //  Submit to firebase SignUp
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, data.photoURL).then(() => {
          const saveUser = { name: data.name, email: data.email };
          fetch(
            "https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/users",
            {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(saveUser)
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User Register successfully.",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate("/");
              }
            });
        });
      })
      .catch((error) => {
        setAuthError(error.message);
      });
  };

  return (
    <div className="hero min-h-screen pt-20 bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          {/* SignUp Form start */}
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                {...register("name", { required: true })}
                placeholder="name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
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
              {authError && <div className="text-red-600">{authError}</div>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*-])(?=.*[0-9])(?=.*[a-z])/
                })}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("password")
                })}
                placeholder="confirm password"
                className="input input-bordered"
              />
              {errors.confirmPassword && (
                <p className="text-red-600">Passwords do not match</p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary bg-blue-100 text-black"
                type="submit"
                value="Register"
              />
            </div>
            <p>
              <small>
                Already have an account?{" "}
                <Link className="text-blue-500" to="/login">
                  Login.
                </Link>
              </small>
            </p>
            <SocialLogin></SocialLogin>
          </form>

          {/* SignUp Form end */}
        </div>
        <div className="text-center space-y-7 lg:text-left">
          <h1 className="text-5xl font-bold font-serif">Please Register!</h1>
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

export default SignUp;
