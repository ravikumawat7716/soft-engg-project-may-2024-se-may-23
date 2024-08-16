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

const CreatePA = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      courseId: "",
      testCases: [{ input: "", expectedOutput: "" }],
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
      const response = await axios.post(
        `${ApiUrl}/programming_assignments`,
        data
      );
      console.log(response.data);
      toast.success("Programming Assignment Added");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[500px]">
        <h2 className="text-[18px] font-semibold mt-[20px]">Create PA</h2>
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
            <h3>Test Cases</h3>
            {fields.map((item, index) => (
              <div key={item.id} style={{ marginBottom: "1rem" }}>
                <TextField
                  label={`Input ${index + 1}`}
                  {...register(`testCases.${index}.input`, { required: true })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={`Expected Output ${index + 1}`}
                  {...register(`testCases.${index}.expectedOutput`, {
                    required: true,
                  })}
                  fullWidth
                  margin="normal"
                />
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: "0.5rem" }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ input: "", expectedOutput: "" })}
              variant="contained"
              color="primary"
            >
              Add Test Case
            </Button>
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

export default CreatePA;
