import { addPost, Post } from "@/store/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAllUsers } from "../users/usersSlice";

export default function AddPostForm() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers)

  const POST_CONTENT = "postContent";
  const POST_TITLE = "postTitle";
  const POST_AUTOR = "postAuthor";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const post: Omit<Post, 'id'> = {
        title: form.get(POST_TITLE) as string, 
        content: form.get(POST_CONTENT) as string,
        user: form.get(POST_AUTOR) as string,
      }

    dispatch(addPost(post.title, post.content, post.user))
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
        <label htmlFor={POST_AUTOR}>Author:</label>
        <select id={POST_AUTOR} name={POST_AUTOR} required>
          <option value="" disabled></option>
          {users.map(u =>
            <option value={u.id} key={u.id}>{u.name}</option>
          )}
        </select>
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