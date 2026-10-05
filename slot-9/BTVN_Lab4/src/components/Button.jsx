function Button({
  children,
  onClick,
  disabled = false,
  variant = 'default',
  'aria-label': ariaLabel,
}) {
  return (
    <button
      className={`picker-button picker-button--${variant}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default Button
