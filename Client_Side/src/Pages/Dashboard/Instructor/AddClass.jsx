import React, { useContext } from "react";
import SectionTitle from "../../Shared/SectionTitle /SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  //console.log(user);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            name,
            instructor,
            instructor_email,
            seatsAvailable,
            price,
            numberOfStudents,
            status,
            feedback
          } = data;
          const newClass = {
            name,
            price: parseFloat(price),
            instructor,
            instructor_email,
            seatsAvailable: parseFloat(seatsAvailable),
            numberOfStudents: parseFloat(numberOfStudents),
            image: imgURL,
            status,
            feedback
          };
          console.log(newClass);
          axiosSecure.post("/class", newClass).then((data) => {
            console.log("New class posting", data.data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-start",
                icon: "success",
                title: "Class added successfully",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        }
      });
  };
  //   console.log(errors);
  //   console.log(img_hosting_token);

  return (
    <div className="w-full h-full ">
      <SectionTitle
        SubTitle="Are you add a new class??"
        Title="Add a New Class"
      ></SectionTitle>
      <div className="px-20 pb-8 text-center">
        {" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control  w-full ">
            <label className="label">
              <span className="label-text">Class Name*</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              {...register("name", { required: true, maxLength: 120 })}
              className="input input-bordered input-info w-full "
            />
          </div>
          <div className="form-control  w-full ">
            <label className="label">
              <span className="label-text">Instructor Name*</span>
            </label>
            <input
              type="text"
              {...register("instructor", { required: true })}
              defaultValue={user.displayName}
              placeholder="Type here"
              className="input input-bordered input-info w-full "
            />
          </div>
          <div className="form-control  w-full ">
            <label className="label">
              <span className="label-text">Instructor Email*</span>
            </label>
            <input
              type="text"
              {...register("instructor_email", { required: true })}
              defaultValue={user.email}
              placeholder="Type here"
              className="input input-bordered input-info w-full "
            />
          </div>
          <div className="flex gap-40">
            {" "}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Available seats*</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                {...register("seatsAvailable", { required: true })}
                className="input input-bordered input-info w-full "
              />
            </div>
            <div className="form-control  w-full ">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Type here"
                className="input input-bordered input-info w-full "
              />
            </div>
            <div className="form-control  w-full ">
              <label className="label">
                <span className="label-text">Number of Student</span>
              </label>
              <input
                type="number"
                {...register("numberOfStudents", { required: true })}
                defaultValue={0}
                className="input input-bordered input-info w-full "
              />
            </div>
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Select Class Image*</span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered file-input-info w-full "
            />
          </div>
          <div className="form-control  w-full ">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <input
              type="text"
              {...register("status", { required: true })}
              defaultValue={"pending"}
              className="input input-bordered w-full "
            />
          </div>
          <input
            className="btn bg-blue-100 mt-4"
            type="submit"
            value="Add Class"
          />
        </form>
      </div>
    </div>
  );
};

export default AddClass;
