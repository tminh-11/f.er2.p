function ButtonGroup({ children, label, size }) {
  return (
    <div
      className={`button-group${size ? ` button-group--${size}` : ''}`}
      role="group"
      aria-label={label}
    >
      {children}
    </div>
  )
}

export default ButtonGroup
