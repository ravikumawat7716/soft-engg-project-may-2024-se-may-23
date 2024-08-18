import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { googleSignIN } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log(user);

    console.log(user.photoURL);

    const rollNo = user.email.split("@")[0];

    const data = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      roll_no: rollNo,
      role: "student",
    };

    await dispatch(googleSignIN(data))
      .then((res) => {
        console.log(res.payload);
        console.log(res.type);
        if (res.payload.role === "instructor") {
          navigate("/instructor");
        } else {
          navigate("/");
        }

        toast.success("Sign In Successfully");
      })
      .catch((error) => {
        console.log("Dispatch error:", error);
        toast.error("Failed to sign in. Please try again.");
      });
  };

  return (
    <>
      <button
        onClick={handleGoogleClick}
        className="mx-auto flex items-center gap-2 py-2 px-5 bg-indigo-600 rounded-full hover:bg-indigo-400 text-white"
      >
        <span className="text-[20px]">
          <FcGoogle />
        </span>{" "}
        <h1>Sign In with Google</h1>
      </button>
      <ToastContainer />
    </>
  );
};

export default OAuth;
