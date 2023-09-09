import Image from "next/image";
import React, { useState, useEffect, useContext, useRef } from "react";
import Sidebar from "../../Components/ui/Sidebar/sidebar";
import SubSidebar from "../../Components/ui/Subsidebar/SubSidebar";
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
import { count } from "console";
import { useRouter } from "next/router";

interface objType {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const Profile = () => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const [content, setContent] = useState("Personal_Information");
  const user = useSelector((state:any) => state.Data)
  const [password, setPassword] = useState(false);
  const [pages, setPages] = useState("Profile");
  const user1 = useSelector((state:any) => state.Data)
  const dispatch = useAppDispatch();
  const profile_data = useAppSelector((state) => state.Profile);

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])
  return (
    <>
        <div className={`w-[100%] flex flex-row items-center `}>
          <div className={`w-full flex flex-row c-gb:space-x-2 `}>
            <Sidebar/>
            <SubSidebar setContent={setContent} setPassword={setPassword}/>
            {isopen && (
              <div className=" fixed  w-[80px] h-full c-gb:h-full  backdrop:blur  bg-white/10 c-gb:hidden block rounded-[20px] mr-1">
                <div className=" space-y-6 mt-2  ">
                  {SidbarIcon.map((Icon, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center opacity-40 m-2"
                    >
                      <button className={``} onClick={() => {opened == false ? setOpned(true) : setOpned(false)}}>
                        <Image src={Icon.icon} alt="" />
                      </button>
                    </div>
                  ))}

                </div>
              </div>
            )}
            <div
              className={` ${
                isopen ? "ml-[83px] " : ""
              } w-full  rounded-[20px] `}
            >
              <div
                className={`${
                  isopen ? "w-[91%] " : "w-[99%]"
                } block c-gb:hidden fixed  backdrop:blur bg-white/10 rounded-[20px]  h-16`}
              >
                <div className="flex flex-row px-4 justify-between">
                  <button
                    className=" block c-gb:hidden "
                    onClick={() => setMenu(!isopen)}
                  >
                    <Image src={menu} alt="" />
                  </button>
                  <div className=" flex justify-end items-center space-x-2">
                    <div className="flex flex-col justify-end items-end text-pearl text-opacity-40">
                      {/* <span>{profile_data.profile.response?.loggedUser.userName}</span> */}
                      <span>ibenmain</span>
                      <div className="hidden sm:block">
                        {/* <span>{profile_data.profile.response?.user.email}</span> */}
                        <span>ibenmaina@gmail.com</span>
                      </div>
                    </div>
                    <Image
                      className=" rounded-full w-[50px]"
                      src={ibenmain}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="rounded-[20px] c-gb:flex c-gb:flex-row ">
                  {/* <ImageProfile response={profile_data.profile.response} /> */}
                  <ImageProfile />
                  <Levle />
                </div>
                <div className=" backdrop:blur flex flex-auto flex-col bg-white/10 rounded-[20px] c-gb:w-full mt-2  w-full  space-y-10 md:space-y-32 ">
                  { content == "Personal_Information" ? (
                        <PersonalInformation/>
                    ) : content == "Achievements" ? (
                        <Achievements/>
                    ) : content == "Match_History" ? (
                        <MatchHistory/>
                    ): content == "Security" ? (password == true ?  <ResetPassword/> : null) : null }
                </div>
              </div>
            </div>
            {opened && (
                    <div className=" fixed top-[70px] ml-[83px] w-[70%] z-50  h-full c-gb:h-full  backdrop:blur  bg-white/10 c-gb:hidden block rounded-[20px] mr-1">
                    </div>
                  )}
          </div>
        </div>
    </>
  );
};
export default Profile;
