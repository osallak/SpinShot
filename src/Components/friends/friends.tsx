import SideBar from "../ui/Sidebar/sideBar";
import axios from "axios";
import FriendsRequest from "./friendRequest";
import CurrentFriends from "./currentFriends";
import MobileFriends from "./mobileFriends";
import { useState, useEffect } from "react";
import MobileSideBar from "../ui/Sidebar/mobileSideBar";
import NavBar from "../ui/FolderNavbar/navBar";

const FriendsPage = () => {
  const fetchData = async () => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    function parseJwt(token: string) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }
    const jwtToken = parseJwt(JSON.stringify(token));
    console.log("jwtToken: ", jwtToken);
    try {
      const res = await axios.get("http://34.95.172.25/friends", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          state: "ACCEPTED",
          page: 1,
          limit: 5,
        },
      });
      console.log("response from friends: ", res);
    } catch (error: any) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
