import { useEffect } from 'react'
import './CardDetail.css'

/** Extract file ID from Google Drive share link and return embed URL */
function toDriveEmbedUrl(url) {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`
  return trimmed
}

/** Check if URL looks like Google Drive (use iframe) or is a direct image URL (use img) */
function isDriveUrl(url) {
  return url && (url.includes('drive.google.com') || url.includes('docs.google.com'))
}

export default function CardDetail({ card, onClose }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  if (!card) return null

  const content = card.content || {}
  const accent = card.accentColor || '#ff6b9d'

  return (
    <div className="card-detail-overlay" onClick={onClose}>
      <div
        className="card-detail"
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent': accent }}
      >
        <div
          className="card-detail__bg"
          style={{ backgroundImage: `url(${card.backgroundImage})` }}
          role="img"
          aria-label={`Background for ${card.theme}`}
        />
        <div className="card-detail__overlay" />

        <header className="card-detail__header">
          <button
            type="button"
            className="card-detail__close"
            onClick={onClose}
            aria-label="Close"
          >
            ← Back
          </button>
        </header>

        <main className="card-detail__content">
          <div className="card-detail__card">
            <span className="card-detail__theme">{card.theme}</span>
            <h1 className="card-detail__title">{card.title}</h1>
            <p className="card-detail__subtitle">{card.subtitle}</p>

            <div className="card-detail__body">
              {content.heading && (
                <h2 className="card-detail__heading">{content.heading}</h2>
              )}
              {content.message && (
                <p className="card-detail__message">{content.message}</p>
              )}
              {content.quote && (
                <blockquote className="card-detail__quote">{content.quote}</blockquote>
              )}
            </div>

            {(card.googleDrivePhoto || card.photo) && (() => {
              const photoUrl = card.googleDrivePhoto || card.photo
              const isDrive = isDriveUrl(photoUrl)
              return (
                <div className="card-detail__photo">
                  {isDrive ? (
                    <iframe
                      src={toDriveEmbedUrl(photoUrl)}
                      title="Photo"
                      className="card-detail__photo-iframe"
                    />
                  ) : (
                    <img src={photoUrl} alt="" />
                  )}
                </div>
              )
            })()}

            {card.mood && (
              <div className="card-detail__meta">
                <span className="card-detail__mood">♥ {card.mood}</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
