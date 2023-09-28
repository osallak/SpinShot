// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
import Image from "next/image";
import exportChannelsIcon from "../../../public/ExportChannels.svg";
import { Dialog, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, MouseEvent, useState } from "react";
import SimpleButton from "../ui/Buttons/SimpleButton";
import CreateChannelIcon from "../../../public/CreateChannel.svg";
import SubModal from "./channelsStatus/subModal";
import SwitchButton from "../ui/Buttons/SwitchButton";

const CreateChannels = (props: { open: boolean; setOpen: Function }) => {
  const content = [
    {
      name: "spinshot Game",
      members: 50,
      status: "private",
    },
    {
      name: "spinshot Game",
      members: 50,
      status: "protected",
    },
    {
      name: "spinshot Game",
      members: 20,
      status: "protected",
    },
  ];
  const [subOpen, setSubOpen] = useState(false);
  const [status, setStatus] = useState("");

  const sp = (name: string) => {
    const res = name.split(" ");
    if (res.length > 2) for (let i = 0; i < res.length; i++) res.pop();
    return res;
  };

  const splitThreePoint = (name: string) => {
    const res = name.split(" ");
    if (res.length > 2) {
      for (let i = 0; i < res.length; i++) {
        res.pop();
      }
      res.push("...");
    }
    return res;
  };

  const closeModal = () => {
    props.setOpen(false);
  };

  const closeModaltwo = () => {
    props.setOpen(false);
  };

  const joinChannel =
    (status: string) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setSubOpen(true);
      setStatus(status);
    };
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
                <div className="w-full h-[300px] md:space-y-5 sm:space-y-3 space-y-0">
                  <div className="text-lg font-medium leading-6 text-gray-900 flex justify-center items-center flex-col md:h-[120px] sm:h-[100px] h-[80px]">
                    <Image
                      src={CreateChannelIcon}
                      alt="explore channels"
                      className="xl:w-20 md:w-16 sm:w-10 w-8"
                    />
                    <p className="font-Poppins font-bold xl:text-3xl md:text-xl sm:text-md text-sm">
                      Create Channel
                    </p>
                  </div>
                  <div className="h-[85%] overflow-auto flex items-start justify-center sm:flex-row flex-col py-3">
										<SwitchButton />
									</div>
                </div>
                <div className="mt-7 rounded-full w-full lg:h-full md:h-[50px] sm:h-[30px] h-[20px] flex justify-end items-center md:p-5 sm:p-3 p-1">
                  <button
                    type="button"
                    className="rounded-full bg-peridot px-4 py-2 text-very-dark-purple lg:w-24 md:w-20 sm:w-16 w-14 lg:h-9 md:h-8 sm:h-7 h-6 focus:outline-none flex justify-center items-center"
                    onClick={closeModaltwo}
                  >
                    <span className="font-Passion-One text-very-dark-purple flex justify-center items-center">
                      Exit
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
