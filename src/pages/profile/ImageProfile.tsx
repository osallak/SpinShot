import ibenmain from "./../../../public/ibenmain.jpeg";
import email from "./../../../public/Email.svg";
import Image from "next/image";
import React, { useState } from "react";
import { useAppSelector } from "../../../redux_tool";
import UploadImage from "../../Components/ui/UploadImage/UploadImage";

const ImageProfile = (props: any) => {

  const [handelMous, setImage] = useState(false);
  // const [open, setOpenDialog] = useState(false);
  const [upload, setUpload] = useState(false);
  const data = useAppSelector((state) => state.Profile);

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


  return (
    <div
      className={` ${
        (props.opne && props.width < 1024) ? "opacity-10" : ""
      }  rounded-[20px] flex flex-col items-center justify-center text-pearl text-opacity-40 w-full p-20 c-gb:w-[30%]  relative`}
    >
      {handelMous && (
        <div className=" flex justify-center items-center flex-col  transition-all absolute">
          <Image className={``} src={email} alt="" />
        </div>
      )}
      <label
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className=" rounded-3xl w-[120px]  c-gb:w-[10rem] c-10xl:w-[15rem]  relative transition-all duration-300 bg-white hover:opacity-40 "
      >
        <input type="" className="hidden" onClick={Open} />
        <div className=" flex justify-center items-center ">
          {upload ? (
            <picture>
              <img
                className={` rounded-[20px]`}
                src={URL.createObjectURL(props.myImage!)}
                alt=""
                />
            </picture>
          ) : (
            <Image className={` rounded-[20px]`} src={ibenmain} alt="" />
          )}
        </div>
      </label>
      <div className="flex flex-col items-center c-10xl:text-xl text-md">
        {/* <span>{data.profile.response?.user.firstName}</span> */}
        <span>ibenmain</span>
        <span>ibenmain@gmail.com</span>
      </div>
    </div>
  );
};

export default ImageProfile;
