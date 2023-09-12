import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk(
    "profile",
    async () => {
        try {
                const respo = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                  headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlZTc0NjRmLWNiNGEtNDE5YS05MjI5LTFlYjA4NjI0YjdmMSIsImVtYWlsIjoiaWJlbm1haW5AZ21haWwuY29tIiwidXNlciI6ImliZW5tYWluIiwiaWF0IjoxNjk0MTgwMzIwLCJleHAiOjE2OTUwNDQzMjB9.izG5Om77OBtyUCR-m5wtj5Hy8i6FnMXqn1vlSS-Xqss`,
                  }
                },)
                console.log("respo ha ===", respo.data);
                return respo.data;
        } catch (error) {
            console.log(error);
        }
    }
)