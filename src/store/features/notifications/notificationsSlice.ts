import { client } from "@/api/client";
import { AppDispatch, RootState } from "@/store";
import { createAppSlice } from "@/store/hooks";

export interface ServerNotification {
  id: string;
  date: string;
  message: string;
  user: string;
}

export interface ClientNotification extends ServerNotification {
  read: boolean;
  isNew: boolean;
}

const initialState: ClientNotification[] = [];

const notificationSlice = createAppSlice({
  name: 'notifications',
  initialState,
  reducers: (create) => ({
      fetchNotifications: create.asyncThunk(
        async (_: void, thunkApi) => {
          const allNotifications = selectAllNotifications(thunkApi.getState() as RootState) as ServerNotification[];
          const [latestNotification] = allNotifications;
          const latestTimestamp = latestNotification?.date ?? '';
          const response = await client.get<ServerNotification[]>(
            `/fakeApi/notifications?since=${latestTimestamp}`
          );

          return response.data;
        }, {
          fulfilled(state, action) {
            const notificationsWithMetadata: ClientNotification[] = 
              action.payload.map(notification => ({
                ...notification,
                read: false,
                isNew: true,
              }));

            state.forEach(notification => {
              notification.isNew = !notification.read;
            })

            state.push(...notificationsWithMetadata)
            state.sort((a, b) => b.date.localeCompare(a.date))
          }
        }
      ),
      allNotificationsRead: create.reducer((state) => {
        state.forEach(notification => {
          notification.read = true;
        })
      })
    }
  )
});

export default notificationSlice.reducer;

export const { fetchNotifications, allNotificationsRead } = notificationSlice.actions;

export const selectAllNotifications = (state: RootState) => state.notifications;

export const selectUnreadNotificationsCount = (state: RootState) => {
  const allNotifications = selectAllNotifications(state);
  const unreadNotifications = allNotifications.filter(notification => !notification.read);

  return unreadNotifications.length;
}