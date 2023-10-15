import exploreChannelType from "@/types/channelsType";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment, MouseEvent, useState } from "react";
import { useRecoilState } from "recoil";
import exportChannelsIcon from "../../../public/ExportChannels.svg";
import { exploreChannelAtom } from "../context/recoilContext";
import SubModal from "./channelsStatus/subModal";

const ExploreChannels = (props: { open: boolean; setOpen: Function }) => {
  const [subOpen, setSubOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [exploreChannel, setExploreChannel] =
    useRecoilState(exploreChannelAtom);

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

  const closeModal = () => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setOpen(false);
  };

  const closeModaltwo = () => {
    props.setOpen(false);
  };

  const joinChannel =
    (status: string, id: string) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setSubOpen(true);
      setStatus(status);
      setName(id);
      console.log("explorechannel: ", exploreChannel);
    };

  return (
    <>
      {subOpen && (
        <SubModal
          open={subOpen}
          setOpen={setSubOpen}
          type={status}
          name={name}
        />
      )}
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
                  <div className="w-full xl:h-[900px] md:h-[800px] sm:h-[600px] h-[400px] md:space-y-5 sm:space-y-3 space-y-0">
                    <div className="text-lg font-medium leading-6 text-gray-900 flex justify-center items-center flex-col md:h-[120px] sm:h-[100px] h-[80px]">
                      <Image
                        src={exportChannelsIcon}
                        alt="explore channels"
                        className="xl:w-20 md:w-16 sm:w-10 w-8"
                      />
                      <p className="font-Poppins font-bold xl:text-3xl md:text-xl sm:text-md text-sm">
                        Explore channels
                      </p>
                    </div>
                    <div className="h-[85%] overflow-auto flex items-center sm:flex-wrap flex-nowrap sm:flex-row flex-col py-3">
                      {(exploreChannel as exploreChannelType[]).map(
                        (items: exploreChannelType, index: number) => (
                          <div
                            key={index}
                            className="sm:w-1/2 w-full flex justify-center items-center lg:px-3 sm:px-2 px-1 md:py-5 sm:py-4 py-2"
                          >
                            <div className="bg-very-dark-purple w-full md:h-24 sm:h-20 h-16 md:rounded-[30px] sm:rounded-2xl rounded-xl flex items-center justify-between md:pl-4 sm:pl-3 pl-2">
                              <div className="flex flex-row h-full lg:space-x-2 space-x-1 w-[70%]">
                                <div className="lg:w-[70px] md:w-[60px] sm:w-[50px] w-[40px] h-full flex justify-center items-center">
                                  <div className="lg:w-[70px] md:w-[60px] sm:w-[50px] w-[40px] lg:h-[70px] md:h-[60px] sm:h-[50px] h-[40px] rounded-xl bg-pearl bg-opacity-40 flex justify-center items-center">
                                    <div className="font-Poppins md:text-4xl sm:text-3xl text-2xl font-thin text-very-dark-purple flex justify-center items-center">
                                      {sp(items.id).map((charName, index) => (
                                        <p key={index} className="uppercase">
                                          {charName[0]}
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className=" h-full lg:w-[200px] md:w-[170px] w-[140px] flex flex-col">
                                  <div className=" h-[50%] flex flex-row justify-start items-center space-x-2">
                                    <div className=" font-Poppins lg:text-lg md:text-md text-[10px] text-pearl flex flex-row space-x-1">
                                      {splitThreePoint(items.id).map(
                                        (channelName, index) => (
                                          <p key={index}>{channelName}</p>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="h-full w-[30%] px-1">
                                <div className="h-[50%] flex justify-center items-center">
                                  <p className="font-Poppins text-[10px] text-pearl text-opacity-40">
                                    {items.type}
                                  </p>
                                </div>
                                {items.type !== "PRIVATE" && (
                                  <div className="h-[50%] flex justify-center items-center outline-none">
                                    <motion.div
                                      whileTap={{ scale: 0.9 }}
                                      className="md:w-16 sm:w-12 w-10 h-5 rounded-full flex justify-center items-center bg-peridot"
                                    >
                                      <button
                                        onClick={joinChannel(
                                          items.type,
                                          items.id
                                        )}
                                        className={`"bg-peridot" focus:outline-none outline-none rounded-full text-lg sm:text-xl w-full h-full font-Passion-One text-very-dark-purple`}
                                      >
                                        <p className="font-Passion-One text-very-dark-purple text-sm">
                                          Join
                                        </p>
                                      </button>
                                    </motion.div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
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
    </>
  );
};

export default ExploreChannels;
