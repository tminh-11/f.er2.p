import { useSelector } from 'react-redux';
import { Card, Spinner, Alert } from 'react-bootstrap';

export default function UserPosts() {
  const { selectedId, posts, postsLoading, postsError, items } = useSelector((state) => state.users);
  const user = items.find((item) => item.id === selectedId);

  if (!selectedId) {
    return <p className="text-muted">← Chọn một user để xem bài viết</p>;
  }

  if (postsLoading) {
    return <Spinner animation="border" size="sm" />;
  }

  if (postsError) {
    return <Alert variant="danger">{postsError}</Alert>;
  }

  return (
    <>
      <h5 className="mb-3">
        Bài viết của {user?.name} ({posts.length})
      </h5>

      {posts.map((post) => (
        <Card key={post.id} className="mb-2">
          <Card.Body>
            <Card.Title className="fs-6 text-capitalize">{post.title}</Card.Title>
            <Card.Text className="small text-muted">{post.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
