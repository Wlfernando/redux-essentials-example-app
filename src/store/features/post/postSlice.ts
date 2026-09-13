import { RootState } from "@/store";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
}

type PostUpdated = Omit<Post, 'user'>

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0' },
  { id: '2', title: 'Second Post', content: 'More text', user: '2' },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      // the only two attributes are reducer and prepare
      reducer: (state, action: PayloadAction<Post>) => {
      state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {title, content, id: nanoid(), user: userId},
          // meta
          // error
          // this two can also be added.
        }
      },
    },
    // use names in past tense
    postUpdated: (state, action: PayloadAction<PostUpdated>) => {
      const post = state.find(p => action.payload.id === p.id)

      if (post)
        Object.assign(post, action.payload)
    },
  },
})

export default postSlice.reducer;

export const selectPost = (state: RootState) => state.posts;
export const selectAPost = (id: string | undefined) => (state: RootState) => state.posts.find(post => post.id === id)

export const { addPost, postUpdated } = postSlice.actions;