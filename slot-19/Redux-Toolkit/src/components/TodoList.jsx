import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import TodoItem from './TodoItem';
import { selectTodos, selectFilter, selectRemaining } from '../redux/selectors';
import { clearCompleted } from '../redux/actions';

export default function TodoList() {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const remaining = useSelector(selectRemaining);
  const dispatch = useDispatch();

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.done);
    if (filter === 'done') return todos.filter((todo) => todo.done);
    return todos;
  }, [todos, filter]);

  return (
    <>
      <ListGroup>
        {visible.length === 0 && <ListGroup.Item className="text-muted">Không có công việc</ListGroup.Item>}
        {visible.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <small>
          Còn <b>{remaining}</b> việc chưa xong
        </small>
        <Button size="sm" variant="link" onClick={() => dispatch(clearCompleted())}>
          Xóa việc đã xong
        </Button>
      </div>
    </>
  );
}
