import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk(
    "profile",
    async () => {
        try {
                const respo = await axios.get(`http://34.95.172.25/users/profile/ibenmain`, {
                  headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imlzc2FtIiwic3ViIjoiNDhjOGQwYzktNTJiMy00NGY5LTllMmMtNzFkY2VhYzM4ZmM1IiwiaXNzIjoic3BpbnNob3QiLCJpYXQiOjE2OTY1MzMwNjYsImV4cCI6MTY5NjYxOTQ2Nn0.pRPiFYoGUVEH6FqqxABHooJwYRK4dtnisV9ok8k7XAI`,
                  }
                },)
                return respo.data;
        } catch (error) {
            console.log(error);
        }
    }
)