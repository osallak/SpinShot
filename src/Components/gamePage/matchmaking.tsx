import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";
import { Spinner } from "@material-tailwind/react";

// import { parseJwt } from "../../../redux_tool/extractToken";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import parseJwt from "@/utils/parsJwt";
import { SocketContext } from "@/context/socket.context";

const Matchmaking = (props: any) => {
  const {socket, setSocket} = useContext(SocketContext);
  const dataUser = useAppSelector((state) => state.Profile);
  // const [clear, setClear] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // useEffect(() => {

  // }, [props.matchData, props.dataOpponent])
  const handleClick = () => {
    if (!socket) return;
    // setClear(true);
    // // console.log("socket: ", socket);
    // // console.log("leave queue");
    socket.emit("leaveQueue", () =>{}); // console.log("leave queue"));
    socket.on("exception", () =>{}); // console.log("exception: "));
    // if (props.matchData) {
    //   socket.emit("leave");
    // }
    // socket.emit("leave", () => {
    //   // console.log('leave');
    // });
    // props.setGameOver(true);
    socket.on("disconnect", () => {});// console.log("disconnect: "));
    props.setIsClick(!props.isClick);
    // props.setmatchData(null);
    props.setDataOfOpponent(null);
  };

  const getDataOfUaer = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin");
      return;
    }
    try {
      await dispatch(getProfile(parseJwt(JSON.stringify(token)).sub)).unwrap();
    } catch (error) {
      // // console.log(error);
      return;
    }
  };

  // const cleanUp = () => {
  // setClear(false);
  // }

  useEffect(() => {
    getDataOfUaer();
    // return () => {
    //   if (clear) {
    //     cleanUp();
    //   }
    // };
  }, [props.dataOpponent]);

  return (
    <div className="">
      <Dialog
        open={props.isClick}
        handler={() => {}}
        size="sm"
        className="bg-pearl"
      >
        <DialogHeader className=" flex justify-center items-center text-very-dark-purple font-Passion-One text-3xl">
          Match Making
        </DialogHeader>
        <DialogBody className=" flex justify-around items-center flex-row text-lg font-Poppins ">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-cover rounded-2xl  ">
              <picture>
                <img
                  className="rounded-full bg-cover "
                  width={150}
                  height={150}
                  src={dataUser.profile?.profile?.avatar}
                  alt=""
                />
              </picture>
            </div>
            <h1 className="text-very-dark-purple font-Passion-One text-xl">
              {dataUser.profile?.username}
            </h1>
          </div>
          <div className="text-3xl text-very-dark-purple font-Passion-One">
            vs
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-cover rounded-2xl ">
              <Spinner className="h-12 w-12" />
            </div>
            <h1 className="text-very-dark-purple font-Passion-One text-xl">
              {props.dataOpponent?.username}
            </h1>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-3">
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={() => handleClick()}
          >
            <span className="text-very-dark-purple font-Passion-One text-lg">
              Cancel
            </span>
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Matchmaking;
