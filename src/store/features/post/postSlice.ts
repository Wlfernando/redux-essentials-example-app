import { RootState } from "@/store";
import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { id } from "date-fns/locale";
import { userLoggedOut } from "../auth/authSlice";
import { client } from "@/api/client";

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

interface PostState {
  posts: Post[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const res = await client.get<Post[]>('/fakeApi/posts');
    return res.data;
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState() as RootState)

      if (postsStatus !== 'idle')
        return false;
    }
  }
)

const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      // the only two attributes are reducer and prepare
      reducer: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
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
      const post = state.posts.find(p => action.payload.id === p.id)

      if (post)
        Object.assign(post, action.payload)
    },
    reactionAdded: (state, action: PayloadAction<{ postId: string, reaction: ReactionName }>) => {
      const { postId, reaction } = action.payload;
      const post = state.posts.find(p => p.id === postId);

      if (post) {
        post.reactions[reaction]++;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(userLoggedOut, (state) => {
        return initialState
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'unknown error';
      })
  },
})

export default postSlice.reducer;

export const selectPost = (state: RootState) => state.posts.posts;
export const selectAPost = (id: string | undefined) => (state: RootState) => state.posts.posts.find(post => post.id === id)
export const selectPostsStatus = (state: RootState) => state.posts.status;

export const { addPost, postUpdated, reactionAdded } = postSlice.actions;