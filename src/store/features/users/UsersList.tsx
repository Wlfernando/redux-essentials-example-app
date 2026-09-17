import { useAppSelector } from "@/store/hooks";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

export default function UsersList() {
  const users = useAppSelector(selectAllUsers)

  return <section>
    <h2>Users</h2>
    <ul>
      {users.map(u => <li key={u.id}>
        <Link to={'/users/' + u.id}>{u.name}</Link>
      </li>)}
    </ul>
  </section>
}