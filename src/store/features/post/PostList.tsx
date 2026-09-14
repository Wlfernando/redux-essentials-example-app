import { fetchPosts, selectPost, selectPostsStatus } from "@/store/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "@/components/TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useEffect } from "react";

export default function PostsList() {
  const posts = useAppSelector(selectPost);
  const status = useAppSelector(selectPostsStatus);
  const dispatch = useAppDispatch();

  const reversePosts = posts.toSorted((a, b) => b.date.localeCompare(a.date))

  useEffect(() => {
    if (status === 'idle')
      dispatch(fetchPosts())
  }, [status, dispatch])

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
          <ReactionButtons post={p}/>
        </article>
      ))}
    </section>
  </>
}