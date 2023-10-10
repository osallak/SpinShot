import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import jwt from 'jsonwebtoken';
import axios from "axios";
import {parseJwt} from "../extractToken"

export const getProfile = createAsyncThunk(
    "profile",
    async () => {
        try {
                const token = localStorage.getItem('token');
                console.log(token);
                if (token)
                {
                  const my_token = parseJwt(token);
                  const id = my_token.sub
                  console.log(my_token);
                  const respo = await axios.get(`http://e3r10p13.1337.ma:3000/users/profile/1b227993-6fb7-4f08-8cf4-899b745bfb26`, {
                    headers: {
                      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikplc3N5Y2FfTHluY2giLCJzdWIiOiIxYjIyNzk5My02ZmI3LTRmMDgtOGNmNC04OTliNzQ1YmZiMjYiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5Njg4MTcxNSwiZXhwIjoxNjk2OTY4MTE1fQ.BcphZxRWilg2GouIL5FzDEo4Tkayqx8L_bQfPicaPPQ`,
                    }
                  },)
                  return respo.data;
                }
        } catch (error) {
            console.log(error);
        }
    }
)
