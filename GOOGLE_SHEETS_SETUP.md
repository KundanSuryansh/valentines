# Google Sheets Setup for Valentine Cards

You use **one** Google Sheet with **two tabs**:

1. **"card" tab** – one row per card, Column A = JSON
2. **"home" tab** – key-value pairs: Column A = key, Column B = value

---

## 1. Create a Google Sheet with Two Tabs

Create a new sheet: [sheets.new](https://sheets.new)

1. Rename the first tab to **"card"** (right-click the tab → Rename)
2. Add a second tab and name it **"home"** (click the "+" icon at the bottom)

---

## 2. Set Up the "card" Tab

In the **"card"** tab, **Column A**, put one JSON object per row. Example:

```json
{"id":"card-1","theme":"First Glance","backgroundImage":"https://example.com/image.jpg","title":"Card 1 — First Glance","subtitle":"The moment we met","content":{"heading":"Something clicked","message":"I still remember...","quote":"Some moments feel rehearsed."},"mood":"nostalgic","accentColor":"#ff6b9d","pin":"1234"}
```

**Required fields:**
- `theme` – Card label
- `title` – Main title
- `content` – `{ heading, message, quote }`
- `pin` – 4-digit secret code to unlock (e.g. `"1234"`)

**Optional:**
- `id` – Unique ID (defaults to `card-1`, `card-2`, …)
- `subtitle`, `mood`, `accentColor`
- `backgroundImage` – URL for the card’s background
- `googleDrivePhoto` – Google Drive share link; photo renders below the text. Share the file with **Anyone with the link can view** (e.g. `https://drive.google.com/file/d/ABC123/view?usp=sharing`)

**Tip:** Keep JSON on one line in the cell. Use [jsonformatter.org](https://jsonformatter.org) to minify.

---

## 3. Set Up the "home" Tab (Optional)

In the **"home"** tab, use this format:

| Column A (key) | Column B (value) |
|----------------|------------------|
| pillLabel | For you, with love |
| headline | Open a card |
| headlineHighlight | when you're ready |
| subheadline | Each one has a secret code... |
| loadingText | Loading your cards... |
| howItWorksLabel | How it works |
| howItWorksTitle | Secret codes |
| howItWorksText1 | Every card is locked... |
| howItWorksText2 | Enter the code when prompted... |
| tagline | Made with love · For you only |
| taglineHighlight1 | love |
| taglineHighlight2 | you |
| dateDisplayTemplate | {count} of {total} unlocked |
| footerText | cards · Powered by Google Sheets |

### Love games (optional)

| Column A | Column B |
|----------|----------|
| gamesSectionTitle | Little games for you |
| reasonsLabel | Reasons I love you |
| reasonsDesc | Click each heart to reveal a reason |
| reasonsILoveYou | Your smile\|How you laugh\|Your kindness\|... (pipe `\|` separated) |
| fortuneLabel | Love fortune |
| fortuneDesc | Pick a card, get a sweet message |
| loveFortunes | Fortune 1\|Fortune 2\|Fortune 3\|... (pipe separated) |
| quizLabel | How well do you know us? |
| quizDesc | Test your couple knowledge |
| quizQuestions | `[{"q":"Question?","a":["A","B","C","D"],"c":0},...]` (JSON array, `c` = correct index 0–3) |

**📖 See `QUIZ_FORMAT.md` for complete quiz questions JSON format and examples.**

Use `{count}` and `{total}` in `dateDisplayTemplate` for the unlock counter.  
If the "home" tab is not configured, built-in defaults are used.

---

## 4. Share the Sheet

- **File → Share → Share with others**
- Under “General access”, choose **Anyone with the link** → **Viewer**

## 5. Get the Sheet ID

From the URL:
```
https://docs.google.com/spreadsheets/d/ABC123XYZ/edit
                                    ^^^^^^^^^^
                                    Sheet ID
```

## 6. Get a Google API key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or pick one)
3. Enable **Google Sheets API**: APIs & Services → Library → search “Sheets API” → Enable
4. Create credentials: APIs & Services → Credentials → Create Credentials → API Key
5. (Optional) Restrict the key to the Sheets API

## 7. Add to Your App

**Important:** The `.env` file must be in the **project root** (next to `package.json`), **not** in `src/`. Vite only loads env from the root.

Also: `.env` is ignored by git (do not commit it).

Copy `.env.example` to `.env` in the project root:

```bash
cp .env.example .env
```

Edit `.env` in the project root:

```
VITE_GOOGLE_SHEET_ID=ABC123XYZ
VITE_GOOGLE_API_KEY=your_api_key_here
```

**Note:** You only need one `VITE_GOOGLE_SHEET_ID` since both tabs are in the same sheet.

Restart the dev server.

### GitHub Pages deployment (Secrets)

If you deploy via GitHub Actions, add these **repository secrets**:

- `VITE_GOOGLE_SHEET_ID` (single sheet ID for both tabs)
- `VITE_GOOGLE_API_KEY`

They are injected at build time.

**Note:** This is a frontend app—`VITE_*` values end up in the built bundle and are visible in the browser. Treat the Google API key as public and restrict it in Google Cloud (API restrictions + optionally HTTP referrers).

---

## Fallback

If no Sheet ID/API key is set, the app uses the default 8 cards from `src/data/day1.json`–`day8.json`. Test PINs: `1234`, `2345`, `3456`, `4567`, `5678`, `6789`, `7890`, `0214`.
