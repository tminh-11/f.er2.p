import { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: { userId: 1, _limit: 5 },
      })
      .then((response) => setPosts(response.data))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="post-list-state">Loading posts...</div>;
  if (error) return <div className="post-list-state post-list-error" role="alert">Error: {error}</div>;

  return (
    <section className="post-card">
      <h2 className="post-heading">Bài viết của user 1</h2>
      <p className="post-caption">5 bài viết mới nhất từ JSONPlaceholder</p>
      <ul className="post-list">
        {posts.map((post) => (
          <li className="post-item" key={post.id}>
            <span className="post-id">#{post.id}</span>
            <span className="post-title">{post.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostList;
