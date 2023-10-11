import dataFriends from "@/types/friendsType";
import { createContext } from "react";
import { atom } from "recoil";
import dataSubSideBar from "@/types/messagesArrays"
import allMessagesType from "@/types/messagesArrays"

export const userContext = createContext<dataFriends[] | []>([]);

export const friendRequestsAtom = atom({
	key: `friendRequests-${Math.random()}`,
	default: [],
});

export const currentFriendsAtom = atom({
	key: `currentFriends-${Math.random()}`,
	default: [],
});

export const messageContext = createContext<allMessagesType[] | []>([]);

export const chatAll = atom({
	key: `chatAll-${Math.random()}`,
	default: {},
});