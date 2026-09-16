function ProductInfo(props) {
  return (
    <div className="card shadow-sm border-0 p-3">
      <h2 className="h4 mb-3">Thông tin sản phẩm</h2>
      <p className="mb-2"><strong>Tên sản phẩm:</strong> {props.Name}</p>
      <p className="mb-2"><strong>Giá:</strong> {props.Price}</p>
      <p className="mb-0"><strong>Tag:</strong> {props.tag}</p>
    </div>
  )
}

export default ProductInfo
