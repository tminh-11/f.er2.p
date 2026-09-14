function ProductInfo(props) {
  return (
    <div>
      <h2>Thông tin sản phẩm</h2>
      <p>Tên sản phẩm: {props.Name}</p>
      <p>Giá: {props.Price}</p>
      <p>Tag: {props.tag}</p>
    </div>
  )
}

export default ProductInfo
