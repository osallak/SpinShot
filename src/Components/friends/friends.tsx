import SideBar from "../ui/sideBar/sideBar";
import FriendsRequest from "./friendRequest";
import CurrentFriends from "./currentFriends";
import MobileFriends from "./mobileFriends";
import { useState, useEffect } from "react";
import MobileSideBar from "../ui/sideBar/mobileSideBar";
import NavBar from "../ui/navBar/navBar";

const FriendsPage = () => {

  const fetchData = () => {
    
  }
  
  useEffect(() => {
    fetchData();
  }, [])


  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 flex justify-start md:space-x-3 space-x-0  md:py-3 md:pr-3 md:pl-3 pl-0 py-0 pr-0 items-center flex-row">
      <SideBar />
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
