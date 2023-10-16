import {
  default as individualConversationType,
  default as individualType,
} from "@/types/individulaTypes";
import { createContext } from "react";
import { atom } from "recoil";

export const individualContext = createContext<individualType[] | []>([]);

export const individualAtom = atom({
  key: `individualAtom-${Math.random()}`,
  default: [],
});

export const individualConversationContext = createContext<
  individualConversationType[] | []
>([]);

export const individualConversationAtom = atom({
  key: `individualConversationAtom-${Math.random()}`,
  default: [],
});
