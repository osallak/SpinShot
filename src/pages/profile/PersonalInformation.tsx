import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import Country from "@/Components/ui/Buttons/Country";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux_tool";
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
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  });
  /* */

  const patchProfile = async (data: any) => {

        // console.log("data :", data.get('name'));
    try {
      const response = await axios.patch(
        "http://e3r10p16.1337.ma:3001/api/v1/users/settings",
        data,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlZTc0NjRmLWNiNGEtNDE5YS05MjI5LTFlYjA4NjI0YjdmMSIsImVtYWlsIjoiaWJlbm1haW5AZ21haWwuY29tIiwidXNlciI6ImliZW5tYWluIiwiaWF0IjoxNjk0MTgwMzIwLCJleHAiOjE2OTUwNDQzMjB9.izG5Om77OBtyUCR-m5wtj5Hy8i6FnMXqn1vlSS-Xqss",
          },
        }
      );
      console.log("send");
    } catch (error) {
      console.error(error);
    }
  };

  /* */
  const my_data = new FormData();
  const handleChange = (e: any) => {
    my_data.append(e.target.name, e.target.value);
  };

  const hendleUpdata = () => {
    patchProfile(my_data);
  };

  return (
    <div className="space-y-52 md:space-y-10">
      <div className="  ">
        <div className="text-pearl text-[15px] sm:text-2xl md:h-60 h-32 flex items-center c-10xl:px-24 px-14">
          <span>Personal information</span>
        </div>
        <div className="flex flex-row justify-center px-4 sm:px-14 c-10xl:px-32 ">
          <div className="flex flex-col  text-pearl  w-full c-10xl:w-[80%] space-y-5 md:space-y-14  c-10xl:px-20 px-6 ">
            <div className="   c-10xl:space-x-[15%] w-full  ">
              <div className=" flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5 w-full c-10xl:w-full">
                <input
                  name="First_name"
                  className="bg-very-dark-purple w-full c-10xl:w-full  rounded-[20px] px-5 h-14 placeholder:text-pearl placeholder:text-opacity-40"
                  onChange={handleChange}
                  type=""
                  required
                  placeholder="First name"
                />
                <input
                  name="Last_name"
                  className="bg-very-dark-purple w-full c-10xl:w-full  rounded-[20px] px-5 h-14 placeholder:text-pearl placeholder:text-opacity-40"
                  onChange={handleChange}
                  type=""
                  required
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
              <div className=" w-full">
                <input
                  name="Username"
                  className="bg-very-dark-purple w-[100%] md:w-[49%]  rounded-[20px] px-5 h-14 placeholder:text-pearl placeholder:text-opacity-40"
                  onChange={handleChange}
                  type=""
                  required
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row   c-10xl:space-x-[15%] items-center">
              <div className=" w-full">
                <input
                  name="Email"
                  className="bg-very-dark-purple w-full  rounded-[20px] px-5 h-14 placeholder:text-pearl placeholder:text-opacity-40"
                  onChange={handleChange}
                  type=""
                  required
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
              <div className=" bg-very-dark-purple w-[100%] md:w-[49%]  rounded-[20px] h-14 placeholder:text-pearl placeholder:text-opacity-40">
                <Country />
              </div>
            </div>
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
