import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import eye from "../../../public/eye.svg";
import eyeSlash from "../../../public/eye-slash.svg";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { channelAtom } from "../context/recoilContextChannel";
import { usersListAtom } from "../context/recoilContextChannel";
import { usersListType } from "@/types/channelTypes";
import leave from "../../../public/kickIcon.svg"
import ip from "@/utils/endPoint";
import DropDownChannel from "../ui/FolderDropDown/DropDownChannel";
import { roomContent } from "@/utils/dropDownContent";

const UsersList = (props: {
  open: boolean;
  setOpen: Function;
  id: string | undefined;
  data: usersListType[];
	userId: string;
}) => {
  const [channel, setChannel] = useRecoilState(channelAtom);
  // const [usersList, setUsersList] = useRecoilState(usersListAtom);
  const [type, setType] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmePassword, setSeeConfirmePassword] = useState(false);
  const [confirmePassword, setConfirmePassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

	const leaveDropDown = [{content: "Leave", icone: leave}]

  const closeModal = () => {
    props.setOpen(false);
  };

  const goToUser = (userId: string) => {
    router.push(`/profile/${userId}`);
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

  console.log("users List: ", props.data);

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
                      Users
                    </p>
                  </div>
                </div>
                <div className="h-auto md:max-h-[500px] sm:max-h-[350px] max-h-[250px] w-[90%] overflow-auto flex items-center sm:flex-wrap flex-nowrap sm:flex-row flex-col">
                  {(props.data as usersListType[]).map(
                    (items: usersListType, index: number) => (
                      <div className="md:w-[50%] w-full h-24 flex justify-center items-center">
                        <div
                          key={index}
                          className="bg-very-dark-purple w-[300px] h-20 flex justify-between items-center sm:rounded-2xl rounded-xl px-3 space-x-2"
                        >
                          <div className="flex justify-start items-center space-x-2">
                            <button
                              onClick={() => goToUser(items.userId)}
                              className="rounded-xl"
                            >
                              <Image
                                src={items.User.avatar}
                                alt="avatar"
                                width={500}
                                height={500}
                                className="md:w-14 w-10 rounded-xl"
                              />
                            </button>
                            <div className="flex justify-between items-start flex-col md:h-11 h-8">
                              <button
                                onClick={() => goToUser(items.userId)}
                                className="font-poppins text-pearl font-semibold md:text-base sm:text-sm text-xs"
                              >
                                {items.User.username}
                              </button>
                              <div className="flex md:space-x-3 space-x-1">
                                <span className="font-poppins text-pearl font-thin sm:text-sm text-xs text-opacity-40">
                                  {items.userRole}
                                </span>
                                <span className="font-poppins text-pearl font-thin sm:text-sm text-xs text-opacity-40">
                                  {items.userStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                          {props.userId === items.userId ? <DropDownChannel data={leaveDropDown} userId={items.userId} id={props.id} /> :<DropDownChannel data={roomContent} userId={items.userId} id={props.id} />}
                        </div>
                      </div>
                    )
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

export default UsersList;
