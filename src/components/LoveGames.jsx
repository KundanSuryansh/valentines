import { useState } from 'react'
import './LoveGames.css'

function parseList(str, fallback = []) {
  if (!str || typeof str !== 'string') return fallback
  return str
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
}

function parseQuiz(str) {
  if (!str || typeof str !== 'string') return []
  try {
    const arr = JSON.parse(str)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const DEFAULT_REASONS = [
  "Your smile",
  "How you laugh at my jokes",
  "The way you say my name",
  "Your kindness",
  "Our inside jokes",
  "Your hugs",
  "When you're focused on something",
  "Your voice",
  "How you care for others",
  "Every moment with you",
]

const DEFAULT_FORTUNES = [
  "Today brings an extra dose of love your way.",
  "Someone is thinking about you right now. (It's me.)",
  "A sweet surprise is waiting for you today.",
  "Your smile will make someone's day. (Probably mine.)",
  "Love is in the air — and in your pocket, if you check your phone.",
]

const DEFAULT_QUIZ = [
  { q: "What's my favorite thing about you?", a: ["Your laugh", "Your smile", "Your kindness", "Everything"], c: 3 },
  { q: "Where would I take you for a perfect date?", a: ["Somewhere cozy", "Somewhere adventurous", "Anywhere you are", "A surprise"], c: 2 },
  { q: "What do I love most about us?", a: ["Our conversations", "Our adventures", "Our quiet moments", "All of the above"], c: 3 },
]

export default function LoveGames({ config = {} }) {
  const [activeGame, setActiveGame] = useState(null)
  const reasons = parseList(config.reasonsILoveYou, DEFAULT_REASONS)
  const fortunes = parseList(config.loveFortunes, DEFAULT_FORTUNES)
  const quizData = parseQuiz(config.quizQuestions) || DEFAULT_QUIZ

  const games = [
    reasons.length > 0 && {
      id: 'reasons',
      label: config.reasonsLabel ?? "Reasons I love you",
      icon: "♥",
      desc: config.reasonsDesc ?? "Click each heart to reveal a reason",
    },
    fortunes.length > 0 && {
      id: 'fortune',
      label: config.fortuneLabel ?? "Love fortune",
      icon: "✦",
      desc: config.fortuneDesc ?? "Pick a card, get a sweet message",
    },
    quizData.length > 0 && {
      id: 'quiz',
      label: config.quizLabel ?? "How well do you know us?",
      icon: "?",
      desc: config.quizDesc ?? "Test your couple knowledge",
    },
  ].filter(Boolean)

  return (
    <>
      <div className="love-games-section">
        <h3 className="love-games-title">{config.gamesSectionTitle ?? "Little games for you"}</h3>
        <div className="love-games-grid">
          {games.map((g) => (
            <button
              key={g.id}
              type="button"
              className="love-games-card"
              onClick={() => setActiveGame(g.id)}
            >
              <span className="love-games-card__icon">{g.icon}</span>
              <span className="love-games-card__label">{g.label}</span>
              <span className="love-games-card__desc">{g.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {activeGame === 'reasons' && (
        <ReasonsModal
          reasons={shuffle(reasons)}
          title={config.reasonsLabel ?? "Reasons I love you"}
          onClose={() => setActiveGame(null)}
        />
      )}
      {activeGame === 'fortune' && (
        <FortuneModal
          fortunes={fortunes}
          title={config.fortuneLabel ?? "Love fortune"}
          onClose={() => setActiveGame(null)}
        />
      )}
      {activeGame === 'quiz' && (
        <QuizModal
          questions={quizData}
          title={config.quizLabel ?? "How well do you know us?"}
          onClose={() => setActiveGame(null)}
        />
      )}
    </>
  )
}

function ReasonsModal({ reasons, title, onClose }) {
  const [revealed, setRevealed] = useState({})

  const reveal = (i) => setRevealed((r) => ({ ...r, [i]: true }))

  return (
    <div className="love-games-modal-overlay" onClick={onClose}>
      <div className="love-games-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="love-games-modal__close" onClick={onClose}>×</button>
        <h3 className="love-games-modal__title">{title}</h3>
        <p className="love-games-modal__hint">Click each heart to reveal</p>
        <div className="reasons-grid">
          {reasons.map((r, i) => (
            <button
              key={i}
              type="button"
              className={`reasons-heart ${revealed[i] ? 'reasons-heart--revealed' : ''}`}
              onClick={() => reveal(i)}
            >
              {revealed[i] ? r : '♥'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function FortuneModal({ fortunes, title, onClose }) {
  const [picked, setPicked] = useState(null)
  const [result, setResult] = useState(null)

  const pick = () => {
    if (result) return
    const idx = Math.floor(Math.random() * fortunes.length)
    setPicked(idx)
    setResult(fortunes[idx])
  }

  return (
    <div className="love-games-modal-overlay" onClick={onClose}>
      <div className="love-games-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="love-games-modal__close" onClick={onClose}>×</button>
        <h3 className="love-games-modal__title">{title}</h3>
        {!result ? (
          <>
            <p className="love-games-modal__hint">Tap the card to reveal your fortune</p>
            <button type="button" className="fortune-card" onClick={pick}>
              <span className="fortune-card__inner">✦</span>
            </button>
          </>
        ) : (
          <div className="fortune-result">
            <p className="fortune-result__text">{result}</p>
            <button type="button" className="love-games-modal__btn" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function QuizModal({ questions, title, onClose }) {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [done, setDone] = useState(false)

  const q = questions[step]
  const total = questions.length

  const select = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === q.c) setScore((s) => s + 1)
  }

  const next = () => {
    if (step + 1 >= total) {
      setDone(true)
    } else {
      setStep((s) => s + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  if (!q) return null

  if (done) {
    const pct = Math.round((score / total) * 100)
    const msg = pct >= 80 ? "You know us so well! ♥" : pct >= 60 ? "Pretty good! More dates to learn more." : "We have more memories to make!"
    return (
      <div className="love-games-modal-overlay" onClick={onClose}>
        <div className="love-games-modal" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="love-games-modal__close" onClick={onClose}>×</button>
          <h3 className="love-games-modal__title">Results</h3>
          <div className="quiz-result">
            <p className="quiz-result__score">{score} / {total}</p>
            <p className="quiz-result__pct">{pct}%</p>
            <p className="quiz-result__msg">{msg}</p>
          </div>
          <button type="button" className="love-games-modal__btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="love-games-modal-overlay" onClick={onClose}>
      <div className="love-games-modal love-games-modal--wide" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="love-games-modal__close" onClick={onClose}>×</button>
        <h3 className="love-games-modal__title">{title}</h3>
        <p className="love-games-modal__progress">Question {step + 1} of {total}</p>
        <p className="quiz-question">{q.q}</p>
        <div className="quiz-options">
          {q.a.map((opt, i) => (
            <button
              key={i}
              type="button"
              className={`quiz-option ${
                answered && i === q.c ? 'quiz-option--correct' :
                answered && i === selected && i !== q.c ? 'quiz-option--wrong' : ''
              }`}
              onClick={() => select(i)}
              disabled={answered}
            >
              {opt}
            </button>
          ))}
        </div>
        {answered && (
          <button type="button" className="love-games-modal__btn" onClick={next}>
            {step + 1 >= total ? 'See results' : 'Next'}
          </button>
        )}
      </div>
    </div>
  )
}
