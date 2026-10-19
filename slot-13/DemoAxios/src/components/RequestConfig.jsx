import { useEffect, useState } from 'react';
import axios from 'axios';

const RequestConfig = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: { _page: 1, _limit: 3 },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer demo-token-123',
      },
      timeout: 5000,
    })
      .then((response) => {
        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data,
        });
      })
      .catch((requestError) => {
        if (requestError.code === 'ECONNABORTED' || requestError.code === 'ETIMEDOUT') {
          setError('Request quá thời gian (timeout)');
        } else if (requestError.response) {
          setError(`Server trả lỗi ${requestError.response.status}`);
        } else {
          setError(requestError.message);
        }
      });
  }, []);

  return (
    <section className="post-card create-post-card">
      <h2 className="post-heading">Cấu hình request</h2>
      <p className="post-caption">Gửi GET bằng cấu hình đầy đủ axios(config)</p>

      {error ? (
        <p className="post-feedback post-list-error" role="alert">Error: {error}</p>
      ) : !info ? (
        <div className="post-list-state" role="status">Loading...</div>
      ) : (
        <>
          <div className="request-metadata" role="status">
            <p>Status: {info.status}</p>
            <p>Content-Type: {info.contentType || 'Không có'}</p>
            <p>Tổng số bài viết (x-total-count): {info.total || 'Không có'}</p>
          </div>
          <ul className="post-list">
            {info.data.map((post) => (
              <li className="post-item" key={post.id}>
                <span className="post-id">#{post.id}</span>
                <span className="post-title">{post.title}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default RequestConfig;
