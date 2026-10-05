function Button({
  children,
  onClick,
  disabled = false,
  variant = 'default',
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
}) {
  return (
    <button
      className={`picker-button picker-button--${variant}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  )
}

export default Button
