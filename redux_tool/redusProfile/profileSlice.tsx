import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {objType} from '../../src/pages/profile/interfaces'
import Levle from '@/pages/profile/Levle'
import { get } from 'http'
import { getProfile } from './profileThunk'

export interface ProfileState {
  profile: any,
  isLoading: boolean
}

const initialState: ProfileState = {
  profile: {},
  isLoading: false 
}

export const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setProfile: (state, action:PayloadAction<any>) => {
      state.profile = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getProfile.pending , (state, action) => {
            state.isLoading = true;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload
        })
        .addCase(getProfile.rejected , (state, action) => {
            state.isLoading = false;
        })
  },
})

// Action creators are generated for each case reducer function
export const { setProfile } = ProfileSlice.actions
export default ProfileSlice.reducer