import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userName: string | null;
}

const initialState: AuthState = {
  userName: null,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    userLoggedIn(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    userLoggedOut(state) {
      state.userName = null;
    },
  },
})

export default authSlice.reducer;

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const selectUserName = (state: RootState) => state.auth.userName;
