import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { addTodo } from '../redux/actions';

export default function TodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;

    dispatch(addTodo(text.trim()));
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          placeholder="Nhập công việc..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <Button type="submit" disabled={!text.trim()}>
          Thêm
        </Button>
      </InputGroup>
    </Form>
  );
}
