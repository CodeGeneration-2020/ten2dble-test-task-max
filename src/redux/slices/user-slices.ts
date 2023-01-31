import { createSlice } from "@reduxjs/toolkit";

import { TInitialState } from "./user-slices.types";

const initialState: TInitialState = {
  userTotalScore: 0,
  userTries: 0
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateScore: (state, actions) => {
      state.userTotalScore += actions.payload
    },
    updateTries: (state, actions) => {
      state.userTries += actions.payload
    }
  }
})

export const {updateScore, updateTries} = userSlice.actions
export default userSlice.reducer