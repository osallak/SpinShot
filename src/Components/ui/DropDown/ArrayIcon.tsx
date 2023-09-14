import AddIcon from "../../../../public/AddIcon.svg";
import trashIcon from "../../../../public/trashIcon.svg";
import playIcon from "../../../../public/playIcon.svg";
import sittingIcon from "../../../../public/settingIcon.svg";
import kickIcon from "../../../../public/kickIcon.svg";
import banIcon from "../../../../public/banIcon.svg";
import muteIcon from "../../../../public/muteIcon.svg";
import adminIcon from "../../../../public/adminIcon.svg";
import profile from "./../../../../public/profileIcon.svg";
import play from "./../../../../public/playIcon.svg";
import friend from "./../../../../public/friendIcon.svg";
import notification from "./../../../../public/notificationIcon.svg";
import seaech from "./../../../../public/searchIcon.svg";
import message from "./../../../../public/messageIcon.svg";
import logo from "./../../../../public/logo.svg";
import line from "./../../../../public/line.svg";
import search from "./../../../../public/searchIcon.svg";
import signout from "./../../../../public/signOut.svg";

export const Array = [
  { icon: AddIcon, name: "Add" },
  { icon: trashIcon, name: "Delete conversation" },
  { icon: playIcon, name: "let's play" },
];

export const ArrayUser = [
  { icon: trashIcon, name: "Delete conversation" },
  { icon: sittingIcon, name: "Settings" },
];

export const ArrayChat = [
  { icon: kickIcon, name: "Kick" },
  { icon: banIcon, name: "Ban" },
  { icon: muteIcon, name: "Mute" },
  { icon: adminIcon, name: "Add as admin" },
];

export const ArrayMute = [
  { name: "For 1 Hour" },
  { name: "For 12 Hour" },
  { name: "Until I turn it back on" },
];

export const Icons = [
  { icon: seaech, route: "/search" },
  { icon: profile, route: "/profile/profile" },
  { icon: message, route: "message" },
  { icon: friend, route: "friend" },
  { icon: play, route: "/game/game" },
  { icon: notification, route: "/notification" },
];

export const buttons = [
  { id: 1, text: "Personal Information", route: "Personal_Information" },
  { id: 2, text: "Achievements", route: "Achievements" },
  { id: 3, text: "Match History", route: "Match_History" },
  { id: 4, text: "Security", route: "Security" },
];

export const SidbarIcon = [
  { icon: logo },
  { icon: line },
  { icon: search, route: "/search" },
  { icon: profile, route: "/profile/profile" },
  { icon: message, route: "message" },
  { icon: friend, route: "friend" },
  { icon: play, route: "/game/game" },
  { icon: notification, route: "/notification"},
];

export const resetPassword = [
  { text: "Password" },
  { text: "New Password" },
  { text: "Confirm New Password" },
];

export const Information = [
  {id: 1, text: "First name"},
  {id: 2, text: "Last name"},
  {id: 3, text: "Username"},
  {id: 4, text: "Email"},
  {id: 5, text: "country"},
  {id: 6, text: "avatar"},
];

export const SignOut = [{ icon: signout, name: "Sign out" }];
