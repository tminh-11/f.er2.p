function ButtonGroup({ children, label }) {
  return (
    <div className="button-group" role="group" aria-label={label}>
      {children}
    </div>
  )
}

export default ButtonGroup
