import { RootState } from "@/store";
import { userLoggedOut } from "../auth/authSlice";
import { client } from "@/api/client";
import { createAppSlice } from "@/store/hooks";

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

type PostUpdated = Pick<Post, 'title' | 'content' | 'id'>
type NewPost = Pick<Post, 'title' | 'content' | 'user'>

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

// this is going to be include in the createSlice
// export const fetchPosts = createAsyncThunk(
//   'posts/fetchPosts',
//   async () => {
//     const res = await client.get<Post[]>('/fakeApi/posts');
//     return res.data;
//   },
//   {
//     condition(arg, thunkApi) {
//       const postsStatus = selectPostsStatus(thunkApi.getState() as RootState)

//       if (postsStatus !== 'idle')
//         return false;
//     }
//   }
// )

const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Another syntaxis for reducers
// const postSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     addPost: {
//       // the only two attributes are reducer and prepare
//       reducer: (state, action: PayloadAction<Post>) => {
//       state.posts.push(action.payload);
//       },
//       prepare(title: string, content: string, userId: string) {
//         return {
//           payload: {
//             title,
//             content,
//             id: nanoid(),
//             user: userId,
//             date: new Date().toISOString(),
//             reactions: {...reactions},
//           },
//           // meta
//           // error
//           // this two can also be added.
//         }
//       },
//     },
//     // use names in past tense
//     postUpdated: (state, action: PayloadAction<PostUpdated>) => {
//       const post = state.posts.find(p => action.payload.id === p.id)

//       if (post)
//         Object.assign(post, action.payload)
//     },
//     reactionAdded: (state, action: PayloadAction<{ postId: string, reaction: ReactionName }>) => {
//       const { postId, reaction } = action.payload;
//       const post = state.posts.find(p => p.id === postId);

//       if (post) {
//         post.reactions[reaction]++;
//       }
//     }
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(userLoggedOut, (state) => {
//         return initialState
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.posts.push(...action.payload)
//       })
//       .addCase(fetchPosts.pending, (state) => {
//         state.status = 'pending';
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message ?? 'unknown error';
//       })
//   },
// })

const postSlice = createAppSlice({
  initialState,
  name: 'post',
  reducers: (create) => {
    return {
      // addPost: create.preparedReducer(
      //   (title: string, content: string, userId: string) => {
      //     return {
      //       payload: {
      //         id: nanoid(),
      //         date: new Date().toISOString(),
      //         title,
      //         content,
      //         user: userId,
      //         reactions: {...reactions},
      //       }
      //     }
      //   },
      //   (state, action) => {
      //     state.posts.push(action.payload)
      //   }
      // ),
      addNewPost: create.asyncThunk(
        async (initialPost: NewPost) => {
          const res = await client.post<Post>('/fakeApi/posts', initialPost);
          return res.data;
        }, {
          fulfilled(state, action) {
            state.status = 'succeeded';
            state.posts.push(action.payload);
          },
          rejected(state, action) {
            state.status = 'failed';
            state.error = action.error.message ?? 'unknown error';
          }
        }
      ),
      postUpdated: create.reducer<PostUpdated>((state, action) => {
        const { id, title, content } = action.payload;
        const post = state.posts.find(p => p.id === id);

        if (post)
          Object.assign(post, { title, content });
      }),
      reactionAdded: create.reducer<{ postId: string; reaction: ReactionName }>((
        state, action
      ) => {
        const { postId, reaction } = action.payload
        const post = state.posts.find(p => p.id === postId)

        if (post)
          post.reactions[reaction]++;
      }),
      fetchPosts: create.asyncThunk(
        async () => {
          const res = await client.get<Post[]>('/fakeApi/posts');
          return res.data;
        },
        {
          options: {
            condition(arg, thunkApi) {
              const { posts } = thunkApi.getState() as RootState;

              if (posts.status !== 'idle')
                return false;
            }
          },
          pending(state, action) {
            state.status = 'pending';
          },
          fulfilled(state, action) {
            state.status = 'succeeded';
            state.posts.push(...action.payload)
          },
          rejected(state, action) {
            state.status = 'failed';
            state.error = action.error.message ?? 'error unknown';
          }
        }
      ),
    }
  },
  extraReducers(builder) {
    builder.addCase(userLoggedOut.fulfilled, (state) => {
      return initialState;
    })
  }
})

export default postSlice.reducer;

export const selectPost = (state: RootState) => state.posts.posts;
export const selectAPost = (id: string | undefined) => (state: RootState) => state.posts.posts.find(post => post.id === id)
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostsByUser = (user: string) => (state: RootState) => state.posts.posts.filter(p => p.user === user)

export const { addNewPost, postUpdated, reactionAdded, fetchPosts } = postSlice.actions;