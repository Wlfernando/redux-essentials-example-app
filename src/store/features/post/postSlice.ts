import { RootState } from "@/store";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { id } from "date-fns/locale";

export interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: {
    thumbsUp: number;
    tada: number;
    heart: number;
    rocket: number;
    eyes: number;
  }
}

type PostUpdated = Omit<Post, 'user'>

const reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};

export type ReactionName = keyof typeof reactions;

const initialState: Post[] = ([
  ['1', 'First Post!', 'Hello!', '0', 10],
  ['2', 'Second Post', 'More Text', '2', 5],
] as [string, string, string, string, number][]).map(([id, title, content, user, minutes]) => ({
  id,
  title,
  content,
  user,
  date: sub(new Date(), { minutes }).toISOString(),
  reactions: {...reactions},
}));

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
          payload: {
            title,
            content,
            id: nanoid(),
            user: userId,
            date: new Date().toISOString(),
            reactions: {...reactions},
          },
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
    reactionAdded: (state, action: PayloadAction<{ postId: string, reaction: ReactionName }>) => {
      const { postId, reaction } = action.payload;
      const post = state.find(p => p.id === postId);

      if (post) {
        post.reactions[reaction]++;
      }
    }
  },
})

export default postSlice.reducer;

export const selectPost = (state: RootState) => state.posts;
export const selectAPost = (id: string | undefined) => (state: RootState) => state.posts.find(post => post.id === id)

export const { addPost, postUpdated, reactionAdded } = postSlice.actions;