import dataFriends from "@/types/friendsType";
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

export const blockedFriendsAtom = atom({
	key: `blockedfriend-${Math.random()}`,
	default: [],
});