import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import Country from "@/Components/ui/Buttons/country";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";
import axios from "axios";
import FormInput from "@/Components/ui/formInput/FormInput";

const PersonalInformation = (props: any) => {
  // const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.Profile);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const hendleUpdata = async () => {
    const my_data = new FormData();
    my_data.append("firstName", firstName);
    my_data.append("lastName", lastName);
    my_data.append("username", userName);
    my_data.append("country", country);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        "http://e3r10p13.1337.ma:3000/users",
        {
          my_data
        },
        {
          headers: {
            Authorization:
              `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikplc3N5Y2FfTHluY2giLCJzdWIiOiIxYjIyNzk5My02ZmI3LTRmMDgtOGNmNC04OTliNzQ1YmZiMjYiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5Njg4MTcxNSwiZXhwIjoxNjk2OTY4MTE1fQ.BcphZxRWilg2GouIL5FzDEo4Tkayqx8L_bQfPicaPPQ`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    {
      e.target.name == "firstName"
        ? setFirstName(e.target.value)
        : e.target.name == "lastName"
        ? setLastName(e.target.value)
        : e.target.name == "username"
        ? setUsername(e.target.value)
        : e.target.name == "email"
        ? setEmail(e.target.value)
        : null;
    }
  };


  return (
    <div className="space-y-40  md:space-y-10 h-[910px]  ">
      <div className=" ">
        <div className="text-pearl text-[15px] sm:text-2xl md:h-52 h-32 flex items-center c-10xl:px-24 px-8 sm:px-14">
          <span>Personal information</span>
        </div>
        <div className="flex flex-row justify-center px-4 sm:px-14  c-10xl:px-32 ">
          <div className="flex flex-col  text-pearl  w-full c-10xl:w-[80%] space-y-5 md:space-y-14  c-10xl:px-20  ">
            <div className="   c-10xl:space-x-[15%] w-full  ">
              <div className=" flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
                <div className="w-full md:w-[49%] ">
                  <FormInput
                    handleChange={handleChange}
                    name={"firstName"}
                    placehold={"First name"}
                  />
                </div>
                <div className="w-full md:w-[49%] ">
                  <FormInput
                    handleChange={handleChange}
                    name={"lastName"}
                    placehold={"Last name"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
              <div className="w-full md:w-[49%] ">
                <FormInput
                  handleChange={handleChange}
                  name={"username"}
                  placehold={"Username"}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row   c-10xl:space-x-[15%] items-center">
              <div className=" w-full">
                <input
                  className=" bg-very-dark-purple w-full rounded-[20px] px-5 h-14 placeholder:text-pearl placeholder:text-opacity-40 outline-none"
                  disabled
                  placeholder={data.profile?.email}
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
      <div className=" h-12 flex md:justify-end  justify-center items-center sm:px-28 ">
        <div className={`  w-24 sm:w-32  h-full`}>
        <SimpleButton content="Save" onclick={hendleUpdata} />
        </div>
      </div>
    </div>
  );
};
export default PersonalInformation;
