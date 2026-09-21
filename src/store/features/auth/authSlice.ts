import { client } from "@/api/client";
import { RootState } from "@/store";
import { createAppSlice } from "@/store/hooks";

interface AuthState {
  userName: string | null;
}

const initialState: AuthState = {
  userName: null,
};

const authSlice = createAppSlice({
  initialState,
  name: 'auth',
  reducers: (create) => ({
    userLoggedIn: create.asyncThunk(
      async (username: string) => {
        await client.post('/fakeApi/login', { username })
        return username;
      }, {
        fulfilled(state, action) {
          state.userName = action.payload;
        },
      }
    ),
    userLoggedOut: create.asyncThunk(
      async () => {
      await client.post('/fakeApi/logout', {})
    }, {
      fulfilled(state) {
        state.userName = null;
      },
    }),
  }),
})

export default authSlice.reducer;

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const selectUserName = (state: RootState) => state.auth.userName;
