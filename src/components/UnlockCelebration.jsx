import { useEffect, useState } from 'react'
import './UnlockCelebration.css'

export default function UnlockCelebration({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 2000)
    return () => clearTimeout(t)
  }, [onComplete])

  if (!visible) return null

  const hearts = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.4,
    x: Math.random() * 100 - 50,
    rot: Math.random() * 360,
    size: 12 + Math.random() * 16,
  }))

  return (
    <div className="unlock-celebration" aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="unlock-celebration__heart"
          style={{
            '--delay': `${h.delay}s`,
            '--x': `${h.x}vw`,
            '--rot': `${h.rot}deg`,
            '--size': `${h.size}px`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}
