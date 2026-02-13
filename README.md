# Valentine Cards App 💝

A beautiful, interactive Valentine's Day card collection app built with React and Vite. Each card is locked with a secret PIN code that can be unlocked to reveal personalized messages, photos, and memories.

## Features

- 🔒 **Locked Cards**: Each card requires a 4-digit PIN to unlock
- 📱 **Mobile Responsive**: Fully optimized for mobile devices
- 🎮 **Love Games**: Interactive games including "Reasons I Love You", "Love Fortune", and "How Well Do You Know Us?"
- 📸 **Photo Support**: Display photos from Google Drive or direct URLs
- 🎨 **Beautiful UI**: Gradient backgrounds, floating hearts, and smooth animations
- ☁️ **Google Sheets Integration**: Manage cards and content via Google Sheets

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Add your Google Sheets ID and API key (see `GOOGLE_SHEETS_SETUP.md`)

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Google Sheets Setup

See `GOOGLE_SHEETS_SETUP.md` for detailed instructions on setting up Google Sheets integration.

## Deployment

This app is configured for GitHub Pages deployment. The GitHub Actions workflow will automatically build and deploy when you push to the `main` branch.

### Important Notes

- Make sure the `base` path in `vite.config.js` matches your repository name
- Enable GitHub Pages in your repository settings (Settings → Pages → Source: GitHub Actions)
- The app uses HashRouter for client-side routing, which works well with GitHub Pages

## Technologies

- React 19
- Vite
- React Router DOM
- Google Sheets API

## License

Private project - For personal use only.
