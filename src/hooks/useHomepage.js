import { useState, useEffect, useCallback } from 'react'
import { fetchHomepageFromSheet } from '../services/sheets'

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID

const DEFAULT_HOMEPAGE = {
  pillLabel: "For you, with love",
  dateDisplayTemplate: "{count} of {total} unlocked",
  headline: "Open a card",
  headlineHighlight: "when you're ready",
  subheadline: "Each one has a secret code — the same one I whisper when we're far apart. Find the code, unlock the card, and read what's inside.",
  loadingText: "Loading your cards...",
  howItWorksLabel: "How it works",
  howItWorksTitle: "Secret codes",
  howItWorksText1: "Every card is locked. I'll send you the 4-digit code for each one — maybe throughout the day, or all at once if you can't wait.",
  howItWorksText2: "Enter the code when prompted to unlock and read the message inside.",
  tagline: "Made with love · For you only",
  taglineHighlight1: "love",
  taglineHighlight2: "you",
  footerText: "cards · Powered by Google Sheets · Edit your sheet to add or change cards",
  gamesSectionTitle: "Little games for you",
  reasonsLabel: "Reasons I love you",
  reasonsDesc: "Click each heart to reveal a reason",
  reasonsILoveYou: "Your smile|How you laugh at my jokes|The way you say my name|Your kindness|Our inside jokes|Your hugs|When you're focused on something|Your voice|How you care for others|Every moment with you",
  fortuneLabel: "Love fortune",
  fortuneDesc: "Pick a card, get a sweet message",
  loveFortunes: "Today brings an extra dose of love your way.|Someone is thinking about you right now. (It's me.)|A sweet surprise is waiting for you today.|Your smile will make someone's day. (Probably mine.)|Love is in the air — and in your pocket, if you check your phone.",
  quizLabel: "How well do you know us?",
  quizDesc: "Test your couple knowledge",
  quizQuestions: '[{"q":"What\'s my favorite thing about you?","a":["Your laugh","Your smile","Your kindness","Everything"],"c":3},{"q":"Where would I take you for a perfect date?","a":["Somewhere cozy","Somewhere adventurous","Anywhere you are","A surprise"],"c":2},{"q":"What do I love most about us?","a":["Our conversations","Our adventures","Our quiet moments","All of the above"],"c":3}]',
}

export function useHomepage() {
  const [config, setConfig] = useState(DEFAULT_HOMEPAGE)
  const [loading, setLoading] = useState(!!SHEET_ID)

  const load = useCallback(async () => {
    if (!SHEET_ID) {
      setLoading(false)
      return
    }
    setLoading(true)
    const fromSheet = await fetchHomepageFromSheet()
    if (fromSheet) {
      setConfig((prev) => ({ ...DEFAULT_HOMEPAGE, ...fromSheet }))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { config, loading, reload: load }
}
