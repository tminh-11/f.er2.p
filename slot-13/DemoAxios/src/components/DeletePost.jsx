import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState(() => new Set());
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API, { params: { _limit: 5 } })
      .then((response) => setPosts(response.data))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;

    setDeletingIds((currentIds) => new Set(currentIds).add(id));
    setError(null);
    setMessage('');

    try {
      const response = await axios.delete(`${API}/${id}`);
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
      setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(id);
        return nextIds;
      });
    }
  };

  return (
    <section className="post-card create-post-card">
      <h2 className="post-heading">DELETE – Xóa bài viết</h2>
      <p className="post-caption">Lấy 5 bài viết đầu tiên và xóa từng bài bằng DELETE</p>

      {loading ? (
        <div className="post-list-state">Đang tải bài viết...</div>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li className="post-item" key={post.id}>
              <span className="post-id">#{post.id}</span>
              <span className="post-title">{post.title}</span>
              <button
                className="delete-button"
                type="button"
                onClick={() => handleDelete(post.id)}
                disabled={deletingIds.has(post.id)}
              >
                {deletingIds.has(post.id) ? 'Đang xóa...' : 'Xóa'}
              </button>
            </li>
          ))}
        </ul>
      )}

      {message && <p className="post-feedback" role="status">{message}</p>}
      {error && <p className="post-feedback post-list-error" role="alert">Error: {error}</p>}
    </section>
  );
};

export default DeletePost;
