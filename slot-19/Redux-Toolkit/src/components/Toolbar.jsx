import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Form } from 'react-bootstrap';
import {
  selectAverageGpa,
  setKeyword,
  setSortBy,
} from '../features/students/studentsSlice';

export default function Toolbar({ onAdd }) {
  const { keyword, sortBy, items } = useSelector((state) => state.students);
  const averageGpa = useSelector(selectAverageGpa);
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
      <Form.Control
        style={{ maxWidth: 260 }}
        placeholder="Tìm theo tên / mã SV..."
        aria-label="Tìm theo tên hoặc mã sinh viên"
        value={keyword}
        onChange={(event) => dispatch(setKeyword(event.target.value))}
      />
      <Form.Select
        style={{ maxWidth: 180 }}
        aria-label="Sắp xếp sinh viên"
        value={sortBy}
        onChange={(event) => dispatch(setSortBy(event.target.value))}
      >
        <option value="code">Sắp xếp: Mã SV</option>
        <option value="name">Sắp xếp: Họ tên</option>
        <option value="gpa">Sắp xếp: GPA ↓</option>
      </Form.Select>
      <Badge bg="info" className="p-2">Tổng: {items.length}</Badge>
      <Badge bg="success" className="p-2">GPA TB: {averageGpa}</Badge>
      <Button className="ms-auto" onClick={onAdd}>+ Thêm sinh viên</Button>
    </div>
  );
}
