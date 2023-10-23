import {
	default as createChannelType,
	default as exploreChannelType,
} from "@/types/channelsType";
import dataFriends from "@/types/friendsType";
import conversationChannelType, {
	default as allMessagesType,
	default as dataConversation,
} from "@/types/messagesArrays";

import { createContext } from "react";
import { atom } from "recoil";

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

export const conversationChannelContext = createContext<
  conversationChannelType[] | []
>([]);

export const conversationChannelAtom = atom({
	key: `conversationChannel-${Math.random()}`,
	default: [],
})

// export const roomsContext = createContext<roomsData[] | []>([]);

// export const roomsAtom = atom({
//   key: `roomsAtom-${Math.random()}`,
//   default: [],
// });

export const exploreChannel = createContext<exploreChannelType[] | []>([]);

export const exploreChannelAtom = atom({
  key: `exploreChannel-${Math.random()}`,
  default: [],
});

export const createChannel = createContext<createChannelType[] | []>([]);

export const createChannelAtom = atom({
  key: `createChannel-${Math.random()}`,
  default: [],
});

export const tokenContext = createContext<string>("");

export const globalToken = atom({
  key: `globalToken-${Math.random()}`,
  default: "",
});

export const profile = createContext<any[] | []>([])

export const profileAtom = atom({
  key: `profil-${Math.random()}`,
  default: [],
})
