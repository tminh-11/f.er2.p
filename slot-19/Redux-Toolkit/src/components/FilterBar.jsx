import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { setFilter } from '../redux/actions';
import { selectFilter } from '../redux/selectors';

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Chưa xong' },
  { key: 'done', label: 'Đã xong' },
];

export default function FilterBar() {
  const currentFilter = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <ButtonGroup className="my-3">
      {FILTERS.map((filter) => (
        <Button
          key={filter.key}
          variant={currentFilter === filter.key ? 'primary' : 'outline-primary'}
          onClick={() => dispatch(setFilter(filter.key))}
        >
          {filter.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
