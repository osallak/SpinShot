import ip from "@/utils/endPoint";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import eyeSlash from "../../../public/eye-slash.svg";
import eye from "../../../public/eye.svg";
import { parseJwt } from "../../../redux_tool/extractToken";
import { channelAtom } from "../context/recoilContextChannel";

const ChannelSettings = (props: {
  open: boolean;
  setOpen: Function;
  id: string | undefined;
}) => {
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [type, setType] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmePassword, setSeeConfirmePassword] = useState(false);
  const [confirmePassword, setConfirmePassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const closeModal = () => {
    props.setOpen(false);
  };

  const showPassword = () => {
    setSeePassword(!seePassword);
  };

  const showConfirmePassword = () => {
    setSeeConfirmePassword(!seeConfirmePassword);
  };

  const handleConfirmePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmePassword(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const removePassword = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    const twoFA = parseJwt(JSON.stringify(token));
    if (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated) {
      router.push("/signin");
      return;
    }
    try {
      const res = await axios.patch(
        `${ip}/room/remove-password`,
        { room: props.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeModal();
      toast.success("the password removed succefuly");
    } catch (error: any) {
      setError(true);
      setErrorMessage(error?.response?.data);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    if (type === "PROTECTED") {
      try {
        const res = await axios.patch(
          `${ip}/room/change-password`,
          { room: props.id, password, newPassword: confirmePassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        closeModal();
        toast.success("the password changed succefuly");
      } catch (error: any) {
        setError(true);
        setErrorMessage(error?.response?.data);
      }
    } else if (type === "PUBLIC") {
      if (password !== confirmePassword) {
        setError(true);
        setErrorMessage("password doesn't match");
        return;
      }
      try {
        const res = await axios.patch(
          `${ip}/room/protect`,
          { room: props.id, password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        props.setOpen(false);
        closeModal();
        toast.success("the channel is protected now");
      } catch (error: any) {
        setError(true);
        setErrorMessage(error?.response?.data);
      }
    }
  };

  const getTypeOfChannel = () => {
    channel.find((items: any) => {
      if (items.id === props.id) {
        setType(items.type);
      }
    });
  };

  useEffect(() => {
    getTypeOfChannel();
  }, []);

  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

        <div className="fixed inset-0 overflow-y-auto">
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
                <div className="w-full md:space-y-5 sm:space-y-3 space-y-0">
                  <div className="text-lg font-medium leading-6 text-gray-900 flex justify-center items-center flex-col h-[100px]">
                    <p className="font-Poppins font-bold xl:text-3xl md:text-xl sm:text-md text-sm">
                      Settings
                    </p>
                    {type !== "PRIVATE" && (
                      <p className="font-Poppins font-normal xl:text-xl md:text-base sm:text-sm text-xs">
                        Set, Change, or Remove the channel's password
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-[300px] h-10 bg-very-dark-purple flex flex-row justify-center items-center pr-3 rounded-full">
                    <input
                      onChange={(event) => handlePassword(event)}
                      type={`${seePassword ? "text" : "password"}`}
                      placeholder={`${
                        type === "PROTECTED" ? "Old Password" : "Password"
                      }`}
                      className="bg-very-dark-purple outline-none ring-0 w-full h-full pl-5 rounded-full placeholder:text-pearl placeholder:opacity-40 text-pearl"
                    />
                    <button
                      onClick={showPassword}
                      className="w-[25px] h-full outline-none ring-0"
                    >
                      {seePassword ? (
                        <Image src={eye} alt="eye" />
                      ) : (
                        <Image src={eyeSlash} alt="eyeSlash" />
                      )}
                    </button>
                  </div>
                  <div className="w-[300px] h-10 bg-very-dark-purple flex flex-row justify-center items-center pr-3 rounded-full">
                    <input
                      onChange={(event) => handleConfirmePassword(event)}
                      type={`${seeConfirmePassword ? "text" : "password"}`}
                      placeholder={`${
                        type === "PROTECTED"
                          ? "New Password"
                          : "Confirme Password"
                      }`}
                      className="bg-very-dark-purple outline-none ring-0 w-full h-full pl-5 rounded-full placeholder:text-pearl placeholder:opacity-40 text-pearl"
                    />
                    <button
                      onClick={showConfirmePassword}
                      className="w-[25px] h-full outline-none ring-0"
                    >
                      {seeConfirmePassword ? (
                        <Image src={eye} alt="eye" />
                      ) : (
                        <Image src={eyeSlash} alt="eyeSlash" />
                      )}
                    </button>
                  </div>
                </div>
                {error && (
                  <span className="text-red-900 font-poppins">
                    {errorMessage}
                  </span>
                )}
                <div className="mt-7 rounded-full w-full lg:h-full md:h-[50px] sm:h-[30px] h-[20px] flex justify-end items-center md:p-5 sm:p-3 p-1 space-x-2">
                  <button
                    type="button"
                    className="text-very-dark-purple focus:outline-none flex justify-center items-center"
                    onClick={removePassword}
                  >
                    <span className="font-Passion-One text-very-dark-purple flex justify-center items-center">
                      Remove
                    </span>
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-peridot px-4 py-2 text-very-dark-purple lg:w-24 md:w-20 sm:w-16 w-14 lg:h-9 md:h-8 sm:h-7 h-6 focus:outline-none flex justify-center items-center"
                    onClick={handleSave}
                  >
                    <span className="font-Passion-One text-very-dark-purple flex justify-center items-center">
                      Save
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

export default ChannelSettings;
