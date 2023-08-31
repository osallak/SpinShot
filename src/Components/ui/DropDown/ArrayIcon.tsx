import AddIcon from "../../../../public/AddIcon.svg";
import trashIcon from "../../../../public/trashIcon.svg"
import playIcon from "../../../../public/playIcon.svg"
import sittingIcon from "../../../../public/settingIcon.svg"
import kickIcon from "../../../../public/kickIcon.svg"
import banIcon from "../../../../public/banIcon.svg"
import muteIcon from "../../../../public/muteIcon.svg"
import adminIcon from "../../../../public/adminIcon.svg"
import profile from "./../../../../public/profileIcon.svg"
import play from "./../../../../public/playIcon.svg"
import friend from "./../../../../public/friendIcon.svg"
import notification from "./../../../../public/notificationIcon.svg"
import seaech from "./../../../../public/searchIcon.svg"
import message from "./../../../../public/messageIcon.svg"
import logo from "./../../../../public/logo.svg"
import line from "./../../../../public/line.svg"
import search from "./../../../../public/searchIcon.svg"
import signout from "./../../../../public/signOut.svg"


export const Array = [
    {icon: AddIcon, name: "Add" },
    {icon: trashIcon, name: "Delete conversation" },
    {icon: playIcon, name: "let's play" },
];

export const ArrayUser = [

    {icon: trashIcon, name: "Delete conversation" },
    {icon: sittingIcon, name: "Settings" },
];

export const ArrayChat = [

    {icon: kickIcon, name: "Kick" },
    {icon: banIcon, name: "Ban" },
    {icon: muteIcon, name: "Mute" },
    {icon: adminIcon, name: "Add as admin" },
];

export const ArrayMute = [

    {name: "For 1 Hour" },
    {name: "For 12 Hour" },
    {name: "Until I turn it back on" },
];

export const Icons = [
    {icon: seaech,  route: "/search"},
    {icon: profile,  route: "/profile"},
    {icon: message,  route: "/message"},
    {icon: friend,  route: "/friend"},
    {icon: play,  route: "/play"},
    {icon: notification,  route: "/notification"},
];

export const buttons = [
    {id: 1, text: "Personal Information", route: "/Personal Information"},
    {id: 2, text: "Achievements", route: "/Achievements"},
    {id: 3, text: "Match History", route: "/Match History"},
    {id: 4, text: "Security", route: ""},
];

export const SidbarIcon = [
    {icon: logo},
    {icon: line},
    {icon: search},
    {icon: profile},
    {icon: message},
    {icon: friend},
    {icon: play},
    {icon: notification},
];

export const SignOut = [
    {icon: signout , name: "Sign out"},
];