import { fetchPosts, selectPost, selectPostsError, selectPostsStatus } from "@/store/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "@/components/TimeAgo";
import ReactionButtons from "./ReactionButtons";
import React, { useEffect } from "react";
import { Spinner } from "@/components/Spinner";

export default function PostsList() {
  const posts = useAppSelector(selectPost);
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle')
      dispatch(fetchPosts())
  }, [status, dispatch])

  let content: React.ReactNode = null;

  if (status === 'pending') {
    content = <Spinner text="loading..." />
  }

  else if (status === 'succeeded') {
    const reversePosts = posts.toSorted((a, b) => b.date.localeCompare(a.date))
    
    content = reversePosts.map(p => (
        <article key={p.id} className="post-excerpt">
          <h3>
            <Link to={'/post/' + p.id}>{p.title}</Link>
          </h3>
          <p className="post-content">{p.content}</p>
          <PostAuthor userId={p.user} />
          <TimeAgo timestamp={p.date} />
          <ReactionButtons post={p}/>
        </article>
      ))
  } else if (status === 'failed') {
    content = <div>{ error }</div>
  }

  return <>
    <section className="posts-list">
      <h2>Post</h2>
      { content }
    </section>
  </>
}