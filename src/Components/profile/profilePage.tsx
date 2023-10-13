import React, { useState, useEffect } from "react";
import SubSidebar from "../ui/profileSubsidebar/subSidebar";
import ImageProfile from "./imageProfile";
import Levle from "./level";
import PersonalInformation from "./personalInformation";
import Achievements from "./userAchievements.tsx/achievements";
import MatchHistory from "./userMatchHistory/matchHistory";
import ResetPassword from "./resetPassword";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import SideBar from "../ui/folderSidebar/sideBar";
import SubsidebarSecond from "../ui/profileSubsidebar/subsidebarSecond";
import SidebarMobile from "../ui/folderSidebar/sidebarMobile";
import NavbarMobile from "../ui/FolderNavbar/navbarMobile";
import TowFactor from "../ui/twoFactorauth/twoFactor";
import UploadImage from "../ui/folderUploadImage/uploadImage";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const [isopen, setMenu] = useState(false);
  const [valid, setValid] = useState(false);
  const [opened, setOpned] = useState(false);
  const [content, setContent] = useState("Personal_Information");
  const [password, setPassword] = useState(false);
  const [pages, setPages] = useState("");
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.Profile);
  const [isActive, setisActive] = useState(false);
  const [open, setOpenDialog] = useState(false);
  const [upload, setUpload] = useState(false);
  const [myImage, setMyImage] = useState<File | null>();
  const [width, setWidth] = useState<number>();
  const [chosUesrname, setChose] = useState("");
console.log("my usernamre ", chosUesrname);
  const Router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getProfile());
      setChose(data?.profile?.username);
      handleResize();
      setValid(true);
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    } else {
      Router.push("/Signin");
      return;
    }
  }, [dispatch]);

  const handleClick = (route: string) => {
    {
      route == "/profile" ? 
      setOpned(true):Router.push(route);
    }
    setPages(route)
  };

  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <>
      {valid && (
        <div
          className={
            "bg-very-dark-purple w-full h-full c-gb:w-screen c-gb:h-screen font-semibold font-Poppins text-xs sm:text-lg overflow-auto  min-w-[280px]"
          }
        >
          <div className={` flex flex-row p-2 w-full h-full `}>
            <div className="fixed h-full pb-4 ">
              <SideBar />
            </div>
            <SubSidebar
              setContent={setContent}
              setPassword={setPassword}
              isActive={isActive}
              setisActive={setisActive}
            />
            {isopen && (
              <SidebarMobile
                handleClick={handleClick}
                setOpned={setOpned}
                opened={opened}
              />
            )}
            <div
              className={`  ${
                (isopen && !isActive && !open) || (isopen && !open && !isActive)
                  ? width! > 720
                    ? ""
                    : "ml-[65px]"
                  : ""
              } w-full  rounded-[20px] c-gb:ml-3  `}
            >
              <NavbarMobile
                setMenu={setMenu}
                handleMenu={handleMenu}
                isopen={isopen}
              />
              <div className="flex flex-col  c-gb:h-full   overflow-auto ml-0 md:ml-[105px] c-gb:ml-0 ">
                <div className="rounded-[20px] c-gb:flex c-gb:flex-row  ">
                  <ImageProfile
                    isopen={isopen}
                    opne={opened}
                    setOpenDialog={setOpenDialog}
                    width={width}
                    username={chosUesrname}
                  />
                  {open ? (
                    <UploadImage
                      upload={upload}
                      setUpload={setUpload}
                      open={open}
                      Switch={setOpenDialog}
                    />
                  ) : null}
                  <Levle opne={opened} width={width} />
                </div>
                <div
                  className={` ${
                    opened && width! < 1024
                      ? "backdrop:blur  bg-white/10 opacity-10"
                      : "backdrop:blur  bg-white/10"
                  } flex flex-auto flex-col rounded-[20px] w-full mt-2  h-[1200px] c-gb:h-[800px] `}
                >
                  {content == "Personal_Information" ? (
                    <PersonalInformation isopen={isopen} myImage={myImage} setChose={setChose}/>
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
            <div className="bg-white flex items-center">
            </div>
            {opened && pages == "/profile" && (
              <SubsidebarSecond
                isActive={isActive}
                setisActive={setisActive}
                setContent={setContent}
                setPassword={setPassword}
              />
            )}
            {isActive && (
              <div className="z-50">
                <TowFactor isActive={isActive} Switch={setisActive} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
