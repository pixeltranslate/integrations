import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-20',
  typescript: {
    shim: false
  },
  nitro: {
    publicAssets: [{
      baseURL: 'icons',
      dir: join(currentDir, './icons')
    }],
    serverAssets: [{
      baseName: 'integrations',
      dir: join(currentDir, './integrations')
    }]
  }
})
