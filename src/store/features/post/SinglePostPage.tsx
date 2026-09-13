import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAPost } from "./postSlice";
import PostAuthor from "./PostAuthor";

export default function SinglePostPage() {
  const { postId } = useParams();

  const post = useSelector(selectAPost(postId));

  if (!post)
    return <>
      <section>
        <h2>Post not found</h2>
      </section>
    </>

  return <>
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <Link to={'/editPost/' + post.id} className="button">Edit Post</Link>
      </article>
    </section>
  </>
}