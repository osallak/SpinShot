import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {parseJwt} from "../extractToken"
import ip from "@/endpoint/ip";
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
            console.log(my_token);
            const respo = await axios.get(`${ip}/users/profile/${id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            },)
            return respo.data;
          }
        } catch (error) {
            console.log(error);
        }
    }
)
