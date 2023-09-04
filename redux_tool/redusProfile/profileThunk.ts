import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk(
    "profile",
    async () => {
        try {
                const respo = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                  headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyZXgiLCJzdWIiOiIxMmY5Mzg1MS1lNjM4LTQyMDUtOGRhOS1kMThhZWNmN2E0MGMiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5Mzc2ODY5MCwiZXhwIjoxNjkzODU1MDkwfQ.zw2T5gKme6PUurS9MqqOoDdQFw2lqn3Zv1sjbilPN7g`,
                  }
                },
                )
                console.log("respo ===", JSON.stringify(respo));
                return respo.data;
        } catch (error) {
            
        }
    }
)