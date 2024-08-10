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
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log(user);

      const rollNo = user.email.split("@")[0];

      const data = {
        name: user.displayName,
        email: user.email,
        photo: user.profileUrl,
        roll_no: rollNo,
        role: "student",
      };

      dispatch(googleSignIN(data))
        .then((res) => {
          console.log(res);
          navigate("/");
          toast.success("Sign In Successfully");
        })
        .catch((error) => {
          console.log("Dispatch error:", error);
          toast.error("Failed to sign in. Please try again.");
        });

      // else {
      //   toast.error("You are not a member of the IITM community.");
      // }
    } catch (error) {
      console.log("Could not sign in with Google", error);
      toast.error("Could not sign in with Google. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleClick}
        className="mx-auto flex items-center gap-2 py-2 px-5 bg-red-700 rounded-full hover:bg-purple-500 text-white"
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
