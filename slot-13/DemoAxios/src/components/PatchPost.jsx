import { useState } from 'react';
import axios from 'axios';

const PatchPost = () => {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePatch = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        { title },
      );
      setResult({ status: response.status, data: response.data });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="post-card create-post-card">
      <h2 className="post-heading">Sửa tiêu đề bài viết #1</h2>
      <p className="post-caption">Chỉ gửi trường title bằng phương thức PATCH</p>

      <form className="create-post-form" onSubmit={handlePatch}>
        <label className="form-label" htmlFor="patch-post-title">Tiêu đề mới</label>
        <input
          className="form-control"
          id="patch-post-title"
          type="text"
          placeholder="Nhập tiêu đề mới"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <button
          className="submit-button"
          type="submit"
          disabled={submitting || !title.trim()}
        >
          {submitting ? 'Đang cập nhật...' : 'Cập nhật (PATCH)'}
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

export default PatchPost;
