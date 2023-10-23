import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const InviteFriends = (props: {
  open: boolean;
  setOpen: Function;
  id: string;
  roomId: string;
}) => {
  const [roomname, setRoomname] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => props.setOpen(!props.open);

  const handleRoomname = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomname(event.target.value);
  };

  const handleClick = async () => {
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
      await axios.post(
        `${ip}/room/invite`,
        { userId: props.id, roomName: props.roomId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.setOpen(false);
      toast.success("user invited successfully");
    } catch (error: any) {
      setError(true);
      setErrorMessage(error?.response?.data);
    }
  };

  return (
    <Dialog
      size="md"
      open={props.open}
      handler={handleOpen}
      className=" bg-pearl outline-none ring-0"
    >
      <DialogHeader className="flex justify-center items-center">
        Invite your friends to your channel
      </DialogHeader>
      <DialogBody>
        <div className="w-full h-full flex justify-center items-center flex-col space-y-2">
          <input
            onChange={(event) => handleRoomname(event)}
            type="text"
            placeholder="Enter the room name"
            className="bg-very-dark-purple text-pearl placeholder:text-pearl placeholder:text-opacity-40 text-poppins w-[70%] h-10 rounded-full px-3 outline-none ring-0 focus:ring-0 font-semibold md:text-lg sm:text-base text-sm"
          />
        </div>
        {error && (
          <span className="text-red-900 font-poppins font-semibold text-base flex justify-center items-center">
            {errorMessage}
          </span>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={() => handleClick}
          className="rounded-full bg-peridot w-20 flex justify-center items-center text-very-dark-purple font-Passion-One font-semibold"
        >
          Invite
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default InviteFriends;
