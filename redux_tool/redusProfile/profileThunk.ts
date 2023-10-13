"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {parseJwt} from "../extractToken"
import ip from "@/utils/endPoint";
import { Router, useRouter } from "next/router";

export const getProfile = createAsyncThunk(
    "profile",
    async () => {
        try {
          const token = localStorage.getItem('token');
          if (token)
          {
            const my_token = parseJwt(token);
            const id = my_token.sub
            const url = `${ip}/users/profile/${id}`;
            const respo = await axios.get(url, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            },)
            console.log( "data f ", respo);
            return respo.data;
          }
        } catch (error) {
            console.log(error);
        }
    }
)
