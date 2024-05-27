import { resolve } from 'node:path'

export const rootDir = resolve(__dirname, '..')
export const integrationsDir = resolve(rootDir, 'integrations')
export const iconsDir = resolve(rootDir, 'icons')

export const ORIGIN = process.env.ORIGIN

export const GITHUB_BASE_URL = 'https://github.com'
export const GITHUB_AVATAR_URL = 'https://avatars.githubusercontent.com'