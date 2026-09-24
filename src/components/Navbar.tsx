import { selectCurrentUser } from '@/store/features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React from 'react'
import { Link } from 'react-router-dom';
import { UserIcon } from './UserIcon';
import { userLoggedOut } from '@/store/features/auth/authSlice';
import { fetchNotifications, selectUnreadNotificationsCount } from '@/store/features/notifications/notificationsSlice';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const numUreadNotifications = useAppSelector(selectUnreadNotificationsCount)

  const isLoggedIn = !!user

  let navContent: React.ReactNode = null;

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(userLoggedOut())
    };

    const fetchNewNotifications = () => {
      dispatch(fetchNotifications())
    }

    let unreadNotificationsBadge: React.ReactNode | undefined;

    if (numUreadNotifications > 0)
      unreadNotificationsBadge = <span className="badge">{numUreadNotifications}</span>

    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to="/posts">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
          <button type="button" className="button small" onClick={fetchNewNotifications} >
            Refresh Notifications
          </button>
        </div>
        <div className="userDetails">
          <UserIcon size={32} />
          {user.name}
          <button className="button small" onClick={onLogoutClicked}>
            Log Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        { navContent }
      </section>
    </nav>
  )
}
