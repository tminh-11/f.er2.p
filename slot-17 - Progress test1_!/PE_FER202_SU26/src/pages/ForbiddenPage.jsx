import { Alert, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ============================= ForbiddenPage (/403) =============================
 * ProtectedRoute (có sẵn) chuyển tới đây khi sai vai trò.
 * ĐÃ CÓ SẴN: tiêu đề, câu mô tả, dòng "Trang yêu cầu", nút "Đăng nhập" khi chưa đăng nhập,
 *            các biến user, isLoggedIn, navigate, from.
 * =================================================================================
 */
export default function ForbiddenPage() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from;

  return (
    <Alert variant="warning" className="py-4">
      <h4>403 – Không có quyền truy cập</h4>
      <p className="mb-1">Bạn không có quyền truy cập trang này.</p>

      {isLoggedIn && (
        <p className="mb-1">
          Bạn đang đăng nhập với tài khoản {user.email} (vai trò: {user.role})
        </p>
      )}

      {from && <p className="mb-1">Trang yêu cầu: {from.pathname}</p>}

      <div className="d-flex gap-2 mt-3">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          ← Quay lại
        </Button>
        <Button as={Link} to="/cars">
          Về danh sách xe
        </Button>

        {!isLoggedIn && (
          <Button as={Link} to="/login">
            Đăng nhập
          </Button>
        )}
      </div>
    </Alert>
  );
}
