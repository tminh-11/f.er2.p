import { Table } from 'react-bootstrap'
import { BOOKS } from '../data/books.js'

function BookListPage() {
  return (
    <section className="library-page">
      <p className="eyebrow">BỘ SƯU TẬP</p>
      <h1 className="section-title">Danh sách sách</h1>
      <p className="section-intro">Một vài cuốn sách được bạn đọc yêu thích.</p>
      <div className="course-table-wrap">
        <Table responsive hover className="course-table align-middle mb-0">
          <thead>
            <tr>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Năm xuất bản</th>
            </tr>
          </thead>
          <tbody>
            {BOOKS.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  )
}

export default BookListPage
