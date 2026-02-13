/**
 * Fetch cards and homepage data from Google Sheets.
 * 
 * Uses a single Google Sheet with two tabs:
 * - "card" tab: Column A = JSON string per row (one card per row)
 * - "home" tab: Column A = key, Column B = value (homepage config)
 *
 * Setup:
 * 1. Create a Google Sheet with two tabs named "card" and "home"
 * 2. In "card" tab, Column A: put one JSON object per row (minified or formatted)
 * 3. In "home" tab, Column A = key, Column B = value (one config field per row)
 * 4. Enable Google Sheets API: https://console.cloud.google.com/apis/library/sheets.googleapis.com
 * 5. Create an API key (restrict to Sheets API)
 * 6. Share the sheet with "Anyone with the link can view"
 * 7. Add VITE_GOOGLE_SHEET_ID and VITE_GOOGLE_API_KEY to .env
 */

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

const cardsApiUrl = SHEET_ID && API_KEY
  ? `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/card!A:A?key=${API_KEY}`
  : null
const homepageApiUrl = SHEET_ID && API_KEY
  ? `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/home!A:B?key=${API_KEY}`
  : null

/**
 * Parse a single row from the sheet into a card object.
 * Adds cardIndex for display.
 */
function parseCardRow(raw, index) {
  try {
    const str = typeof raw === 'string' ? raw.trim() : String(raw ?? '')
    if (!str || str.startsWith('{') === false) return null
    const data = JSON.parse(str)
    return {
      ...data,
      cardIndex: index + 1,
      id: data.id ?? `card-${index + 1}`,
      pin: String(data.pin ?? '0000'),
    }
  } catch {
    return null
  }
}

/**
 * Fetch cards from Google Sheets.
 * Returns array of card objects, or null on network/API error.
 * Returns [] if sheet is empty or has no valid JSON rows.
 */
/**
 * Fetch homepage config from Google Sheets.
 * Reads from the "home" tab: Column A = key, Column B = value (one config field per row).
 * Returns object of key-value pairs, or null on error.
 */
export async function fetchHomepageFromSheet() {
  if (!SHEET_ID || !API_KEY || !homepageApiUrl) return null

  try {
    const res = await fetch(homepageApiUrl)
    const json = await res.json()

    if (!res.ok) {
      console.warn('[Sheets] Homepage API error:', res.status, json?.error?.message ?? json)
      return null
    }

    const rows = json.values ?? []
    const config = {}
    for (const row of rows) {
      const key = String(row?.[0] ?? '').trim()
      const val = row?.[1] != null ? String(row[1]).trim() : ''
      if (key) config[key] = val
    }
    return Object.keys(config).length > 0 ? config : null
  } catch (err) {
    console.warn('[Sheets] Homepage fetch failed:', err)
    return null
  }
}

export async function fetchCardsFromSheet() {
  if (!SHEET_ID || !API_KEY || !cardsApiUrl) return null

  try {
    const res = await fetch(cardsApiUrl)
    const json = await res.json()

    if (!res.ok) {
      console.warn('[Sheets] API error:', res.status, json?.error?.message ?? json)
      return null
    }

    const rows = json.values ?? []

    const cards = []
    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i]?.[0]
      const card = parseCardRow(cell, i)
      if (card) cards.push(card)
    }
    return cards
  } catch (err) {
    console.warn('[Sheets] Fetch failed:', err)
    return null
  }
}
