import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAPost } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "@/components/TimeAgo";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "../users/usersSlice";

export default function SinglePostPage() {
  const { postId } = useParams();

  const post = useSelector(selectAPost(postId));
  const currentUser = useAppSelector(selectCurrentUser);

  if (!post)
    return <>
      <section>
        <h2>Post not found</h2>
      </section>
    </>

  const canEdit = currentUser?.id === post.user

  return <>
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        { canEdit && <Link to={'/editPost/' + post.id} className="button">Edit Post</Link> }
      </article>
    </section>
  </>
}