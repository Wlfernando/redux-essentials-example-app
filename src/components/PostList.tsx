import { selectPost } from "@/store/features/post/postSlice";
import { useAppSelector } from "@/store/hooks";

export default function PostsList() {
  const posts = useAppSelector(selectPost);

  return <>
    <section className="posts-list">
      <h2>Post</h2>
      {posts.map(p => <>
        <article key={p.id} className="post-excerpt">
          <h3>{p.title}</h3>
          <p className="post-content">{p.content}</p>
        </article>
      </>)}
    </section>
  </>
}