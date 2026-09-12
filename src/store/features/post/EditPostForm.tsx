import { useAppSelector } from "@/store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { postUpdated, selectAPost } from "./postSlice";
import { useDispatch } from "react-redux";
import React from "react";

export default function EditPostForm() {
  const { postId } = useParams();
  const nav = useNavigate();

  const post = useAppSelector(selectAPost(postId))
  const dispatch = useDispatch();

  if (!post)
    return <>
      <section>
        <h2>Post not found!</h2>
      </section>
    </>

  const POST_TITLE = 'postTitle';
  const POST_CONTENT = 'postContent';

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { elements } = e.currentTarget
    const getValue = (element: string) => (elements[element as keyof typeof elements] as HTMLInputElement).value

    const newPost = {
      title: getValue(POST_TITLE),
      content: getValue(POST_CONTENT),
      id: post.id,
    }

    dispatch(postUpdated(newPost))
    nav('/post/' + postId)
  }

  return <>
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor={POST_TITLE}>Post title:</label>
        <input
          type="text"
          id={POST_TITLE}
          name={POST_TITLE}
          defaultValue={post.title}
          required
        />
        <label htmlFor={POST_CONTENT}>Content:</label>
        <textarea
          id={POST_CONTENT}
          name={POST_CONTENT}
          defaultValue={post.content}
          required
        />
        <button type="submit">Edit</button>
      </form>
    </section>
  </>
}