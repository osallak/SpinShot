import {
  default as individualConversationType,
  default as individualType,
} from "@/types/individualTypes";
import { createContext } from "react";
import { atom } from "recoil";

// export const individualContext = createContext<individualType[] | []>([]);

export const individualAtom = atom({
  key: `individualAtom-${Math.random()}`,
  default: [] as any,
});

// export const individualConversationContext = createContext<
//   individualConversationType[] | []
// >([]);

export const individualConversationAtom = atom({
  key: `individualConversationAtom-${Math.random()}`,
  default: [] as any,
});
