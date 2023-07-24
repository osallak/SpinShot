"use client";

import InputBorder from "@/Components/ui/Inputs/InputBorder";
import { ThemeProvider, Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
export { ThemeProvider, Button };
import Email from "../../public/Email.svg"
import lock from "../../public/lock.svg"

const Home = () => {
  const Router = useRouter();
  const RedirectionFunction = (Path: string) => {
    Router.push(Path);
  };
  return (
    <ThemeProvider>
      <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex justify-evenly items-center ">
        <div className="md:w-1/5 md:h-1/2 w-full h-full backdrop-blur flex justify-center items-center flex-col space-y-4 md:rounded-xl rounded-none bg-gradient-to-br from-gradiant-white to-gradiant-white">
          <InputBorder type="string" content="Username or Email" icon={Email} Width={80} Border="pearl" Color="transparent" BorderSize={2} />
          <InputBorder type="password" content="Password" icon={lock} Width={96} Border="none" Color="very-dark-purple" BorderSize={0} />
          <InputBorder type="password" content="Password" icon={lock} Width={96} Border="none" Color="very-dark-purple" BorderSize={0} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home
