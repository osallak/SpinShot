import ip from "@/utils/endPoint";
import { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "../../redux_tool";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import parseJwt from "@/utils/parsJwt";
import { useRouter } from "next/router";
import { PassThrough } from "stream";

const SocketContext = createContext<any>(null);
let socket = io(`${ip}/games`, {
  // extraHeaders: {},
  autoConnect: false,
});

let chatSocket = io(`${ip}/chat`, {
  // extraHeaders: {},
  autoConnect: false,
});

export const setSocket = (s: Socket) => {
  socket = s;
};

export const setGlobalSocketAuth = (token: string) => {
  socket.auth = {
    token: token,
  };
};

export const setChatSocket = (s: Socket) => {
  chatSocket = s;
};

export const getGlobalSocket = () => {
  return socket;
};

export const connectGlobalSocket = () => {
  socket.connect();
};

export const connectChatSocket = () => {
  chatSocket.connect();
};

export const setChatSocketAuth = (token: string) => {
  chatSocket.auth = {
    token: token,
  };
};

export const getChatSocket = () => {
  return chatSocket;
};

export const GameInvite = (props: any) => {
  return (
    <div className="">
      <Dialog
        open={props.openDialog}
        handler={() => {}}
        size="sm"
        className="bg-pearl space-y-10"
      >
        <DialogHeader className=" flex justify-center items-center text-very-dark-purple font-Passion-One text-3xl">
          Game Invite
        </DialogHeader>
        <DialogFooter className="">
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={props.handleDeclineInvitation}
          >
            <span className="text-very-dark-purple font-Passion-One text-lg">
              Decline
            </span>
          </button>
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={props.handleAcceptInvitation}
          >
            <span className="text-very-dark-purple font-Passion-One text-lg">
              Accept
            </span>
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

const SocketProvider = ({ children }: any) => {
  const [gameInvite, setGameInvite] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [otherUserId, setOtherUserId] = useState<any>("");
  const router = useRouter();
  const handleAcceptInvitation = () => {
    socket.emit("accept-invite", { id: otherUserId });
    setOpenDialog(false);
  };
  const handleDeclineInvitation = () => {
    try {
      socket.emit("decline-invite", { id: otherUserId });
      // console.log("decline");
      setOpenDialog(false);
    } catch (e) {}
  };
  useEffect(() => {
    console.log("i was called");
    console.log("socket id:", socket);
    socket.on("error", (data: any) => {
      toast.error(data);
    });
    socket.on("invite", (data: any) => {
      // console.log("other user: ", data.senderId);
      setOtherUserId(data.senderId);
      // console.log("invited");
      setGameInvite((prev) => !prev);
      setOpenDialog((prev) => {
        if (prev) return prev;
        return !prev;
      });
    });
    socket.on("invite-canceled", (data: any) => {
      // console.log("invite cancelled");
      toast.error("invite was declined");
    });
    socket.on("reconnect", (data: any) => {
      console.log("reconnect:", data);
      if (!localStorage || !localStorage.getItem("token")) {
        toast.error("you are not authenticated");
        return;
      }
      socket.emit("match", { opponent: data.opponent });
      router.push(`/game/${parseJwt(localStorage.getItem("token")!).sub}`);
    });
    socket.on("invite-accepted", (data: any) => {
      console.log("invite-accepted:", data);
      if (!localStorage || !localStorage.getItem("token")) {
        toast.error("you are not authenticated");
        return;
      }
      // console.log("accepted:", parseJwt(localStorage.getItem("token")!).sub);
      // setOtherUserId(data.id);
      // console.log("otherUserId", otherUserId);
      socket.emit("match", { id: data.id });
      router.push(`/game/${parseJwt(localStorage.getItem("token")!).sub}`);
    });
    return () => {
      // setOtherUserId("");
      // console.log("clean up");
      socket.off("invite");
      socket.off("invite-accepted");
      socket.off("invite-canceled");
      socket.off("reconnect");
    };
  }, [gameInvite, chatSocket, socket]);

  useEffect(() => {
    try {
      return () => {
        // console.log("global cleanup");
        if (chatSocket) chatSocket.disconnect();
        if (socket) socket.disconnect();
      };
    } catch (e) {
      // console.log(e);
    }
  }, []);
  // {
  //   // console.log("outside game event", openDialog);
  // }
  return (
    <>
      <SocketContext.Provider
        value={{
          socket,
          setSocket,
          chatSocket,
          setChatSocket,
          setGlobalSocketAuth,
          getGlobalSocket,
          connectGlobalSocket,
          setChatSocketAuth,
          getChatSocket,
          connectChatSocket,
        }}
      >
        {children}
      </SocketContext.Provider>
      {openDialog && (
        <GameInvite
          handleAcceptInvitation={handleAcceptInvitation}
          handleDeclineInvitation={handleDeclineInvitation}
          openDialog={openDialog}
        />
      )}
    </>
  );
};

export { SocketContext, SocketProvider };
