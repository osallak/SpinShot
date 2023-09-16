import ibenmain from "./../../../public/ibenmain.jpeg";
import email from "./../../../public/Email.svg";
import Image from "next/image";
import React, { useState } from "react";
import { useAppSelector } from "../../../redux_tool";

const ImageProfile = (props: any) => {
  const response = props.opne;
  const [handelMous, setImage] = useState(false);
  const [upload, setUpload] = useState(false);
  const [myImage, setMyImage] = useState<File | null>(null);
  const data = useAppSelector((state) => state.Profile);

  const handleMouseEnter = () => {
    setImage(true);
  };

  const handleMouseLeave = () => {
    setImage(false);
  };

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setUpload(true);
      setMyImage(event.target.files[0]);
    }
  };

  return (
    <div
      className={` ${
        response ? "opacity-10" : ""
      }  rounded-[20px] flex flex-col items-center justify-center text-pearl text-opacity-40 w-full p-20 c-gb:w-[30%] `}
    >
      {handelMous && (
        <div  className="absolute flex justify-center items-center flex-col transition-all ">
          <Image className={``} src={email} alt="" />
        </div>
      )}
      <label
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className=" rounded-3xl w-[120px]  c-gb:w-[10rem] c-10xl:w-[15rem]  relative transition-all duration-300 bg-white hover:opacity-40"
      >
        <input type="file" className="hidden" onChange={uploadToClient} />
        <div className=" flex justify-center items-center ">
          {upload ? (
            <img
              className={` rounded-[20px]`}
              src={URL.createObjectURL(myImage)}
              alt=""
            />
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
