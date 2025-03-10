// import { defineConfig } from 'vite'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server : {}
// })

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),react()
  ],
  server : {port : 5173}
})