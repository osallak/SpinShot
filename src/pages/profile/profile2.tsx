import Image from "next/image";
import React, { useState, useEffect, useContext, useRef } from "react";
import Subsidebar from "../../Components/ui/Subsidebar/Subsidebar2";
import ibenmain from "./../../../public/ibenmain.jpeg";
import menu from "./../../../public/menu.svg";
import ImageProfile from "./ImageProfile";
import Levle from "./Levle";
import { SidbarIcon } from "@/Components/ui/DropDown/ArrayIcon";
import PersonalInformation from "./PersonalInformation";
import MatchHistory from "./MatchHistory";
import Achievements from "./Achievements";
import ResetPassword from "./ResetPassword";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import SideBar from "@/Components/ui/Sidebar/SideBar";
import SubsidebarSecond from "../../Components/ui/Subsidebar/SubsidebarSecond";

const profile2 = () => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const [content, setContent] = useState("Personal_Information");
  const user = useSelector((state: any) => state.Data);
  const [password, setPassword] = useState(false);
  const [pages, setPages] = useState("Profile");
  const user1 = useSelector((state: any) => state.Data);
  const dispatch = useAppDispatch();
  const profile_data = useAppSelector((state) => state.Profile);

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 p-3 space-x-0 flex justify-start items-center flex-row ">
      <SideBar />
      <Subsidebar/>
      <div className=" h-full rounded-2xl w-full flex flex-col overflow-auto space-y-72 c-gb:space-y-3">
      <div className="h-[400px]  c-gb:flex c-gb:flex-row">
          <ImageProfile opne={0} />
          <Levle opne={0} />
      </div>
      <div className=" flex backdrop:blur  bg-white/10   flex-col rounded-[20px] w-full mt-2 border h-[940px] ">
      {"Personal_Information" == "Personal_Information" ? (
        <PersonalInformation />
      ) : content == "Achievements" ? (
        <Achievements />
      ) : content == "Match_History" ? (
        <MatchHistory />
      ) : content == "Security" ? (
        password == true ? (
          <ResetPassword />
        ) : null
      ) : null}
      </div>
      </div>
    </div>
  )
}

export default profile2