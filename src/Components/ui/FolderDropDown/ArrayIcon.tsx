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
import test1 from "../../../../public/test1.svg";
import proLogo from "../../../../public/proLogo.svg";
import masterLogo from "../../../../public/masterLogo.svg";
import grandMasterLogo from "../../../../public/grandMasterLogo.svg";
import eliteLogo from "../../../../public/eliteLogo.svg";
import veteraneLogo from "../../../../public/veteranLogo.svg";

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

export const buttonsUser = [
  { id: 1, text: "Personal Information", route: "Personal_Information" },
  { id: 2, text: "Achievements", route: "Achievements" },
  { id: 3, text: "Match History", route: "Match_History" },
  { id: 4, text: "Security", route: "Security" },
];

export const buttons = [
  { id: 2, text: "Achievements", route: "Achievements" },
  { id: 3, text: "Match History", route: "Match_History" },
];

export const SidbarIcon = [
  { icon: logo },
  { icon: line },
  { icon: search, route: "/search" },
  { id: 0, icon: profile, route: "/profile" },
  { id: 1, icon: message, route: "/messages" },
  { id: 2, icon: friend, route: "/friend" },
  { id: 3, icon: play, route: "/game" },
];

export const resetPassword = [
  { index: 0, text: "Password" },
  { index: 0, text: "New Password" },
  { index: 0, text: "Confirm New Password" },
];

export const Information = [
  { number: 1, text: "Username" },
  { number: 2, text: "Email" },
  { number: 3, text: "country" },
  { number: 4, text: "avatar" },
];

export const logos = [
  { id: 1, logo: grandMasterLogo, rank: "GRAND MASTER" },
  { id: 2, logo: masterLogo, rank: "MASTER" },
  { id: 3, logo: veteraneLogo, rank: "VETERAN" },
  { id: 4, logo: proLogo, rank: "PRO" },
  { id: 5, logo: eliteLogo, rank: "ELITE" },
];

export const IdDeviceBreakpointsByWidth = {
  max: 1024,
  laptop_max: 1440,
  laptop_min: 992,
  tablet_min: 768,
  tablet_max: 991,
  mobile_max: 767,
  default_min: 768, // Unrecognized device
};

// export const ArrayAvatar = [
//   {id: 1, icon: test1},
//   {id: 2, icon: test1},
//   {id: 3, icon: test1},
//   {id: 4, icon: test1},
//   {id: 5, icon: test1},
//   {id: 6, icon: test1},
//   {id: 7, icon: test1},
//   {id: 8, icon: test1},
//   {id: 9, icon: test1},
//   {id: 10, icon: test1},
//   {id: 11, icon: test1},
//   {id: 12, icon: test1},
//   {id: 13, icon: test1},
//   {id: 14, icon: test1},
//   {id: 15, icon: test1},
//   {id: 16, icon: test1},
//   {id: 17, icon: test1},
//   {id: 18, icon: test1},
//   {id: 19, icon: test1},
//   {id: 20, icon: test1},
//   {id: 21, icon: test1},
//   {id: 22, icon: test1},
//   {id: 23, icon: test1},
//   {id: 24, icon: test1},
//   {id: 25, icon: test1},
//   {id: 26, icon: test1},
//   {id: 27, icon: test1},
//   {id: 28, icon: test1},
//   {id: 29, icon: test1},
//   {id: 30, icon: test1},
//   {id: 29, icon: test1},
//   {id: 30, icon: test1},
//   {id: 29, icon: test1},
//   {id: 30, icon: test1},
//   {id: 29, icon: test1},
//   {id: 30, icon: test1},
//   {id: 29, icon: test1},
//   {id: 30, icon: test1},
//   {id: 29, icon: test1},
//   {id: 30, icon: test1},
// ];

export const SignOut = [{ icon: signout, name: "Sign out" }];
export const letPlay = [{ icon: play, name: "Invite" }];
