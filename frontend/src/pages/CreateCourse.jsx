import React from "react";
import axios from "axios";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ApiUrl } from "../config";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const courseSchema = yup.object({
  title: yup.string().min(5).max(30).required(),
  description: yup.string().required(),
});

const CreateCourse = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(courseSchema),
  });

  const onSubmit = async (payload) => {
    // const res = await axios.post(`${ApiUrl}/courses/create`, payload);
    // console.log(res.data);
    // navigate("/");
  };

  const inputClass =
    "border border-red-400 rounded-md h-10 p-2 w-full bg-transparent outline-none";

  return (
    <div className="flex justify-center">
      <div className="w-[500px]">
        <h1>Create Course</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter Course Title"
              className={inputClass}
              {...register("title")}
            />
            <span className="text-red-500 font-bold">
              {errors.title?.message}
            </span>
          </div>

          <div className="mt-5">
            <label>Description</label>
            <textarea
              rows={4}
              placeholder="Enter Description"
              className={inputClass}
              {...register("description")}
            />
            <span className="text-red-500 font-bold">
              {errors.description?.message}
            </span>
          </div>

          <div className="mt-5">
            <button className="bg-red-500 w-full p-2 h-10 rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
