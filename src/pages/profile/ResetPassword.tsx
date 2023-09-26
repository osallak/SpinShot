import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import React, { useState } from "react";
import PasswordButton from "@/Components/ui/Buttons/PasswordButton";

const ResetPassword = () => {
  const [password0, setPassword0] = useState(false);
  const [password1, setPassword1] = useState(false);
  const [password2, setPassword2] = useState(false);

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
      <div className="  flex items-end md:items-center md:justify-end md:right-0 mt-36 h-[10%]  justify-center px-10 sm:px-28 ">
        <SimpleButton content="Save" onclick={() => ""} />
      </div>
    </div>
  );
};

export default ResetPassword;
