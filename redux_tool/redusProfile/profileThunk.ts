import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const getProfile = createAsyncThunk(
    "profile",
    async () => {
        try {
                const token = localStorage.getItem('token');
                if (token)
                {
                  const decodedToken = jwt_decode(token);
                  const decodedData = decodedToken as {username: string};
                  const username = decodedData.username;
                  const respo = await axios.get(`http://34.95.172.25/users/profile/${username}`, {
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
