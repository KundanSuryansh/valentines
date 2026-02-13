import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// NOTE: For GitHub Pages, set base to '/<repo-name>/'.
// Here we assume the repo will be named 'valentines'.
export default defineConfig({
  plugins: [react()],
  base: '/valentines/',
})
