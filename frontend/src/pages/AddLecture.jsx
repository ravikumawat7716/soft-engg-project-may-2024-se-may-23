import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ApiUrl } from "../config";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddLecture = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      courseId: "",
      youtubeId: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "testCases",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const res = await axios.get(`${ApiUrl}/courses`);
      setCourses(res.data);
    };
    getCourses();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(`${ApiUrl}/lectures`, data);
      console.log(response.data);
      toast.success("Lecture Added");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[500px]">
        <h2 className="font-semibold text-[20px] mt-[50px]">Add Lecture</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              label="Title"
              {...register("title", { required: true })}
              fullWidth
              margin="normal"
            />
          </div>

          <div>
            <FormControl fullWidth margin="normal">
              <InputLabel id="course-label">Course</InputLabel>
              <Controller
                name="courseId"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="course-label" label="Course">
                    {courses.map((course) => (
                      <MenuItem key={course._id} value={course._id}>
                        {course.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>

          <div>
            <TextField
              label="YoutubeId"
              {...register("youtubeId", { required: true })}
              fullWidth
              margin="normal"
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddLecture;
