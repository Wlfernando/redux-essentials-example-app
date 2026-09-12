import { addPost, Post } from "@/store/features/post/postSlice";
import { useAppDispatch } from "@/store/hooks";
import { nanoid } from "@reduxjs/toolkit";

export default function AddPostForm() {
  const dispatch = useAppDispatch()
  const POST_CONTENT = "postContent";
  const POST_TITLE = "postTitle";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const post: Post = {
        id: nanoid(),
        title: form.get(POST_TITLE) as string, 
        content: form.get(POST_CONTENT) as string,
      }

    dispatch(addPost(post))
  }

  return <>
    <section>
      <h2>Add a new Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor={POST_TITLE}>Post Title:</label>
        <input
          id={POST_TITLE}
          name={POST_TITLE}
          type="text"
          required
        />
        <label htmlFor={POST_CONTENT}>Content:</label>
        <textarea
          id={POST_CONTENT}
          name={POST_CONTENT}
          required
        />
        <button type="submit">Save Post</button>
      </form>
    </section>
  </>
}