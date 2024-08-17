import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button as ChakraButton } from "@chakra-ui/react";
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
import { ToastContainer, toast } from "react-toastify";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState([]);
  const { control, handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      questions: [
        {
          type: "mcq",
          question: "",
          options: ["", ""],
          answer: "",
        },
      ],
      courseId: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    const getCourses = async () => {
      const res = await axios({
        url: `${ApiUrl}/courses`,
      });
      setCourses(res.data);
    };
    getCourses();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const convertedData = {
      ...data,
      questions: data.questions.map((question) => {
        if (question.type === "mcq") {
          question.answer = question.options.indexOf(question.answer);
        } else if (question.type === "msq") {
          const optionss = question.answer.split(",");
          question.answer = optionss.map((ans) =>
            question.options.indexOf(ans)
          );
        }
        return question;
      }),
    };

    console.log(convertedData);
    try {
      const response = await axios.post(`${ApiUrl}/assignments`, convertedData);
      console.log(response.data);
      setLoading(false);
      navigate("/");
      toast.success("Assignment Created");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="w-[500px]">
        <h1 className="text-center font-[800] text-gray-800 text-[20px] mt-4">
          Create a Assignment
        </h1>
        <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Controller
              name="courseId"
              control={control}
              rules={{ required: "Course is required" }}
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

          {fields.map((item, index) => {
            const type = watch(`questions.${index}.type`);
            const options = watch(`questions.${index}.options`);

            return (
              <div key={item.id}>
                <h3>Question {index + 1}</h3>
                <FormControl fullWidth margin="normal">
                  <InputLabel id={`question-type-label-${index}`}>
                    Question Type
                  </InputLabel>
                  <Controller
                    name={`questions.${index}.type`}
                    control={control}
                    rules={{ required: "Question type is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId={`question-type-label-${index}`}
                        label="Question Type"
                        onChange={(e) => {
                          setValue(`questions.${index}.type`, e.target.value);
                          if (e.target.value === "subjective") {
                            setValue(`questions.${index}.options`, []);
                          } else if (
                            !watch(`questions.${index}.options`).length
                          ) {
                            setValue(`questions.${index}.options`, ["", ""]);
                          }
                        }}
                      >
                        <MenuItem value="mcq">MCQ</MenuItem>
                        <MenuItem value="msq">MSQ</MenuItem>
                        <MenuItem value="subjective">Subjective</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Question"
                  {...register(`questions.${index}.question`, {
                    required: "Question is required",
                  })}
                />
                {(type === "mcq" || type === "msq") && (
                  <>
                    {options.map((option, optionIndex) => (
                      <TextField
                        key={optionIndex}
                        fullWidth
                        margin="normal"
                        label={`Option ${optionIndex + 1}`}
                        {...register(
                          `questions.${index}.options.${optionIndex}`,
                          { required: "Option is required" }
                        )}
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={() => {
                        setValue(`questions.${index}.options`, [
                          ...options,
                          "",
                        ]);
                      }}
                    >
                      Add Option
                    </Button>
                  </>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Answer"
                  {...register(`questions.${index}.answer`, {
                    required: "Answer is required",
                  })}
                />
                <Button type="button" onClick={() => remove(index)}>
                  Remove Question
                </Button>
              </div>
            );
          })}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            type="button"
            onClick={() =>
              append({
                type: "mcq",
                question: "",
                options: ["", ""],
                answer: "",
              })
            }
          >
            Add Question
          </button>
          <ChakraButton
            className="px-4 py-2 ml-2  bg-red-700 text-white font-semibold rounded-md"
            type="submit"
            isLoading={loading}
          >
            Submit
          </ChakraButton>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
