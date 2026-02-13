import { useState, useEffect, useCallback } from 'react'
import { fetchCardsFromSheet } from '../services/sheets'

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
import day1Data from '../data/day1.json'
import day2Data from '../data/day2.json'
import day3Data from '../data/day3.json'
import day4Data from '../data/day4.json'
import day5Data from '../data/day5.json'
import day6Data from '../data/day6.json'
import day7Data from '../data/day7.json'
import day8Data from '../data/day8.json'

const FALLBACK_CARDS = [
  day1Data,
  day2Data,
  day3Data,
  day4Data,
  day5Data,
  day6Data,
  day7Data,
  day8Data,
].map((d, i) => ({
  ...d,
  cardIndex: i + 1,
  id: d.id ?? `card-${i + 1}`,
  pin: String(d.pin ?? '1234'),
}))

const STORAGE_KEY = 'valentine-unlocked'

export function getUnlockedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function setUnlocked(id) {
  const ids = getUnlockedIds()
  if (ids.includes(id)) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, id]))
}

export function useCards() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    const fromSheet = await fetchCardsFromSheet()

    if (SHEET_ID && API_KEY) {
      // Sheet configured: use only sheet data, never fallback
      if (fromSheet && fromSheet.length > 0) {
        setCards(fromSheet)
      } else {
        setCards([])
        setError(fromSheet === null
          ? 'Could not load from Google Sheets. Check sheet sharing and API key.'
          : 'No valid cards found in the sheet. Add JSON in Column A.')
      }
    } else {
      // Not configured: use fallback cards
      setCards(FALLBACK_CARDS)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { cards, loading, error, reload: load }
}
