import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import { selectUserName } from "../auth/authSlice";
import { createAppAsyncThunk } from "@/store/withTypes";
import { client } from "@/api/client";

interface User {
  id: string;
  name: string;
}

// const initialState: User[] = [
//   { id: '0', name: 'Tianna Jenkins' },
//   { id: '1', name: 'Kevin Grant' },
//   { id: '2', name: 'Madison Price' },
// ];

export const fetchUsers = createAppAsyncThunk(
  'users/fetchUsers',
  async () => {
    const res = await client.get<User[]>('/fakeApi/users');
    return res.data;
  }
)

const initialState: User[] = [];

const userSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    })
  }
});

export default userSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (id: string | null) => (state: RootState) => state.users.find(u => u.id === id);

export const selectCurrentUser = (state: RootState) => {
  const currentUserName = selectUserName(state);
  return selectUserById(currentUserName)(state);
}
