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
                  const respo = await axios.get(`http://34.95.172.25/users/profile/${id}`, {
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
