import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite 配置文件
// 参考文档: https://vite.dev/config/
export default defineConfig({
  // 应用部署的基础路径
  base: '/ask_ai_progress/',
  // 启用的插件：React 支持和 Tailwind CSS
  plugins: [react(),tailwindcss()],
})
