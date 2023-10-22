import dataFriends from "@/types/friendsType";
import ip from "@/utils/endPoint";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentFriendsAtom } from "../context/recoilContext";
import toast from "react-hot-toast";

const InviteFriends = (props: {
  open: boolean;
  setOpen: Function;
  id: string;
  roomId: string;
}) => {
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [currentFriends, setCurrentFriends] =
    useRecoilState(currentFriendsAtom);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => props.setOpen(!props.open);

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleRoomname = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomname(event.target.value);
  };

  const handleClick = async (id: string) => {
    try {
      await axios.post(
        `${ip}/room/invite`,
        { userId: id, roomName: roomname },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      props.setOpen(false);
      toast.success("user invited succefuly");
    } catch (error: any) {
      setError(true);
      if (username === "") setErrorMessage("wrong userName or roomName");
      else setErrorMessage(error?.response?.data);
    }
  };

  const fetchCurrentFriends = async () => {
    try {
      const res = await axios.get(`${ip}/friends`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          status: "ACCEPTED",
        },
      });
      setCurrentFriends(res.data.data);
    } catch (error: any) {}
  };

  useEffect(() => {
    fetchCurrentFriends();
  }, []);

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
            onChange={(event) => handleUsername(event)}
            type="text"
            placeholder="Enter your friend's username"
            className="bg-very-dark-purple text-pearl placeholder:text-pearl placeholder:text-opacity-40 text-poppins w-[70%] h-10 rounded-full px-3 outline-none ring-0 focus:ring-0 font-semibold"
          />
          <input
            onChange={(event) => handleRoomname(event)}
            type="text"
            placeholder="Enter the room name"
            className="bg-very-dark-purple text-pearl placeholder:text-pearl placeholder:text-opacity-40 text-poppins w-[70%] h-10 rounded-full px-3 outline-none ring-0 focus:ring-0 font-semibold"
          />
        </div>
        {error && (
          <span className="text-red-900 font-poppins font-semibold text-base flex justify-center items-center">
            {errorMessage}
          </span>
        )}
      </DialogBody>
      <DialogFooter>
        {(currentFriends as dataFriends[]).map(
          (items: dataFriends, index: number) =>
            items.username === username && (
              <Button
                key={index}
                onClick={() => handleClick(items.id)}
                className="rounded-full bg-peridot w-20 flex justify-center items-center text-very-dark-purple font-Passion-One font-semibold"
              >
                Invite
              </Button>
            )
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default InviteFriends;
