import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
import RequestConfig from './components/RequestConfig';

function App() {
  return (
    <main className="app-shell">
      <h1 className="app-title">DemoAxios</h1>
      <PostList />
      <CreatePost />
      <UpdatePost />
      <PatchPost />
      <DeletePost />
      <RequestConfig />
    </main>
  );
}

export default App;
