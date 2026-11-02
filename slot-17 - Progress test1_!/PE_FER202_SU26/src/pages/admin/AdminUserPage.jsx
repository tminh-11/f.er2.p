import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import userApi from '../../api/userApi';
import { getErrorMessage } from '../../api/axiosClient';
import Loading from '../../components/Loading';
import ErrorAlert from '../../components/ErrorAlert';

/**
 * ============================ AdminUserPage (/admin/users) ============================
 * Route đã được ProtectedRoute bảo vệ. Kiểm tra: đăng nhập admin@autoshop.vn / 12345678 → /admin/users.
 * ĐÃ CÓ SẴN: state users / loading / error, khung useEffect, phần <thead> của bảng.
 * ========================================================================================
 */
export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setUsers(await userApi.getAll());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loading text="Đang tải người dùng..." />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <>
      <h3 className="fw-bold mb-3">Quản lý người dùng ({users.length})</h3>

      <Table bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>
                <Badge bg={u.role === 'admin' ? 'danger' : 'secondary'}>
                  {u.role === 'admin' ? 'Admin' : 'Khách hàng'}
                </Badge>
              </td>
              <td>
                <Badge bg={u.active ? 'success' : 'dark'}>
                  {u.active ? 'Hoạt động' : 'Đã khoá'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
