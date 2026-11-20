import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 项目站点默认部署在 /futurewise-education/ 子路径。
// 绑定自定义域名或部署到用户站点时，可通过 VITE_BASE=/ 覆盖。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? (process.env.VITE_BASE || '/futurewise-education/') : '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('marked')) return 'markdown'
            if (id.includes('react') || id.includes('scheduler')) return 'vendor'
          }
        },
      },
    },
  },
}))
