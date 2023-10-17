"use client";
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
import UploadImage from "../ui/folderUploadImage/uploadImage";
import { useRouter } from "next/router";
import TwoFactor from "../ui/twoFactorauth/TwoFactorAuth";
import parseJwt from "@/utils/parsJwt";
import { buttonsUser } from "@/Components/ui/FolderDropDown/ArrayIcon";
import { buttons } from "@/Components/ui/FolderDropDown/ArrayIcon";
import { SignOut, letPlay } from "@/Components/ui/FolderDropDown/ArrayIcon";
import Search from "../search/userSearch";

const ProfilePage = (props: { id: any }) => {
  const [isopen, setMenu] = useState(false);
  const [valid, setValid] = useState(false);
  const [opened, setOpned] = useState(false);
  const [content, setContent] = useState("Personal_Information");
  const [password, setPassword] = useState(false);
  const [pages, setPages] = useState("");
  const dispatch = useAppDispatch();
  const [isActive, setisActive] = useState(false);
  const [open, setOpenDialog] = useState(false);
  const [upload, setUpload] = useState(false);
  const [width, setWidth] = useState<number>();
  const [myImage, setMyImage] = useState<File | null>();
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [opp, setId] = useState(false);
  const [table, setTable] = useState<Type[]>([]);
  const [table2, setTable2] = useState<TypePlay[]>([]);
  const [isClick, setClick] = useState(false);


  interface Type {
    id: number;
    text: string;
    route: string;
  }

  interface TypePlay {
    icon: any;
    name: string;
  }
  
  
  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    const { id } = router.query;
    if (!token) {
      router.push("/Signin");
      return;
    }
    try {
      await dispatch(getProfile(id)).unwrap();
      router.push(`/profile/${id}`);
      setValid(true);
    } catch (error) {
      console.log(error);
      return;
    }
  };


  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };
  
console.log(router.query.id)

  const swetshProfile = (tab: Type[], play: TypePlay[]) => {
    setTable(tab);
    setTable2(play);
  };
  
  const usersearched = (tab: Type[], play: TypePlay[]) => {
    setTable2(play);
    setTable(tab);
  };
  
  const handleResize = () => {
    {
      router.query.id ===
      parseJwt(JSON.stringify(localStorage.getItem("token"))).sub
      ? usersearched(buttonsUser, SignOut)
      : swetshProfile(buttons, letPlay);
    }
    setWidth(window.innerWidth);
  };
  
  useEffect(() => {
    if (router.isReady) {
      handleSearch();
      handleResize();
      setClick(false);
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }
  }, [dispatch, router.isReady, router.query.id]);
  
  return (
    <>
        <div
          className={
            "bg-very-dark-purple w-full h-full c-gb:w-screen c-gb:h-screen font-semibold font-Poppins text-xs sm:text-lg overflow-auto  min-w-[280px] p-1"
          }
        >
          <div className={` flex flex-row p-1 w-full h-full `}>
            <div className="fixed h-full pb-4 ">
              <SideBar  />
            </div>
            <SubSidebar
              setContent={setContent}
              setPassword={setPassword}
              isActive={isActive}
              setisActive={setisActive}
              table={table}
              isClick={isClick}
              setClick={setClick}
          
            />
            {isopen && (
              <SidebarMobile
                // handleClick={handleClick}
                setOpned={setOpned}
                opened={opened}
                // setSearch={setSearch}
                setPages={setPages}
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
                <div className="rounded-[20px] c-gb:flex c-gb:flex-row ">
                  <ImageProfile
                    isopen={isopen}
                    opne={opened}
                    setOpenDialog={setOpenDialog}
                    width={width}
                    username={username}
                    myImage={myImage}
                  />
                  {open ? (
                    <UploadImage
                      upload={upload}
                      setUpload={setUpload}
                      open={open}
                      Switch={setOpenDialog}
                      setMyImage={setMyImage}
                    />
                  ) : null}
                  <Levle opne={opened} width={width} letPlay={table2} />
                </div>
                <div
                  className={` ${
                    opened && width! < 1024
                      ? "backdrop:blur  bg-white/10 opacity-10"
                      : "backdrop:blur  bg-white/10"
                  } flex flex-auto flex-col rounded-[20px] w-full mt-2  h-[1200px] c-gb:h-[800px] `}
                >
                  {content == "Personal_Information" && table.length > 2 ? (
                    <PersonalInformation
                      isopen={isopen}
                      myImage={myImage}
                      setUsername={setUsername}
                    />
                  ) : content == "Achievements"  ? (
                    <Achievements />
                  ) : content == "Match_History" ? (
                    <MatchHistory />
                  ) : content == "Security" && table.length > 2 ? (
                    password == true ? (
                      <ResetPassword />
                    ) : null
                  ) : null}
                </div>
              </div>
            </div>
            <div className="bg-white flex items-center"></div>
            {opened && pages == "/profile" && (
              <SubsidebarSecond
                isActive={isActive}
                setisActive={setisActive}
                setContent={setContent}
                setPassword={setPassword}
                table={table}
              />
            )}
            {isActive && (
              <div>
                <TwoFactor isActive={isActive} Switch={setisActive} />
              </div>
            )}
          </div>
        </div>
    </>
  );
};

export default ProfilePage;
