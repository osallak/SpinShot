import messagesType from "@/types/channelConversationType"
import channelType, { usersListType } from "@/types/channelTypes";
import { createContext } from "react";
import { atom } from "recoil";

export const channelContext = createContext<channelType[] | []>([]);

export const channelAtom = atom({
    key: `channelAtom-${Math.random()}`,
    default: [] as any,
})

export const channelConversationContext = createContext<messagesType[] | []>([]);

export const channelConversationAtom = atom({
    key: `channelConversationAtom-${Math.random()}`,
    default: [],
})

export const blockedUsersContext = createContext<string[] | []>([]);

export const blockedUsersAtom = atom({
    key: `blockedUsers-${Math.random()}`,
    default: [],
})

export const usersListContext = createContext<usersListType[] | []>([]);

export const usersListAtom = atom({
    key: `usersList-${Math.random()}`, 
    default: [],
})
