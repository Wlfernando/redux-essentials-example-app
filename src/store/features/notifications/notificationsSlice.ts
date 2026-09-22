import { client } from "@/api/client";
import { AppDispatch, RootState } from "@/store";
import { createAppSlice } from "@/store/hooks";

export interface ServerNotification {
  id: string;
  date: string;
  message: string;
  user: string;
}

const initialState: ServerNotification[] = [];

const notificationSlice = createAppSlice({
  name: 'notifications',
  initialState,
  reducers: (create) => ({
      fetchNotifications: create.asyncThunk(
        async (_: never, thunkApi) => {
          const allNotifications = selectAllNotifications(thunkApi.getState() as RootState) as ServerNotification[];
          const [latestNotification] = allNotifications;
          const latestTimestamp = latestNotification?.date ?? '';
          const response = await client.get<ServerNotification[]>(
            `/fakeApi/notifications?since=${latestTimestamp}`
          );

          return response.data;
        }, {
          fulfilled(state, action) {
            state.push(...action.payload)
            state.sort((a, b) => b.date.localeCompare(a.date))
          }
        }
      )
    }
  )
});

export default notificationSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;