"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ip from "@/utils/endPoint";
import { useRouter } from "next/router";

export const getProfile = createAsyncThunk("profile", async (user: any) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${ip}/users/profile/${user}`;
      const respo = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data zab ...", respo.data);
      return respo.data;
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
});
