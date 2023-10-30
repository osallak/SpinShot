"use client";
import ip from "@/utils/endPoint";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, KeyboardEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { createChannelAtom } from "../context/recoilContext";
import parseJwt from "@/utils/parsJwt";
import SwitchButton from "../ui/Buttons/SwitchButton";

const CreateChannels = (props: { open: boolean; setOpen: Function }) => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [createChannel, setCreateChannel] =
    useRecoilState<any>(createChannelAtom);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    props.setOpen(false);
  };

  const addChannelKeyboard = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      addChannel();
    }
  };

  const addChannel = async () => {
    const token = localStorage.getItem("token");
    const twoFA = parseJwt(JSON.stringify(token));
    if (!token || (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated)) {
      router.push("/signin");
      return;
    }
    const params: any = {
      name: name,
      type: type,
    };
    if (type === "PROTECTED") {
      const regPass = /^.{6,}$/.test(password);
      if (!regPass) {
        setError(true);
        setErrorMessage("Password must be at least 6 characters");
        return;
      }
      params["password"] = password;
    }
    try {
      await axios.post(`${ip}/room/add`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPassword("");
      setCreateChannel([...createChannel, params]);
      props.setOpen(false);
      toast.success("the channel created");
    } catch (error: any) {
      setError(true);
      setErrorMessage(error?.response?.data);
    }
  };

  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div
          className="fixed inset-0 overflow-y-auto"
          onKeyDown={(event) => addChannelKeyboard(event)}
        >
          <div className="flex min-h-full items-center justify-center text-center bg-black bg-opacity-70">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-pearl lg:p-6 p-1 shadow-xl transition-all lg:w-[900px] md:w-[700px] sm:w-[90%] w-[80%] flex flex-col justify-center items-center">
                <div className="w-full h-[300px] md:space-y-5 sm:space-y-3 space-y-0">
                  <div className="text-lg font-medium leading-6 text-gray-900 flex justify-center items-center flex-col md:h-[120px] sm:h-[100px] h-[80px]">
                    <p className="font-Poppins font-bold xl:text-3xl md:text-xl sm:text-md text-sm">
                      Create Channel
                    </p>
                  </div>
                  <div className="h-[85%] overflow-auto flex items-start justify-center sm:flex-row flex-col py-3">
                    <SwitchButton
                      setType={setType}
                      setName={setName}
                      setPassword={setPassword}
                    />
                  </div>
                </div>
                {error && (
                  <span className="text-red-900 font-poppins">
                    {errorMessage}
                  </span>
                )}
                <div className="mt-7 rounded-full w-full lg:h-full md:h-[50px] sm:h-[30px] h-[20px] flex justify-end items-center md:p-5 sm:p-3 p-1">
                  <button
                    type="button"
                    className="rounded-full bg-peridot px-4 py-2 text-very-dark-purple lg:w-24 md:w-20 sm:w-16 w-14 lg:h-9 md:h-8 sm:h-7 h-6 focus:outline-none flex justify-center items-center"
                    onClick={addChannel}
                  >
                    <span className="font-Passion-One text-very-dark-purple flex justify-center items-center">
                      Add
                    </span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateChannels;
