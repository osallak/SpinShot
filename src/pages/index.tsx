"use client";

import AcceptRejectButton from "@/Components/ui/Buttons/AcceptRejectButton";
import EmptyButton from "@/Components/ui/Buttons/EmptyButton";
import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import ContinueWithIntra from "@/Components/ui/Buttons/ContinueWithIntra";
import SwitchButton from "@/Components/ui/Buttons/SwitchButton";
import ToggleButton from "@/Components/ui/Buttons/ToggleButton";
import PasswordButton from "@/Components/ui/Buttons/PasswordButton";
// import InputBorder from "@/Components/ui/Inputs/InputBorder";
import IconButton from "@/Components/ui/Buttons/IconButton";
import { ThemeProvider, Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useState } from "react";
export { ThemeProvider, Button };
import ExportChannels from "../../public/ExportChannels.svg";
import CreateChannel from "../../public/CreateChannel.svg";
import active from "../../public/active.svg";
import unactive from "../../public/unactive.svg";

const Home = () => {
  const Router = useRouter();
  const [isState, setState] = useState(false);
  const RedirectionFunction = (Path: string) => {
    Router.push(Path);
  };
  const ShowHidePassword = () => {
      setState((isState) => !isState);
  }
  return (
    <ThemeProvider>
      <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex justify-center items-center ">
        <div className="w-1/2 h-full flex justify-center items-center flex-col space-y-12">
          <SimpleButton
            onclick={() => {
              RedirectionFunction("/SignIn");
            }}
            content="Get Started"
          />
          <SimpleButton
            onclick={() => {
              RedirectionFunction("/SignIn");
            }}
            content="Sign in"
          />
          <EmptyButton
            onclick={() => {
              RedirectionFunction("/SignIn");
            }}
            content="Sign in"
          />
          <ContinueWithIntra
            onclick={() => {
              RedirectionFunction("/Enter");
            }}
            content="Continue with intra"
          />
          <div className="flex space-x-2 flex-row">
            <IconButton
              onclick={() => {
                RedirectionFunction("/Enter");
              }}
              content="Create channel"
              icon={CreateChannel}
            />
            <IconButton
              onclick={() => {
                RedirectionFunction("/Enter");
              }}
              content="Explore channels"
              icon={ExportChannels}
            />
          </div>
          <SwitchButton />
          {/* <ToggleButton /> */}
          <div className="w-12 h-7 flex flex-row justify-center items-center space-x-1">
            <AcceptRejectButton onclick={ () => RedirectionFunction("/Enter") } content={active} />
            <AcceptRejectButton onclick={ () => RedirectionFunction("/Enter") } content={unactive} />
          </div>
          <PasswordButton />
        </div>
        {/* <div className="w-1/2 h-full flex justify-center items-center ">
          <InputBorder />
        </div> */}
      </div>
    </ThemeProvider>
  );
}

export default Home
