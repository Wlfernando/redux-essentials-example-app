import { useAppSelector } from "@/store/hooks";
import { selectAllNotifications } from "./notificationsSlice";
import PostAuthor from "../post/PostAuthor";
import TimeAgo from "@/components/TimeAgo";

export default function NotificationList() {
  const notifications = useAppSelector(selectAllNotifications)

  const renderNotifications = notifications.map(n => {
    return (
      <div key={n.id} className="notification">
        <div>
          <b>
            <PostAuthor userId={n.user} showPrefix={false} />
          </b>{' '}
          {n.message}
        </div>
        <TimeAgo timestamp={n.date} />
      </div>
    )
  })

  return (
    <section className="notificationsList" >
      <h2>Notifications</h2>
      { renderNotifications }
    </section>
  )
}