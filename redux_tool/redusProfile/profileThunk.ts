"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ip from "@/utils/endPoint";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { setProfile, updateImage } from "./profileSlice";
import { store } from "..";
import test from "@/../public/test1.svg";

export const getProfile = createAsyncThunk("profile", async (user: any) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.NEXT_PUBLIC_API}/users/profile/${user}`;
      const respo = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return respo.data;
    }
  } catch (error: any) {
    toast.error("You are now allowed to view this profile", {
      id: 'profile-error',
    });
    store.dispatch(setProfile({}));
    // store.dispatch(updateImage(test));
    // store.dispatch((test));
    // // console.log(error);
    throw error;
  }
});
