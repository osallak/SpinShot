import Image from "next/image";
import React, { useState, useEffect } from 'react'
import axios from "axios"
import Sidebar from "../../Components/ui/Sidebar/sidebar"
import SubSidebar from "../../Components/ui/Subsidebar/SubSidebar"
import ibenmain from "./../../../public/ibenmain.jpeg"
import menu from "./../../../public/menu.svg"
import ImageProfile from "./ImageProfile"
import ContentProfile from "./ContentProfile";
import Levle from "./Levle";
import { SidbarIcon } from "@/Components/ui/DropDown/ArrayIcon"

interface objType {
    body : string
    id : number,
    title : string, 
    userId : number,
}

const Profile = () => {
    const [isopen, setMenu] = useState(false);
    const [response, setResponse] = useState<objType[]>([]);
    const[loader , setLoader] = useState<boolean>(false);
    const [height, setHeight] = useState<number | undefined>(undefined)
    useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setHeight(window.innerHeight);
      };
      setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
    const fetchaxios = async () => {
        setLoader(false);
        const respo = await axios.get('https://jsonplaceholder.typicode.com/posts' )
        console.log(respo.data);
        console.log(respo.data[3].id);
        setResponse(respo.data)
        setLoader(true);
    }
    useEffect(() => {
        fetchaxios();
    }, [])
    return (
        <>
        {loader && (
            <div className={`w-[100%] flex flex-row items-center `}>
            <div className={`w-full flex flex-row c-gb:space-x-2 p-1 c-gb:p-2 `}>
            <Sidebar />
            <SubSidebar/>
            {isopen && (
                <div  className=" fixed  w-[50px] sm:w-[100px] h-[1528px] c-gb:h-[1320px]  backdrop:blur  bg-white/10 c-gb:hidden block rounded-[20px] mr-1">
                    <div className=" space-y-6 mt-2  ">
                        {SidbarIcon.map((Icon, index) => (
                            <div key={index} className="flex justify-center items-center opacity-40   m-2">
                                <button><Image src={Icon.icon} alt="" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className={` ${isopen ? "ml-[55px] sm:ml-[105px]" : ""} w-full  rounded-[20px] `}>
                <div className={`${isopen ? "w-[85%]" : "w-full"} block c-gb:hidden fixed  backdrop:blur bg-white/10 rounded-[20px]  h-16  overflow-hidden`}>
                    <div className="flex flex-row px-4 justify-between">
                        <button className=" block c-gb:hidden " onClick={() => setMenu(!isopen)}>
                            <Image src={menu} alt="" />
                        </button>
                        <div className=" flex justify-end items-center space-x-2">
                            <div className="flex flex-col justify-end items-end text-pearl text-opacity-40">
                                <span>ibenmain</span>
                                <div className="hidden sm:block">
                                    <span>ibenmain@gmail.com</span>
                                </div>
                            </div>
                            <Image className=" rounded-full w-[50px]" src={ibenmain} alt="" />
                        </div>
                    </div>
                </div>
                <div className="rounded-[20px] c-gb:flex c-gb:flex-row flex flex-col ">
                    <ImageProfile response={response}/>
                    <Levle />
                </div>
                <div className=" backdrop:blur bg-white/10 rounded-[20px] c-gb:w-full mt-2  w-full grow space-y-10 md:space-y-32 h-[960px]  c-11xl:h-[870px] ">
                    <ContentProfile/>
                </div>
            </div>
        </div>
        </div>
        )}
        </>
       
    );
}
export default Profile;