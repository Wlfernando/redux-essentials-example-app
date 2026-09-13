import { selectPost } from "@/store/features/post/postSlice";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "@/components/TimeAgo";

export default function PostsList() {
  const posts = useAppSelector(selectPost);
  const reversePosts = posts.toSorted((a, b) => b.date.localeCompare(a.date))

  return <>
    <section className="posts-list">
      <h2>Post</h2>
      {reversePosts.map(p => (
        <article key={p.id} className="post-excerpt">
          <h3>
            <Link to={'/post/' + p.id}>{p.title}</Link>
          </h3>
          <p className="post-content">{p.content}</p>
          <PostAuthor userId={p.user} />
          <TimeAgo timestamp={p.date} />
        </article>
      ))}
    </section>
  </>
}