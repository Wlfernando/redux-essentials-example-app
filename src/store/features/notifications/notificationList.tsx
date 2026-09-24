import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { allNotificationsRead, selectAllNotifications } from "./notificationsSlice";
import PostAuthor from "../post/PostAuthor";
import TimeAgo from "@/components/TimeAgo";
import { useLayoutEffect } from "react";
import classnames from "classnames";

export default function NotificationList() {
  const notifications = useAppSelector(selectAllNotifications)
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderNotifications = notifications.map(n => {
    const notificationClassName = classnames('notification', {
      new: n.isNew,
    });

    return (
      <div key={n.id} className={notificationClassName}>
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