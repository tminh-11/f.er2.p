import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => setPost(response.data))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!post) return;

    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.put(URL, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      });
      setResult({ status: response.status, data: response.data });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="post-list-state create-post-card">Loading post...</div>;
  }

  if (error && !post) {
    return <div className="post-list-state post-list-error create-post-card" role="alert">Error: {error}</div>;
  }

  return (
    <section className="post-card create-post-card">
      <h2 className="post-heading">Cập nhật bài viết #{post.id}</h2>
      <p className="post-caption">Chỉnh sửa nội dung và gửi toàn bộ bài viết bằng PUT</p>

      <form className="create-post-form" onSubmit={handleUpdate}>
        <label className="form-label" htmlFor="update-post-title">Title</label>
        <input
          className="form-control"
          id="update-post-title"
          type="text"
          value={post.title}
          onChange={(event) => setPost({ ...post, title: event.target.value })}
          required
        />

        <label className="form-label" htmlFor="update-post-body">Body</label>
        <textarea
          className="form-control"
          id="update-post-body"
          value={post.body}
          onChange={(event) => setPost({ ...post, body: event.target.value })}
          rows={4}
          required
        />

        <button className="submit-button" type="submit" disabled={submitting}>
          {submitting ? 'Đang cập nhật...' : 'Cập nhật (PUT)'}
        </button>
      </form>

      {error && <p className="post-feedback post-list-error" role="alert">Error: {error}</p>}
      {result && (
        <div className="post-result" role="status">
          <p className="result-status">Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </section>
  );
};

export default UpdatePost;
