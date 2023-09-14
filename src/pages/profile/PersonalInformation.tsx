import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import Country from "@/Components/ui/Buttons/Country";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux_tool";
import { Information } from "@/Components/ui/DropDown/ArrayIcon";
import axios from "axios";
import { types } from "util";
import myData from "./myData";

type MyType = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
};
const PersonalInformation = (props: any) => {
  const dispatch = useAppDispatch();
  const [myinput, setInput] = useState("");

  /* */

  const hendleUpdata = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const my_data = new FormData();
    my_data.append("firstName", myinput);

    try {
      const response = await axios.patch(
        "http://34.173.232.127/api/v1/users/settings",
        my_data,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0N2UwYzQ5LTFmODctNDhlYy1hZmM5LTM5ZjcyYTI3YTBmZCIsImVtYWlsIjoiaWJlbm1haW5AZ21haWwuY29tIiwidXNlciI6ImliZW5tYWluIiwiaWF0IjoxNjk0NTE1NDIwLCJleHAiOjE2OTUzNzk0MjB9.Xjyys9uePoq40e_yJG32r0FxyBajRBCWo1YbmmgxUCg",
          },
        }
      );
      console.log("data :", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  /* */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="space-y-52 md:space-y-10 h-[940px]  ">
      <div className="  ">
        <div className="text-pearl text-[15px] sm:text-2xl md:h-60 h-32 flex items-center c-10xl:px-24 px-14">
          <span>Personal information</span>
        </div>
        <div className="flex flex-row justify-center px-4 sm:px-14 c-10xl:px-32 ">
          <div className="flex flex-col  text-pearl  w-full c-10xl:w-[80%] space-y-5 md:space-y-14  c-10xl:px-20 px-6 ">
            {Information.map((option) => (
              <div key={option.id}>
                {option.text == "country" ? (
                  <div className={`${"w-[100%] md:w-[49%]"} `}>
                    {" "}
                    <Country />
                  </div>
                ) : option.text != "country" && option.text != "avatar" ? (
                  <input
                    name={option.text}
                    className={`bg-very-dark-purple  ${
                      option.text != "Email" ? "w-[100%] md:w-[49%]" : "w-full"
                    }  rounded-[20px] px-5 h-14 placeholder:text-pearl placeholder:text-opacity-40`}
                    onChange={handleChange}
                    type=""
                    required
                    placeholder={option.text}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="top-28 flex md:justify-end md:right-0 mt-10 justify-center px-28">
        <SimpleButton content="Save" onclick={hendleUpdata} />
      </div>
    </div>
  );
};

export default PersonalInformation;
