import './LockedCard.css'

export default function LockedCard({ card, isUnlocked, onClick, index = 0 }) {
  return (
    <button
      type="button"
      className={`locked-card ${isUnlocked ? 'locked-card--unlocked' : ''}`}
      onClick={onClick}
      style={{
        '--accent': card.accentColor || '#ff6b9d',
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <div className="locked-card__inner">
        {isUnlocked ? (
          <>
            <span className="locked-card__badge">♥</span>
            <span className="locked-card__number">Card {card.cardIndex}</span>
            <h3 className="locked-card__theme">{card.theme}</h3>
            <span className="locked-card__tap">Tap to open</span>
          </>
        ) : (
          <>
            <span className="locked-card__lock">🔒</span>
            <span className="locked-card__number">Card {card.cardIndex}</span>
            <h3 className="locked-card__theme">{card.theme}</h3>
            <span className="locked-card__hint">Enter code to unlock</span>
          </>
        )}
      </div>
      <div
        className="locked-card__thumb"
        style={{ backgroundImage: card.backgroundImage ? `url(${card.backgroundImage})` : undefined }}
      />
    </button>
  )
}
