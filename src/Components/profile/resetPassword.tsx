import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import React, { useState } from "react";
import PasswordButton from "@/Components/ui/Buttons/PasswordButton";
import axios from "axios";
import { useAppSelector } from "../../../redux_tool";

import toast, { Toaster } from "react-hot-toast";
import ip from "@/endpoint/ip";

const ResetPassword = () => {
  const [password0, setPassword0] = useState(false);
  const [password1, setPassword1] = useState(false);
  const [password2, setPassword2] = useState(false);
  const profile_data = useAppSelector((state) => state.Profile);

  const [password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfermPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    {
      e.target.name == "Password"
        ? setPassword(e.target.value)
        : e.target.name == "New Password"
        ? setNewPassword(e.target.value)
        : e.target.name == "Confirm New Password"
        ? setConfermPassword(e.target.value)
        : null;
    }
    ("");
  };

  const hendleChange = () => {
    const parss = /^.{6,}$/;
    {
      password == "1234567" && parss.test(ConfirmPassword)
        ? hendleUpdata()
        : notify();
    }
  };

  const hendleUpdata = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(ConfirmPassword);
      const response = await axios.patch(
        `${ip}/users`,
        {
          password: ConfirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("re ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const notify = () => {
    toast.success("Password incorrect ");
  };

  return (
    <div className=" space-y-20 md:space-y-36  h-[910px] ">
      <div className=" text-pearl text-[15px] sm:text-2xl  h-[14%] md:h-[18%] c-gb:h-[25%] flex items-center c-10xl:px-24 px-16">
        <h1 className="">Reset Password</h1>
      </div>
      <div className=" text-pearl h-[18%] c-gb:h-[25%] space-y-10 justify-center  items-center flex c-10xl:px-24 px-16 flex-col">
        <div className=" bg-very-dark-purple w-[100%] md:w-[550px] rounded-[20px] flex flex-row justify-center items-center">
          <input
            name={"Password"}
            onChange={handleChange}
            className=" bg-very-dark-purple w-[100%] rounded-[20px] px-7 h-14 opacity-40"
            type={password0 ? "text" : "password"}
            placeholder={"Password"}
          />
          <PasswordButton
            ShowPassword={password0}
            setShowPassword={setPassword0}
          />
        </div>
        <div className=" bg-very-dark-purple w-[100%] md:w-[550px] rounded-[20px] flex flex-row justify-center items-center">
          <input
            name={"New Password"}
            onChange={handleChange}
            className=" bg-very-dark-purple w-[100%] rounded-[20px] px-7 h-14 opacity-40"
            type={password1 ? "text" : "password"}
            placeholder={"New Password"}
          />
          <PasswordButton
            ShowPassword={password1}
            setShowPassword={setPassword1}
          />
        </div>
        <div className=" bg-very-dark-purple w-[100%] md:w-[550px] rounded-[20px] flex flex-row justify-center items-center">
          <input
            name={"Confirm New Password"}
            onChange={handleChange}
            className=" bg-very-dark-purple w-[100%] rounded-[20px] px-7 h-14 opacity-40"
            type={password2 ? "text" : "password"}
            placeholder={"Confirm New Password"}
          />
          <PasswordButton
            ShowPassword={password2}
            setShowPassword={setPassword2}
          />
        </div>
      </div>
      <div className=" h-12 flex c-gb:justify-end  justify-center items-center sm:px-28 ">
        <div className={`  w-24 sm:w-32  h-full`}>
          <SimpleButton content="Save" onclick={hendleChange} />
        </div>
      </div>
        {/* <Toaster
          position="top-right"
          reverseOrder={false}
        /> */}
    </div>
  );
};

export default ResetPassword;
