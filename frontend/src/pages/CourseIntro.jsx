import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiUrl } from "../config";

const CourseIntro = () => {
  const params = useParams();

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const getCourse = async () => {
    const res = await axios(`${ApiUrl}/courses/${params.courseId}`);

    setCourseTitle(res.data.title);
    setCourseDescription(res.data.description);
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div>
      <div className="ml-8 mt-8 flex flex-col gap-4">
        {courseTitle && (
          <h1 className="font-semibold text-[16px]">{courseTitle}</h1>
        )}

        {courseDescription && (
          <h1 className="text-[14px] ">{courseDescription}</h1>
        )}
      </div>
    </div>
  );
};

export default CourseIntro;
