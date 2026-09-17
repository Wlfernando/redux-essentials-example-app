import { useAppSelector } from "@/store/hooks";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../post/postSlice";

export default function UserPage() {
  const { userId } = useParams();

  const user = useAppSelector(selectUserById(userId!))!

  const postsForUser = useAppSelector(selectPostsByUser(user.id))

  return <section>
    <h2>{user.name}</h2>
    <ul>
      {postsForUser.map(p => <li key={p.id}>
        <Link to={'/post/' + p.id}>{p.title}</Link>
      </li>)}
    </ul>
  </section>
}