const faqs = [
  {
    id: 1,
    question: 'React là gì?',
    answer:
      'Thư viện JavaScript để xây dựng giao diện người dùng theo component.',
  },
  {
    id: 2,
    question: 'State khác props thế nào?',
    answer:
      'Props do cha truyền xuống và chỉ đọc; state do chính component quản lý và thay đổi được.',
  },
  {
    id: 3,
    question: 'Vì sao phải dùng setState?',
    answer:
      'Vì chỉ khi gọi hàm set, React mới biết dữ liệu đổi để render lại giao diện.',
  },
]

export default faqs
