import React from "react";
import CardSignup from "../Components/authentication/assets/CardSignup";

const Signup = () => {
  return (
    <div className="md:w-[550px] md:h-[750px] w-full h-full backdrop-blur flex justify-evenly items-center flex-col md:rounded-xl rounded-none bg-gradient-to-br from-gradiant-white to-gradiant-white">
      <CardSignup />
    </div>
  );
};

export default Signup;
