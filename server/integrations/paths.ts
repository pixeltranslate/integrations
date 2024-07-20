import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

function formatRootDir(rootDir: string) {
  if (rootDir.includes('.nuxt/dev')) {
    return rootDir.replaceAll('.nuxt/dev', '')
  }
  return rootDir
}

export const rootDir = formatRootDir(dirname(fileURLToPath(import.meta.url)))
export const integrationsDir = join(rootDir, 'integrations')
export const iconsDir = join(rootDir, 'public/integrations')

export const ORIGIN = process.env.ORIGIN

export const GITHUB_BASE_URL = 'https://github.com'
export const GITHUB_AVATAR_URL = 'https://avatars.githubusercontent.com'
