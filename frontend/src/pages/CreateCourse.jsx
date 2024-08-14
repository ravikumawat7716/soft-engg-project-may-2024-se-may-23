import React, { useState } from "react";
import axios from "axios";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ApiUrl } from "../config";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";

const courseSchema = yup.object({
  title: yup.string().min(5).max(30).required(),
  description: yup.string().required(),
});

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(courseSchema),
  });

  const onSubmit = async (payload) => {
    setLoading(true);
    const res = await axios.post(`${ApiUrl}/courses`, payload);
    console.log(res.data);
    setLoading(false);
    toast.success("Course Added");
    navigate("/");
  };

  const inputClass =
    "border border-red-400 rounded-md text-gray-700 font-[600] h-10 p-4 w-full  bg-transparent outline-none ";

  return (
    <div className="flex justify-center">
      <div className="w-[500px]">
        <h1 className="font-bold text-[22px] text-gray-800 mt-4 text-center">
          Add new Course
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5">
            <label className="font-semibold text-[18px] mb-4">Title</label>
            <input
              type="text"
              placeholder="Enter Course Title"
              className={inputClass}
              {...register("title")}
            />
            <span className="text-red-500 font-semibold">
              {errors.title?.message}
            </span>
          </div>

          <div className="mt-5">
            <label className="font-semibold text-[18px] mb-4">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter Description"
              className={inputClass}
              style={{ height: "auto" }} // Adjust 'auto' or any specific height if needed
              {...register("description")}
            />
            <span className="text-red-500 font-semibold">
              {errors.description?.message}
            </span>
          </div>

          <div className="mt-5">
            <Button
              className="bg-red-500 w-full p-2 h-10 rounded-lg text-white font-semibold text-[18px]"
              isLoading={loading}
              type="submit"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
