import { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        { title, body, userId: 1 },
      );
      setResult({ status: response.status, data: response.data });
      setTitle('');
      setBody('');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="post-card create-post-card">
      <h2 className="post-heading">Tạo bài viết</h2>
      <p className="post-caption">Gửi bài viết mới bằng phương thức POST</p>

      <form className="create-post-form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="post-title">Title</label>
        <input
          className="form-control"
          id="post-title"
          type="text"
          placeholder="Nhập tiêu đề"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label className="form-label" htmlFor="post-body">Body</label>
        <textarea
          className="form-control"
          id="post-body"
          placeholder="Nhập nội dung bài viết"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={4}
          required
        />

        <button className="submit-button" type="submit" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
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

export default CreatePost;
