const QUESTIONS = [
  {
    id: 'q1',
    text: 'Hook nào dùng để lưu trạng thái cục bộ?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    answer: 1,
  },
  {
    id: 'q2',
    text: 'Gọi setCount(count + 1) ba lần trong một sự kiện, count tăng bao nhiêu?',
    options: ['1', '2', '3', '0'],
    answer: 0,
  },
  {
    id: 'q3',
    text: 'Cách đúng để thêm phần tử vào mảng state?',
    options: [
      'list.push(x)',
      'setList(list.push(x))',
      'setList([...list, x])',
      'list[list.length] = x',
    ],
    answer: 2,
  },
  {
    id: 'q4',
    text: 'Checkbox có điều khiển dùng prop nào?',
    options: ['value', 'checked', 'selected', 'defaultValue'],
    answer: 1,
  },
]

export default QUESTIONS
