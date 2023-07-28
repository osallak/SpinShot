import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import InputBorder from "../../ui/Inputs/InputBorder";
import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import user from "../../../../public/user.svg";
import Email from "../../../../public/Email.svg";
import redEmail from "../../../../public/redEmail.svg";
import reduser from "../../../../public/reduser.svg";
import SpinShotlogo from "../../../../public/SpinShotlogo.svg";
import lock from "../../../../public/lock.svg";
import redlock from "../../../../public/redlock.svg";

const RegPassword = /^.{6,}$/;
const RegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RegUsername = /^[a-zA-Z0-9_.]{3,16}$/;

const CardSignup = () => {
  const [inputValue, setInputValue] = useState("");
  const Router = useRouter();
  const RedirectionFunction = (Path: string) => {
    Router.push(Path);
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="border-3 w-full flex justify-center items-center flex-col space-y-5">
        <div className="w-24 h-24 flex justify-center">
          <Image src={SpinShotlogo} alt="SpinShot logo" />
        </div>
        <div className="w-full flex justify-center">
          <p className="font-Poppins font-black text-pearl text-opacity-30">Welcome!</p>
        </div>
      </div>
      <div className="md:w-[65%] w-[70%] h-[80%] flex items-center space-y-3 flex-col">
      <form autoComplete="off" className="w-full h-[80%] flex items-center justify-center space-y-5 flex-col">
        <div className="w-full h-[45px]">
          <InputBorder
            inputValue={inputValue}
            setInputValue={setInputValue}
            type="username"
            PlaceHolder="Username"
            icon={user}
            redicon={reduser}
            Border="#FEECFC40"
            Color="transparent"
            BorderSize={2}
            Regexp={RegUsername}
          />
        </div>
        <div className="w-full h-[45px]">
          <InputBorder
            inputValue={inputValue}
            setInputValue={setInputValue}
            type="email"
            PlaceHolder="Email"
            icon={Email}
            redicon={redEmail}
            Border="#FEECFC40"
            Color="transparent"
            BorderSize={2}
            Regexp={RegEmail}
          />
        </div>
        <div className="w-full h-[45px]">
          <InputBorder
            inputValue={inputValue}
            setInputValue={setInputValue}
            type="password"
            PlaceHolder="Password"
            icon={lock}
            redicon={redlock}
            Border="#FEECFC40"
            Color="transparent"
            BorderSize={2}
            Regexp={RegPassword}
          />
        </div>
        <div className="w-full h-[45px]">
          <InputBorder
            inputValue={inputValue}
            setInputValue={setInputValue}
            type="password"
            PlaceHolder="Confirme Password"
            icon={lock}
            redicon={redlock}
            Border="#FEECFC40"
            Color="transparent"
            BorderSize={2}
            Regexp={RegPassword}
          />
      </div>
      </form>
        <div>
          <SimpleButton
            onclick={() => RedirectionFunction("/SignIn")}
            content="Sign up"
          />
        </div>
      </div>
    </div>
  );
};

export default CardSignup;
