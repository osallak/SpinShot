import SideBar from "../ui/sideBar/sideBar";
import FriendsRequest from "./friendRequest";
import CurrentFriends from "./currentFriends";

const FriendsPage = () => {
  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 md:space-y-0 space-y-3 flex justify-start px-3 pb-3 md:pt-3 pt-0 items-center md:flex-row flex-col">
      <SideBar />
      <CurrentFriends />
      <FriendsRequest />
    </div>
  );
};

export default FriendsPage;
