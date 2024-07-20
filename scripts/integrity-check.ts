import { verifyIntegrationsIntegrity } from './src/check'

verifyIntegrationsIntegrity().catch((err) => {
  console.error(err)
  process.exit(1)
})
