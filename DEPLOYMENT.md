# Deployment Guide for GitHub Pages

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `valentines`)
4. **Important**: Make it **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Update Vite Config (if needed)

If your repository name is different from `valentines`, update `vite.config.js`:

```javascript
base: '/your-repo-name/',
```

## Step 3: Add Remote and Push

Run these commands in your terminal:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Source", select **"GitHub Actions"**
4. Save the settings

## Step 5: Add GitHub Secrets (for build)

Go to your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** and add:

- `VITE_GOOGLE_SHEET_ID` (single sheet ID - contains both "card" and "home" tabs)
- `VITE_GOOGLE_API_KEY`

These values are used during the GitHub Actions build.

**Important note:** this is a frontend (Vite) app, so any `VITE_*` values are compiled into the final JS bundle and are visible to users in the browser. Treat the Google API key as **public** and restrict it in Google Cloud (limit to the Sheets API + optionally to your site’s domain).

## Step 6: Verify Deployment

1. The GitHub Actions workflow will automatically run when you push
2. Go to **Actions** tab in your repository to see the deployment progress
3. Once complete, your site will be available at:
   ```
   https://YOUR_USERNAME.github.io/REPO_NAME/
   ```

## Troubleshooting

- If the site doesn't load, check that the `base` path in `vite.config.js` matches your repo name
- Make sure GitHub Pages is enabled and using "GitHub Actions" as the source
- Check the Actions tab for any build errors
- The deployment may take a few minutes to complete

## Updating Your Site

Simply push changes to the `main` branch:

```bash
git add .
git commit -m "Your commit message"
git push
```

The GitHub Actions workflow will automatically rebuild and redeploy your site.
