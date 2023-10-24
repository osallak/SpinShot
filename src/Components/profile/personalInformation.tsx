"use client";
import Country from "@/Components/ui/Buttons/Country";
import SimpleButton from "@/Components/ui/Buttons/simpleButton";
import FormInput from "@/Components/ui/formInput/FormInput";
import ip from "@/utils/endPoint";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { store, useAppSelector } from "../../../redux_tool";
import { updateFirstName, updateLastName, updateUsename } from "../../../redux_tool/redusProfile/profileSlice";

const PersonalInformation = (props: any) => {
  // const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.Profile);
  console.log("data.profile", data.profile);
  const [country, setCountry] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

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
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    try {
      country ? (form["country"] = country) : (form["country"] = null);
      Object.keys(form).forEach((key) => {
        if (!form[key]) delete form[key];
      });
      const response = await axios.patch(`${ip}/users`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // form?.username ? props.setUsername(form?.username) : null;
      props.setUsername(form?.username);
      store.dispatch(updateUsename(form?.username));
      store.dispatch(updateFirstName(form?.firstName));
      store.dispatch(updateLastName(form?.lastName));
    } catch (error: any) {
      console.error(error);
      setError(true);
      if (error?.response?.status === 409) {
        toast.error("Username already in use");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: any) => {
      prev[e.target.name] = e.target.value == "" ? null : e.target.value;
      return prev;
    });
  };

  useEffect(() => {
    console.log("data.profile", data.profile);
    if (data.profile) {
      const tmp = {
        firstName: data.profile?.profile?.name?.givenName,
        lastName: data.profile?.profile?.name?.lastName,
        username: data.profile?.username,
        email: data?.profile?.email,
        country: data?.profile?.profile?.country,
      };
      setForm(tmp);
    }
  }, [data.profile]);

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
                <div className="w-full md:w-[49%] h-14 ">
                  <FormInput
                    handleChange={handleChange}
                    name={"firstName"}
                    placehold={form?.firstName ? form?.firstName : "firstName"}
                    value={form?.firstName}
                  />
                </div>
                <div className="w-full md:w-[49%] h-14 ">
                  <FormInput
                    handleChange={handleChange}
                    name={"lastName"}
                    placehold={form?.lastName ? form?.lastName : "lastName"}
                    value={form?.lastName}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
              <div className="w-full md:w-[49%] ">
                <FormInput
                  handleChange={handleChange}
                  name={"username"}
                  placehold={form?.username ? form?.username : "username"}
                  value={form?.username}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row   c-10xl:space-x-[15%] items-center">
              <div className=" w-full">
                <input
                  className=" bg-very-dark-purple w-full rounded-[20px] px-5 h-14 placeholder:text-pearl placeholder:text-opacity-40 outline-none"
                  disabled
                  placeholder={form?.email ?? "email@gmail.com"}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
              <div
                id={"my_element"}
                className=" bg-very-dark-purple w-[100%] md:w-[49%]  rounded-[20px] h-14 placeholder:text-pearl placeholder:text-opacity-40"
              >
                <Country setCountry={setCountry} country={form?.country} />
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
        {error === true && <Toaster position="top-center" reverseOrder={false} />}
      </div> */}
    </div>
  );
};

export default PersonalInformation;
