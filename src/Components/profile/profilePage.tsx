import React, { useState, useEffect } from "react";
import SubSidebar from "../ui/Subsidebar/subSidebar";
import ImageProfile from "./imageProfile";
import Levle from "./level";
import PersonalInformation from "./personalInformation";
import MatchHistory from "./matchHistory";
import Achievements from "./achievements";
import ResetPassword from "./resetPassword";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import SideBar from "../ui/Sidebar/sidebar";
import SubsidebarSecond from "../ui/Subsidebar/subsidebarSecond";
import SidebarMobile from "../ui/Sidebar/SidebarMobile";
import NavbarMobile from "../ui/Navbar/navbarMobile";
import TowFactor from "../ui/TowFactorauth/towFactor";
import UploadImage from "../ui/UploadImage/uploadImage";

const ProfilePage = () => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const [content, setContent] = useState("Personal_Information");
  const user = useSelector((state: any) => state.Data);
  const [password, setPassword] = useState(false);
  const [pages, setPages] = useState("profile");
  const user1 = useSelector((state: any) => state.Data);
  const dispatch = useAppDispatch();
  const profile_data = useAppSelector((state) => state.Profile);
  const [isActive, setisActive] = useState(false);
  const [open, setOpenDialog] = useState(false);
  const [upload, setUpload] = useState(false);
  const [myImage, setMyImage] = useState<File | null>();
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    dispatch(getProfile());
    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
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

  // useEffect(() => {
  //   handleResize();
  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('resize', handleResize);
  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }

  // }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
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
            handleClick={() => handleClick}
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
                <PersonalInformation isopen={isopen} myImage={myImage} />
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
  );
};

export default ProfilePage;
