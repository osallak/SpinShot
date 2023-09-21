import React, { useState, useEffect } from "react";
import SubSidebar from "../../Components/ui/Subsidebar/SubSidebar";
import ImageProfile from "./ImageProfile";
import Levle from "./Levle";
import PersonalInformation from "./PersonalInformation";
import MatchHistory from "./MatchHistory";
import Achievements from "./Achievements";
import ResetPassword from "./ResetPassword";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import SideBar from "@/Components/ui/Sidebar/SideBar";
import SubsidebarSecond from "../../Components/ui/Subsidebar/SubsidebarSecond";
import SidebarM from "@/Components/ui/Sidebar/SidebarMobile";
import NavbarMobile from "@/Components/ui/Navbar/NavbarMobile";
import { IdDeviceBreakpointsByWidth } from "@/Components/ui/DropDown/ArrayIcon";
import TowFactor from "@/Components/ui/TowFactorauth/TowFactor";

const Profile = () => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const [content, setContent] = useState("Personal_Information");
  const user = useSelector((state: any) => state.Data);
  const [password, setPassword] = useState(false);
  const [pages, setPages] = useState("Profile");
  const user1 = useSelector((state: any) => state.Data);
  const dispatch = useAppDispatch();
  const profile_data = useAppSelector((state) => state.Profile);
  const [isActive, setisActive] = useState(false);


  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleClick = (a: boolean, route: string | undefined) => {
    setOpned(a);
    {
      route ? setPages(route) : null;
    }
  };

  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };

  return (
    <div className={"bg-very-dark-purple w-full h-full"}>
      <div className={` flex flex-row c-gb:space-x-2 p-2 w-screen h-screen`}>
        <SideBar />
        <SubSidebar setContent={setContent} setPassword={setPassword} />
        {isopen && (
          <SidebarM
            handleClick={handleClick}
            setOpned={setOpned}
            opened={opened}
          />
        )}
        <div
          className={`${(isopen && !isActive) ? "ml-[83px]" : ""} w-full  rounded-[20px]  `}
        >
          <NavbarMobile
            setMenu={setMenu}
            handleMenu={handleMenu}
            isopen={isopen}
          />
          <div className="flex flex-col  c-gb:h-full   overflow-auto ">
            <div className="rounded-[20px] c-gb:flex c-gb:flex-row  ">
              <ImageProfile opne={opened} />
              <Levle opne={opened} />
            </div>
            <div
              className={` ${
                opened
                  ? "backdrop:blur  bg-white/10 opacity-10"
                  : "backdrop:blur  bg-white/10"
              } flex flex-auto flex-col rounded-[20px] w-full mt-2  h-[1200px]  c-gb:h-[960px]`}
            >
              {content == "Personal_Information" ? (
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
        {opened && pages == "/profile/profile" && (
          <SubsidebarSecond isActive={isActive} setisActive={setisActive} setContent={setContent} setPassword={setPassword} />
        )}
        {isActive &&
          <div className="z-50">
            <TowFactor isActive={isActive} Switch={setisActive}/>
          </div>}
      </div>
    </div>
  );
};

export default Profile;
