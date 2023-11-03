import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, Fragment, useCallback, useState } from "react";
import toast from "react-hot-toast";
import eyeSlash from "../../../../public/eye-slash.svg";
import eye from "../../../../public/eye.svg";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import lock from "../../../../public/lock.svg";

const SubModal = (props: {
  open: boolean;
  setOpen: Function;
  setExploreClose: Function;
  type: string;
  name: string;
}) => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const handleOpen = () => props.setOpen(!props.open);

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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/room/join`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.setExploreClose(false);
      props.setOpen(false);
      toast.success(`welcome to ${props.name}`);
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.response.data);
    }
  };

  const showPassword = () => {
    setSeePassword(!seePassword);
  };

  const getPassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
    <Dialog
      size="sm"
      open={props.open}
      handler={handleOpen}
      className=" bg-pearl outline-none ring-0"
    >
      <DialogHeader className="flex justify-center items-center text-very-dark-purple">
      Enter the password of the channel
      </DialogHeader>
      <DialogBody>
        <div>
          {props.type === "PROTECTED" && (
            <div className="flex justify-center items-center flex-col space-y-2">
              <div className="w-full md:h-10 sm:h-9 h-8 rounded-full bg-very-dark-purple flex flex-row justify-center items-center pl-4">
                <Image
                  src={lock}
                  alt="lock icon"
                  className="sm:w-6 w-5"
                />
                <div className="flex w-full pr-3 h-full rounded-full">
                <input
                  onChange={(event) => getPassword(event)}
                  type={`${seePassword ? "text" : "password"}`}
                  placeholder="password"
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
              </div>
              {error && (
                <span className="text-red-900 font-poppins">
                  {errorMessage}
                </span>
              )}
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
      </DialogBody>
    </Dialog>
  )
};

export default SubModal;
