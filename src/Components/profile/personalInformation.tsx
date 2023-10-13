import SimpleButton from "@/Components/ui/buttons/simpleButton";
import Country from "@/Components/ui/Buttons/Country";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux_tool";
import axios from "axios";
import FormInput from "@/Components/ui/formInput/FormInput";
import ip from "@/endpoint/api";
import toast, { Toaster } from "react-hot-toast";
import test from "node:test";
import { json } from "stream/consumers";

const PersonalInformation = (props: any) => {
  // const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.Profile);
  const [country, setCountry] = useState("");

  // const parseinInput = () => {
  //   const namePattern = /^[A-Za-z\s]+$/;
  //   if (!namePattern.test(firstName)) return 1;
  //   else if (!namePattern.test(lastName)) return 1;
  //   else if (!namePattern.test(userName)) return 1;
  //   return 0;
  // };

  const [form, setForm] = useState<any>({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    country: null,
  });

  const hendleUpdata = async () => {
    {form.username ? props.setChose(form.username) : null}
    try {
      const token = localStorage.getItem("token");
      country ? form["country"] = country : form["country"] = null ;
      console.log( "my form ", form);
      Object.keys(form).forEach(key => {
        if (!form[key])
          delete(form[key]);
      });
      console.log("req ",form);
      const response = await axios.patch(`${ip}/users`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("res ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event ",e.target.name);
    console.log("event ",e.target.value);
    setForm((prev: any) => {
      prev[e.target.name] = e.target.value == "" ? null : e.target.value;
      return prev;
    });
  };

  // const notify = () => {
  //   toast.error("Input incorrect ");
  // };

  useEffect (() => {
    console.log("value : ",data.profile?.profile?.name?.govenName);
    if (data.profile){
      console.log('data : ', data.profile.profile ? 'true' : 'false');
      const tmp = {firstName : data.profile?.profile?.name?.givenName, lastName : data.profile?.profile?.name.lastName, username : data.profile?.username, email:data.profile.email , country: data?.profile?.profile?.country }
      setForm(tmp);
    }
  }, [data.profile])

  return (
    <div className="space-y-52  md:space-y-14 h-[910px]  ">
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
                    placehold={form.firstName ? form.firstName : "firstName"}
                    // value={form.firstName}
                    />
                </div>
                <div className="w-full md:w-[49%] ">
                  <FormInput
                    handleChange={handleChange}
                    name={"lastName"}
                    placehold={form.lastName ? form.lastName : "lastName"}
                    // value={form.lastName}
                    />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
              <div className="w-full md:w-[49%] ">
                <FormInput
                  handleChange={handleChange}
                  name={"username"}
                  placehold={form.username ? form.username : "username"}
                  // value={form.username}
                  />
              </div>
            </div>
            <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row   c-10xl:space-x-[15%] items-center">
              <div className=" w-full">
                <input
                  className=" bg-very-dark-purple w-full rounded-[20px] px-5 h-14 placeholder:text-pearl placeholder:text-opacity-40 outline-none"
                  disabled
                  placeholder={form.email}
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
      {/* <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div> */}
    </div>
  );
};

export default PersonalInformation;
