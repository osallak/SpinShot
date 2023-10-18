import email from "./../../../public/email.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux_tool";
import test1 from "../../../public/test1.svg";
import pc from "../../../public/pc.jpeg";
import ibenmain from "../../../public/issam_benmaina1_448x672.jpeg"
import parseJwt from "@/utils/parsJwt";
import { useRouter } from "next/router";

const ImageProfile = (props: any) => {
  const data = useAppSelector((state) => state.Profile);
  const [handelMous, setImage] = useState(false);
  const [image, setMyImage] = useState();
  const router = useRouter();

  const handleMouseEnter = () => {
    setImage(true);
  };

  const handleMouseLeave = () => {
    setImage(false);
  };

  const Open = () => {
    // setUpload(false);
    props.setOpenDialog(!props.open);
  };

  useEffect(() => {
    if (data.profile?.profile?.avatar) {
      const img = data.profile?.profile?.avatar;
      setMyImage(img);
    }
  }, [data]);

  console.log("image 2: ", props.myImage);

  return (
    <div
      className={` ${
        props.opne && props.width < 1024 ? "opacity-10" : ""
      }  rounded-[20px] flex flex-col items-center justify-center text-pearl text-opacity-40 w-full h-full ${
        props.isopen ? "pt-20 p-12" : "pt-20 p-14 c-14xl:p-16"
      } c-gb:w-[30%]   relative  overflow-hidden`}
    >
      <label
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={` rounded-3xl  ${
          props.isopen ? "w-[80px]" : "w-[120px]"
        } c-gb:w-[10rem] c-10xl:w-[15rem]  relative transition-all duration-300 hover:opacity-40  `}
      >
        {!props.id && <input type="" className="hidden " onClick={Open} />}
        <div className=" flex justify-center items-center bg-very-dark-purple rounded-3xl  overflow-hidden">
          {handelMous && (
            <div
              className={`  rounded-2xl  duration-300  flex justify-center items-center flex-col  transition-all absolute  `}
            >
              {!props.id && 
              <Image  src={email}  alt="" />}
            </div>
          )}
          {props.myImage ? (
            <picture className={` bg-cover w-28 h-28 c-gb:w-36  c-gb:h-36 c-14xl:h-64 c-14xl:w-64 `}>
              <img
                className=" rounded-2xl w-full h-full" //h-20 w-20 md:h-36 md:w-36	c-14xl:w-64 c-14xl:h-64
                src={props.myImage}
                width={150}
                height={150}
                alt=""
              />
            </picture>
          ) : (
            <picture className={` bg-cover w-28 h-28 c-gb:w-36  c-gb:h-36 c-14xl:h-64 c-14xl:w-64 `}>
              <img
                className=" rounded-2xl w-full h-full" //h-20 w-20 md:h-36 md:w-36	c-14xl:w-64 c-14xl:h-64
                src={image!}
                width={150}
                height={150}
                alt=""
              />
            </picture>
          )}
        </div>
      </label>
      <div className="flex flex-col items-center  py-4 ">
        <span>{props.username ? props.username : data?.profile?.username}</span>
        <span>{data.profile?.email}</span>
      </div>
    </div>
  );
};

export default ImageProfile;
