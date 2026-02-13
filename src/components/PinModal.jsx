import { useState, useRef, useEffect } from 'react'
import './PinModal.css'

export default function PinModal({ card, onUnlock, onClose }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleDigit = (d) => {
    if (pin.length >= 4) return
    setError('')
    setPin((p) => p + d)
  }

  const handleBackspace = () => {
    setError('')
    setPin((p) => p.slice(0, -1))
  }

  const handleSubmit = () => {
    if (pin.length !== 4) return
    const correct = String(card.pin) === pin
    if (correct) {
      onUnlock(card.id)
      onClose()
    } else {
      setError('Wrong code. Try again.')
      setShaking(true)
      setPin('')
      setTimeout(() => setShaking(false), 400)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      handleBackspace()
    } else if (e.key >= '0' && e.key <= '9') {
      e.preventDefault()
      handleDigit(e.key)
    } else if (e.key === 'Enter' && pin.length === 4) {
      handleSubmit()
    }
  }

  return (
    <div className="pin-modal-overlay" onClick={onClose}>
      <div
        className={`pin-modal ${shaking ? 'pin-modal--shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="pin-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="pin-modal__lock">
          <span className="pin-modal__lock-icon">🔒</span>
        </div>

        <h3 className="pin-modal__title">Card {card?.cardIndex}</h3>
        <p className="pin-modal__hint">Enter the 4-digit code to unlock</p>

        <div className="pin-modal__dots">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`pin-modal__dot ${pin.length > i ? 'pin-modal__dot--filled' : ''}`}
            />
          ))}
        </div>

        <div className="pin-modal__pad" onKeyDown={handleKeyDown}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, '⌫'].map((n) =>
            n === null ? (
              <div key="empty" className="pin-modal__key pin-modal__key--empty" />
            ) : n === '⌫' ? (
              <button
                key="back"
                type="button"
                className="pin-modal__key"
                onClick={handleBackspace}
                disabled={pin.length === 0}
              >
                ⌫
              </button>
            ) : (
              <button
                key={n}
                type="button"
                className="pin-modal__key"
                onClick={() => handleDigit(String(n))}
              >
                {n}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          className="pin-modal__submit"
          onClick={handleSubmit}
          disabled={pin.length !== 4}
        >
          Unlock
        </button>

        {error && <p className="pin-modal__error">{error}</p>}
      </div>
    </div>
  )
}
