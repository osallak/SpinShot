"use client";

import AcceptRejectButton from "@/Components/ui/Buttons/AcceptRejectButton";
import EmptyButton from "@/Components/ui/Buttons/EmptyButton";
import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import ContinueWithIntra from "@/Components/ui/Buttons/ContinueWithIntra";
import SwitchButton from "@/Components/ui/Buttons/SwitchButton";
import ToggleButton from "@/Components/ui/Buttons/ToggleButton";
import IconButton from "@/Components/ui/Buttons/IconButton";
import { ThemeProvider, Button, input } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useState } from "react";
export { ThemeProvider, Button };
import ExportChannels from "../../public/ExportChannels.svg";
import CreateChannel from "../../public/CreateChannel.svg";
import active from "../../public/active.svg";
import unactive from "../../public/unactive.svg";
import InputBorder from "@/Components/ui/Inputs/InputBorder";
import Email from "../../public/Email.svg";
import lock from "../../public/lock.svg";
import redlock from "../../public/redlock.svg";
import user from "../../public/user.svg";
import reduser from "../../public/reduser.svg";
import redemail from "../../public/redemail.svg";
import Signup from "./Signup";

const RegPassword = /^.{6,}$/;
const RegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RegUsername = /^[a-zA-Z0-9_.]{3,16}$/;

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const Router = useRouter();
  const RedirectionFunction = (Path: string) => {
    Router.push(Path);
  };
  return (
    <ThemeProvider>
      <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-row justify-evenly items-center ">
        <Signup />
      </div>
    </ThemeProvider>
  );
};
export default Home;
