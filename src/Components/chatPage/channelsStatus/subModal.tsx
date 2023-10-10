import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";
import Image from "next/image";
import lock from "../../../../public/lock.svg";

const SubModal = (props: {
  open: boolean;
  setOpen: Function;
  type: string;
}) => {

  const [password, setPassword] = useState("");
  const [joinSuccess, setJoinSuccess] = useState(false);
  // const params: any = {
  //   name: name,
  //   type: type,
  // };
  // if (password.length >= 6) params["password"] = password;

  function closeModal() {
    props.setOpen(false);
  }

  // const joinChannel = (type: string) => {
  //   {
  //     type === "PUBLIC" ? setJoinSuccess(true) : 
  //   }
  // }

  const getPassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  console.log("status", props.type);

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
                        <button className="flex justify-center items-center md:w-[100px] sm:w-[85px] w-[70px] h-full bg-peridot font-Passion-One text-very-dark-purple rounded-full lg:text-lg md:text-md sm:text-sm text-xs">
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
                      <div className="w-full md:h-10 sm:h-9 h-8 flex justify-center items-center">
                      <button className="flex justify-center items-center md:w-[100px] sm:w-[85px] w-[70px] h-full bg-peridot font-Passion-One text-very-dark-purple rounded-full lg:text-lg md:text-md sm:text-sm text-xs focus:outline-none outline-none">
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
