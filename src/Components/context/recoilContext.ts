import dataFriends from "@/types/friendsType";
import { createContext } from "react";
import { atom } from "recoil";
import dataSubSideBar from "@/types/messagesArrays"
import allMessagesType from "@/types/messagesArrays"
import exploreChannelType from "@/types/channelsType";
import createChannelType from "@/types/channelsType"

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

export const exploreChannel = createContext<exploreChannelType[] | []>([]);

export const exploreChannelAtom = atom({
	key: `exploreChannel-${Math.random()}`,
	default: []
})

// export const createChannel = createContext<createChannelType[] | []> ([]);

export const createChannelAtom = atom({
	key: `createChannel`,
	default: [],
})

export const tokenContext = createContext<string>("");

export const globalToken = atom({
	key: `globalToken-${Math.random()}`,
	default: "",
})
