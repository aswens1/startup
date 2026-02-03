import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        collabCanvas: './pages/collaborativeCanvas.html',
        gamePlayCanvas: './pages/gamePlayCanvas.html',
        gamePlaySelection: './pages/gameSelectionMenu.html',
        getStarted: './pages/getStarted.html',
        leaderboard: './pages/leaderboard.html',
        // List all other files here
      },
    }
  }
})