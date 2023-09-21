import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import Country from "@/Components/ui/Buttons/Country";
import React, { useState } from "react";
import { useAppDispatch } from "../../../redux_tool";
import axios from "axios";
import FormInput from "@/Components/ui/formInput/FormInput";

const PersonalInformation = (props: any) => {
  // const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const hendleUpdata = async () => {
    const my_data = new FormData();
    my_data.append("firstName", firstName);
    my_data.append("Lastname", lastName);
    my_data.append("Username", userName);
    my_data.append("Email", email);
    my_data.append("country", country);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    {
      e.target.name == "Firstname"
        ? setFirstName(e.target.value)
        : e.target.name == "Lastname"
        ? setLastName(e.target.value)
        : e.target.name == "Username"
        ? setUsername(e.target.value)
        : e.target.name == "Email"
        ? setEmail(e.target.value)
        : null;
    }
  };

  return (
    <div className="space-y-40  md:space-y-10 h-[910px]  ">
      <div className=" ">
        <div className="text-pearl text-[15px] sm:text-2xl md:h-52 h-32 flex items-center c-10xl:px-24 px-14">
          <span>Personal information</span>
        </div>
        <div className="flex flex-row justify-center px-4 sm:px-14  c-10xl:px-32 ">
          <div className="flex flex-col  text-pearl  w-full c-10xl:w-[80%] space-y-5 md:space-y-14  c-10xl:px-20 px-6 ">
            <div className="   c-10xl:space-x-[15%] w-full  ">
              <div className=" flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
                <div className="w-full md:w-[49%] ">
                  <FormInput
                    handleChange={handleChange}
                    name={"Firstname"}
                    placehold={"First name"}
                  />
                </div>
                <div className="w-full md:w-[49%] ">
                  <FormInput
                    handleChange={handleChange}
                    name={"Lastname"}
                    placehold={"Last name"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
              <div className="w-full md:w-[49%] ">
                <FormInput
                  handleChange={handleChange}
                  name={"Username"}
                  placehold={"Username"}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row   c-10xl:space-x-[15%] items-center">
              <div className=" w-full">
                <FormInput
                  handleChange={handleChange}
                  name={"Email"}
                  placehold={"Email"}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
              <div
                id={"my_element"}
                className=" bg-very-dark-purple w-[100%] md:w-[49%]  rounded-[20px] h-14 placeholder:text-pearl placeholder:text-opacity-40"
              >
                <Country setCountry={setCountry} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-40 flex md:justify-end  justify-center items-center px-24 sm:px-28 ">
        <SimpleButton content="Save" onclick={hendleUpdata} />
      </div>
    </div>
  );
};
export default PersonalInformation;
