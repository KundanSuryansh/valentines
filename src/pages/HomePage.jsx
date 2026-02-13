import { useState } from 'react'
import { useCards, getUnlockedIds, setUnlocked } from '../hooks/useCards'
import { useHomepage } from '../hooks/useHomepage'
import LockedCard from '../components/LockedCard'
import PinModal from '../components/PinModal'
import CardDetail from '../components/CardDetail'
import UnlockCelebration from '../components/UnlockCelebration'
import LoveGames from '../components/LoveGames'
import '../App.css'

export default function HomePage() {
  const { cards, loading, error } = useCards()
  const { config: hp } = useHomepage()
  const [unlockedIds, setUnlockedIds] = useState(getUnlockedIds)
  const [pinCard, setPinCard] = useState(null)
  const [viewCard, setViewCard] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleUnlock = (id) => {
    setUnlocked(id)
    setUnlockedIds(getUnlockedIds())
    setShowCelebration(true)
  }

  const handleCardClick = (card) => {
    const isUnlocked = unlockedIds.includes(card.id)
    if (isUnlocked) {
      setViewCard(card)
    } else {
      setPinCard(card)
    }
  }

  return (
    <>
    <div className="valentine-shell valentine-shell--cards">
      <div className="floating-heart floating-heart--1" />
      <div className="floating-heart floating-heart--2" />
      <div className="floating-heart floating-heart--3" />
      <div className="floating-heart floating-heart--4" />
      <div className="floating-heart floating-heart--5" />

      <div className="valentine-inner valentine-inner--cards">
        <section className="cards-section">
          <div className="valentine-greeting">Happy Valentines Day</div>
          <header className="valentine-header">
            <div className="pill">
              <span className="pill-dot" />
              {hp.pillLabel}
            </div>
            <div className="date-display">
              {(hp.dateDisplayTemplate ?? '{count} of {total} unlocked')
                .replace('{count}', unlockedIds.length)
                .replace('{total}', cards.length)}
            </div>
          </header>

          <h1 className="headline headline--cards">
            {hp.headline}
            <br />
            <span>{hp.headlineHighlight}</span>
          </h1>

          <p className="subheadline subheadline--cards">
            {hp.subheadline}
          </p>

          {loading ? (
            <div className="cards-loading">
              <div className="cards-loading__spinner" />
              <p>{hp.loadingText}</p>
            </div>
          ) : error ? (
            <p className="cards-error">{error}</p>
          ) : null}

          <div className="cards-grid">
            {cards.map((card, i) => (
              <LockedCard
                key={card.id}
                card={card}
                index={i}
                isUnlocked={unlockedIds.includes(card.id)}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>

          <LoveGames config={hp} />
        </section>

        <aside className="right-panel right-panel--cards">
          <div className="card-widget card-widget--compact">
            <div className="card-widget-inner">
              <div className="card-label">{hp.howItWorksLabel}</div>
              <h2 className="card-title">{hp.howItWorksTitle}</h2>
              <p className="card-widget__text">{hp.howItWorksText1}</p>
              <p className="card-widget__text">{hp.howItWorksText2}</p>
            </div>
          </div>

          <p className="tagline">
            {hp.taglineHighlight1 && hp.taglineHighlight2 ? (
              <>
                {hp.tagline.split(hp.taglineHighlight1)[0]}
                <span>{hp.taglineHighlight1}</span>
                {hp.tagline.split(hp.taglineHighlight1)[1]?.split(hp.taglineHighlight2)[0]}
                <span>{hp.taglineHighlight2}</span>
                {hp.tagline.split(hp.taglineHighlight2)[1]}
              </>
            ) : (
              hp.tagline
            )}
          </p>
        </aside>
      </div>

      <footer className="footer-note footer-note--cards">
        <span>
          {cards.length} {hp.footerText}
        </span>
      </footer>
    </div>

    {pinCard && (
      <PinModal
        card={pinCard}
        onUnlock={handleUnlock}
        onClose={() => setPinCard(null)}
      />
    )}

    {showCelebration && (
      <UnlockCelebration onComplete={() => setShowCelebration(false)} />
    )}

    {viewCard && (
      <CardDetail
        card={viewCard}
        onClose={() => setViewCard(null)}
      />
    )}
    </>
  )
}
