import { useState } from "react";
import test1 from "../../../public/test1.svg";
import NavBar from "../ui/navBar/navBar";
import MobileSideBar from "../ui/sideBar/mobileSideBar";
import SideBar from "../ui/sideBar/sideBar";
import CurrentFriends from "./currentFriends";
import FriendsRequest from "./friendRequest";
import MobileFriends from "./mobileFriends";

const FriendsPage = () => {

  // const [response, setResponse] = useState<dataFriends[]>([]);

  // const fetchData = async () => {
  //   const token = localStorage.getItem("token");
  //   const jwtToken = parseJwt(JSON.stringify(token));
  //   console.log("jwtToken: ", jwtToken);
  //   try {
  //     const res = await axios.get("http://34.95.172.25/friends", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       params: {
  //         status: "ACCEPTED",
  //       }
  //     });
  //     setResponse(res.data.data);
  //     console.log("data from friends: ", res.data.data);
  //   } catch (error: any){
  //     console.log("error from friends: ", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 flex justify-start md:space-x-3 space-x-0  md:py-3 md:pr-3 md:pl-3 pl-0 py-0 pr-0 items-center flex-row">
      <SideBar avatar={test1} />
      {openSideBar && <MobileSideBar />}
      <CurrentFriends />
      <FriendsRequest />
      <div className="w-full h-full md:hidden flex flex-col">
        <NavBar open={openSideBar} setOpen={setOpenSideBar} />
        <MobileFriends />
      </div>
    </div>
  );
};

export default FriendsPage;
