"use client";
import SimpleButton from "@/Components/ui/Buttons/simpleButton";
import React, { useState } from "react";
import PasswordButton from "@/Components/ui/Buttons/PasswordButton";
import axios from "axios";
import { useAppSelector } from "../../../redux_tool";

import toast, { Toaster } from "react-hot-toast";
import ip from "@/utils/endPoint";

const ResetPassword = () => {
  const [showPasswd, setShowPasswd] = useState(false);
  const [showNewPasswd, setShowNewPasswd] = useState(false);
  const [showConfPassw, setShowConfPassw] = useState(false);
  const [status, setStatus] = useState<any>();
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


  console.log(status);

  const hendleChange = () => {
      upDatePasswd()
    // const parss = /^.{6,}$/;
    // {
    //   password == "123456" && parss.test(ConfirmPassword)
    //     ? hendleUpdata()
    //     : notify();
    // }
  };

  // const checkPassword = async () => { 
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token)
  //     {
  //       const response = await axios.put(
  //         `${ip}/users/me/password`,
  //         {
  //           password: password,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //         );
  //         setStatus(response);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const upDatePasswd = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token)
      {
        const response = await axios.patch(
          `${ip}/users`,
          {
            oldPassword: password,
            password: ConfirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          );
          console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const notify = () => {
  //   toast.error("Password incorrect ");
  // };

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
            type={showPasswd ? "text" : "password"}
            placeholder={"Password"}
          />
          <PasswordButton
            ShowPassword={showPasswd}
            setShowPassword={setShowPasswd}
          />
        </div>
        <div className=" bg-very-dark-purple w-[100%] md:w-[550px] rounded-[20px] flex flex-row justify-center items-center">
          <input
            name={"New Password"}
            onChange={handleChange}
            className=" bg-very-dark-purple w-[100%] rounded-[20px] px-7 h-14 opacity-40"
            type={showNewPasswd ? "text" : "password"}
            placeholder={"New Password"}
          />
          <PasswordButton
            ShowPassword={showNewPasswd}
            setShowPassword={setShowNewPasswd}
          />
        </div>
        <div className=" bg-very-dark-purple w-[100%] md:w-[550px] rounded-[20px] flex flex-row justify-center items-center">
          <input
            name={"Confirm New Password"}
            onChange={handleChange}
            className=" bg-very-dark-purple w-[100%] rounded-[20px] px-7 h-14 opacity-40"
            type={showConfPassw ? "text" : "password"}
            placeholder={"Confirm New Password"}
          />
          <PasswordButton
            ShowPassword={showConfPassw}
            setShowPassword={setShowConfPassw}
          />
        </div>
      </div>
      <div className=" h-12 flex c-gb:justify-end  justify-center items-center sm:px-28 ">
        <div className={`  w-24 sm:w-32  h-full`}>
          <SimpleButton content="Save" onclick={hendleChange} />
        </div>
        {/* <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div> */}
      </div>
        {/* <Toaster
          position="top-right"
          reverseOrder={false}
        /> */}
    </div>
  );
};

export default ResetPassword;
