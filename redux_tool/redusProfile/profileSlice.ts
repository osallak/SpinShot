import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getProfile } from "./profileThunk";

export interface ProfileState {
  profile: any;
  auth_status : boolean;
}

const initialState: ProfileState = {
  profile: {},
  auth_status: false,
};

export const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    updateUsename: (state, action: PayloadAction<any>) => {
      state.profile.username = action.payload;
    },
    updateFirstName: (state, action: PayloadAction<any>) => {
      state.profile.profile.name.givenName = action.payload;
    },
    updateLastName: (state, action: PayloadAction<any>) => {
      state.profile.profile.name.lastName = action.payload;
    },
    updateImage: (state, action: PayloadAction<any>) => {
      state.profile.profile.name.lastName = action.payload;
    },
    updateAuthStatus(state, action: PayloadAction<boolean>) {
      state.auth_status = action.payload;
    }
  
  },

  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setProfile, updateUsename, updateFirstName, updateLastName, updateImage, updateAuthStatus} = ProfileSlice.actions;
export default ProfileSlice.reducer;
