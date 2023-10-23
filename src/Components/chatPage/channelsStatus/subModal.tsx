import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, Fragment, useState } from "react";
import lock from "../../../../public/lock.svg";

const SubModal = (props: {
  open: boolean;
  setOpen: Function;
  type: string;
  name: string;
}) => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function closeModal() {
    props.setOpen(false);
  }

  const joinChannel = async (type: string) => {
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
      const params: any = {
        type: type,
        name: props.name,
      };
      if (type === "PROTECTED") params["password"] = password;
      const res = await axios.post(`${ip}/room/join`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.setOpen(false);
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.response.data);
    }
  };

  const getPassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
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
          <div className="fixed inset-0 bg-black bg-opacity-70 drop-shadow-2xl" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="lg:w-full md:w-[90%] sm:w-[80%] w-[70%] max-w-md transform overflow-hidden rounded-2xl bg-pearl p-6 text-left align-middle shadow-xl transition-all">
                <div>
                  {props.type === "PROTECTED" && (
                    <div className="flex justify-center items-center flex-col space-y-2">
                      <span className="font-Poppins text-very-dark-purple px-4 font-semibold w-full lg:text-lg md:text-md sm:text-sm text-xs">
                        Enter the password of the channel
                      </span>
                      {error && (
                        <span className="text-red-900 font-poppins">
                          {errorMessage}
                        </span>
                      )}
                      <div className="border w-full md:h-10 sm:h-9 h-8 rounded-full bg-very-dark-purple flex flex-row justify-center items-center pl-4">
                        <Image
                          src={lock}
                          alt="lock icon"
                          className="sm:w-6 w-5"
                        />
                        <input
                          onChange={(event) => getPassword(event)}
                          type="password"
                          className="w-full h-full rounded-full bg-very-dark-purple placeholder:text-pearl placeholder:opacity-40 lg:text-lg md:text-md sm:text-sm text-xs p-2 placeholder:font-Poppins outline-none text-pearl"
                          placeholder="Password"
                        />
                      </div>
                      <div className="w-full md:h-10 sm:h-9 h-8 flex justify-end items-center">
                        <button
                          onClick={() => joinChannel(props.type)}
                          className="flex justify-center items-center md:w-[100px] sm:w-[85px] w-[70px] h-full bg-peridot font-Passion-One text-very-dark-purple rounded-full lg:text-lg md:text-md sm:text-sm text-xs"
                        >
                          Confirme
                        </button>
                      </div>
                    </div>
                  )}
                  {props.type === "PUBLIC" && (
                    <div className="flex justify-center items-center flex-col space-y-2">
                      <span className="font-Poppins text-very-dark-purple px-4 font-semibold w-full lg:text-lg md:text-md sm:text-sm text-xs">
                        welcome to this channel
                      </span>
                      {error && (
                        <span className="text-red-900 font-poppins">
                          {errorMessage}
                        </span>
                      )}
                      <div className="w-full md:h-10 sm:h-9 h-8 flex justify-center items-center">
                        <button
                          onClick={() => joinChannel(props.type)}
                          className="flex justify-center items-center md:w-[100px] sm:w-[85px] w-[70px] h-full bg-peridot font-Passion-One text-very-dark-purple rounded-full lg:text-lg md:text-md sm:text-sm text-xs focus:outline-none outline-none"
                        >
                          Confirme
                        </button>
                      </div>
                    </div>
                  )}
                  {props.type === "PRIVATE" && (
                    <div className="flex justify-center items-center flex-col space-y-2">
                      <span>
                        If you are invited to this channel you can enter
                      </span>
                      {error && (
                        <span className="text-red-900 font-poppins">
                          {errorMessage}
                        </span>
                      )}
                      <div className="w-full md:h-10 sm:h-9 h-8 flex justify-center items-center">
                        <button
                          onClick={() => joinChannel(props.type)}
                          className="flex justify-center items-center md:w-[100px] sm:w-[85px] w-[70px] h-full bg-peridot font-Passion-One text-very-dark-purple rounded-full lg:text-lg md:text-md sm:text-sm text-xs focus:outline-none outline-none"
                        >
                          Confirme
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SubModal;
