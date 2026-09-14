import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import PostsList from './store/features/post/PostList';
import AddPostForm from './store/features/post/AddPostForm';
import SinglePostPage from './store/features/post/SinglePostPage';
import EditPostForm from './store/features/post/EditPostForm';
import LoginPage from './store/features/auth/LoginPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path='/'
            element={<LoginPage/>}
          >
          </Route>
          <Route
            path="/posts"
            element={
              <>
                <AddPostForm />
                <PostsList />
              </>
            }
          ></Route>
          <Route
            path='/post/:postId'
            element={
              <SinglePostPage />
            }
          />
          <Route
            path='/editPost/:postId'
            element={<EditPostForm />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
